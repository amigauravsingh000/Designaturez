// Intelligent Placement Validation System
// Analyzes the complete design and provides warnings about suboptimal placements

import {
  getFrontGateDescriptor,
  getPlacementMeta,
  getZoneDescriptor,
  getZoneFromGrid,
  isNearFrontGate,
  normalizeToGrid,
} from "./placementUtils";

export const analyzePlacement = (designData) => {
  const warnings = [];
  const suggestions = [];

  const { roomFloorAssignments, roomDimensions, rooms, floors, direction } =
    designData;

  if (!roomFloorAssignments || !roomDimensions) {
    return { warnings: [], suggestions: [], score: 100 };
  }

  // 1. Balcony Placement Analysis
  Object.entries(roomFloorAssignments).forEach(([roomKey, floor]) => {
    if (roomKey.startsWith("balcony")) {
      if (floor === 0 && floors > 1) {
        warnings.push({
          type: "error",
          room: roomKey,
          message: `${getRoomLabel(
            roomKey
          )} on ground floor is unusual. Balconies are typically on upper floors for privacy and views.`,
          suggestion: `Move this balcony to Floor ${Math.min(2, floors)}.`,
          severity: "high",
        });
      }
    }
  });

  // 2. Kitchen-Dining Proximity
  const kitchenFloor = roomFloorAssignments["kitchen_0"];
  const diningFloor = roomFloorAssignments["diningRoom_0"];
  if (
    rooms.diningRoom &&
    kitchenFloor !== undefined &&
    diningFloor !== undefined
  ) {
    if (kitchenFloor !== diningFloor) {
      warnings.push({
        type: "warning",
        room: "kitchen_0",
        message: "Kitchen and Dining Room are on different floors.",
        suggestion:
          "Place kitchen and dining room on the same floor for convenience.",
        severity: "medium",
      });
    }
  }

  // 3. Bathroom Distribution
  const bathroomsByFloor = {};
  Object.entries(roomFloorAssignments).forEach(([roomKey, floor]) => {
    if (roomKey.startsWith("bathroom")) {
      bathroomsByFloor[floor] = (bathroomsByFloor[floor] || 0) + 1;
    }
  });

  const bedroomsByFloor = {};
  Object.entries(roomFloorAssignments).forEach(([roomKey, floor]) => {
    if (roomKey.startsWith("bedroom")) {
      bedroomsByFloor[floor] = (bedroomsByFloor[floor] || 0) + 1;
    }
  });

  Object.keys(bedroomsByFloor).forEach((floor) => {
    const bedrooms = bedroomsByFloor[floor] || 0;
    const bathrooms = bathroomsByFloor[floor] || 0;
    if (bedrooms > 0 && bathrooms === 0) {
      warnings.push({
        type: "warning",
        room: `floor_${floor}`,
        message: `Floor ${
          parseInt(floor) + 1
        } has ${bedrooms} bedroom(s) but no bathroom.`,
        suggestion: "Add at least one bathroom on floors with bedrooms.",
        severity: "medium",
      });
    }
  });

  // 4. Living Room Placement
  const livingFloor = roomFloorAssignments["livingRoom_0"];
  if (rooms.livingRoom && livingFloor !== 0) {
    suggestions.push({
      type: "tip",
      room: "livingRoom_0",
      message:
        "Living Room is typically on the ground floor for easy guest access.",
      suggestion: "Consider moving the Living Room to ground floor.",
      severity: "low",
    });
  }

  // 5. Master Bedroom Placement
  const masterBedroomFloor = roomFloorAssignments["bedroom_0"];
  if (floors > 1 && masterBedroomFloor === 0) {
    suggestions.push({
      type: "tip",
      room: "bedroom_0",
      message: "Master Bedroom on ground floor may have less privacy.",
      suggestion:
        "Upper floors typically offer better privacy for master bedrooms.",
      severity: "low",
    });
  }

  // 6. Pooja Room Direction (Vastu)
  const poojaFloor = roomFloorAssignments["poojaRoom_0"];
  if (rooms.poojaRoom && poojaFloor !== 0) {
    suggestions.push({
      type: "tip",
      room: "poojaRoom_0",
      message: "Pooja Room is ideally on ground floor in the northeast corner.",
      suggestion:
        "Consider ground floor placement for easier daily worship access.",
      severity: "low",
    });
  }

  // 7. Kitchen on Upper Floor
  if (kitchenFloor && kitchenFloor > 0) {
    warnings.push({
      type: "warning",
      room: "kitchen_0",
      message:
        "Kitchen on upper floor can be inconvenient for grocery access and ventilation.",
      suggestion: "Ground floor kitchens are more practical for daily use.",
      severity: "medium",
    });
  }

  // 8. Storage Distribution
  const storeRoomFloor = roomFloorAssignments["storeRoom_0"];
  if (rooms.storeRoom && storeRoomFloor > 0) {
    suggestions.push({
      type: "tip",
      room: "storeRoom_0",
      message: "Storage rooms on upper floors may be less accessible.",
      suggestion: "Consider ground floor or basement for storage.",
      severity: "low",
    });
  }

  // 9. Room Size Validation
  Object.entries(roomDimensions).forEach(([roomKey, dims]) => {
    if (!dims.width || !dims.length) return;

    const area = dims.width * dims.length;
    const roomType = roomKey.split("_")[0];

    // Check minimum sizes
    const minSizes = {
      bedroom: 100,
      bathroom: 25,
      kitchen: 80,
      livingRoom: 150,
      diningRoom: 100,
    };

    if (minSizes[roomType] && area < minSizes[roomType]) {
      warnings.push({
        type: "error",
        room: roomKey,
        message: `${getRoomLabel(
          roomKey
        )} (${area} sq ft) is below recommended minimum (${
          minSizes[roomType]
        } sq ft).`,
        suggestion: `Increase dimensions to at least ${Math.ceil(
          Math.sqrt(minSizes[roomType])
        )}' × ${Math.ceil(Math.sqrt(minSizes[roomType]))}'.`,
        severity: "high",
      });
    }

    // Check aspect ratio
    const ratio =
      Math.max(dims.width, dims.length) / Math.min(dims.width, dims.length);
    if (ratio > 2.5) {
      warnings.push({
        type: "warning",
        room: roomKey,
        message: `${getRoomLabel(roomKey)} has awkward proportions (${
          dims.width
        }' × ${dims.length}').`,
        suggestion:
          "Rooms with aspect ratio > 2.5:1 may feel narrow and be hard to furnish.",
        severity: "low",
      });
    }
  });

  // 10. Circulation Analysis
  const groundFloorRooms = Object.entries(roomFloorAssignments).filter(
    ([_, floor]) => floor === 0
  ).length;

  if (groundFloorRooms < 3 && floors === 1) {
    suggestions.push({
      type: "tip",
      room: "general",
      message: "Very few rooms on a single-floor design.",
      suggestion:
        "Consider adding more functional spaces or reviewing room distribution.",
      severity: "low",
    });
  }

  // Calculate Overall Score
  const errorCount = warnings.filter((w) => w.severity === "high").length;
  const warningCount = warnings.filter((w) => w.severity === "medium").length;
  const tipCount = suggestions.filter((s) => s.severity === "low").length;

  const score = Math.max(
    0,
    100 - errorCount * 15 - warningCount * 5 - tipCount * 2
  );

  return {
    warnings,
    suggestions,
    score,
    summary: {
      total: warnings.length + suggestions.length,
      critical: errorCount,
      moderate: warningCount,
      minor: tipCount,
    },
  };
};

const getRoomLabel = (roomKey) => {
  const parts = roomKey.split("_");
  const type = parts[0];
  const index = parts[1];

  const labels = {
    bedroom: "Bedroom",
    bathroom: "Bathroom",
    kitchen: "Kitchen",
    livingRoom: "Living Room",
    diningRoom: "Dining Room",
    poojaRoom: "Pooja Room",
    studyRoom: "Study Room",
    gym: "Gym",
    guestRoom: "Guest Room",
    storeRoom: "Store Room",
    balcony: "Balcony",
    utilityRoom: "Utility Room",
  };

  let label = labels[type] || type;
  if (index && parseInt(index) > 0) {
    label += ` ${parseInt(index) + 1}`;
  } else if (type === "bedroom" && index === "0") {
    label = "Master Bedroom";
  }

  return label;
};

export const getPlacementRecommendation = (
  roomType,
  floors,
  existingPlacements
) => {
  const recommendations = {
    bedroom: floors > 1 ? 1 : 0,
    bathroom: 0, // Distribute based on bedrooms
    kitchen: 0,
    livingRoom: 0,
    diningRoom: 0,
    poojaRoom: 0,
    studyRoom: floors > 1 ? 1 : 0,
    gym: 0,
    guestRoom: 0,
    storeRoom: 0,
    balcony: Math.max(1, floors - 1), // Upper floors
    utilityRoom: 0,
  };

  return recommendations[roomType] || 0;
};

// Advanced placement analysis for interactive editor
export const analyzeRoomPlacementPro = (
  roomType,
  zone,
  nearFrontGate,
  direction
) => {
  const feedback = [];

  // Vastu-based zone recommendations
  const vastuZones = {
    kitchen: ["southeast", "south-east"],
    poojaRoom: ["northeast", "north-east"],
    bedroom: ["southwest", "south-west", "south", "west"],
    livingRoom: ["north", "east", "northeast", "north-east"],
    diningRoom: ["west", "northwest", "north-west"],
    bathroom: ["northwest", "north-west", "west"],
    studyRoom: ["north", "northeast", "north-east", "east"],
    storeRoom: ["southwest", "south-west"],
  };

  const idealZones = vastuZones[roomType] || [];
  const isIdealZone = idealZones.some(
    (z) => zone.includes(z) || z.includes(zone)
  );

  // Kitchen placement
  if (roomType === "kitchen") {
    if (zone.includes("southeast") || zone.includes("south-east")) {
      feedback.push({
        type: "success",
        message:
          "Excellent! Kitchen in Southeast zone follows Vastu principles.",
        suggestion:
          "This is the fire element zone, ideal for cooking activities.",
        severity: "low",
      });
    } else if (zone.includes("northwest") || zone.includes("north-west")) {
      feedback.push({
        type: "warning",
        message: "Kitchen in Northwest is acceptable but not ideal.",
        suggestion:
          "Southeast is the traditional fire zone for kitchens in Vastu.",
        severity: "medium",
      });
    } else if (zone.includes("northeast") || zone.includes("north-east")) {
      feedback.push({
        type: "error",
        message: "Kitchen in Northeast violates Vastu principles.",
        suggestion: "Move kitchen to Southeast or Northwest zone.",
        severity: "high",
      });
    }

    if (nearFrontGate) {
      feedback.push({
        type: "warning",
        message: "Kitchen too close to main entrance.",
        suggestion:
          "Privacy: Kitchen should be away from the entrance for better workflow and guest privacy.",
        severity: "medium",
      });
    }
  }

  // Living Room placement
  if (roomType === "livingRoom") {
    if (nearFrontGate) {
      feedback.push({
        type: "success",
        message:
          "Perfect! Living room near entrance creates a welcoming space.",
        suggestion:
          "This allows easy guest access without disturbing private areas.",
        severity: "low",
      });
    } else {
      feedback.push({
        type: "tip",
        message: "Living room is positioned away from the entrance.",
        suggestion:
          "Consider placing it closer to the entrance for better guest accessibility.",
        severity: "low",
      });
    }

    if (zone.includes("north") || zone.includes("east")) {
      feedback.push({
        type: "success",
        message: "North/East zone is excellent for living spaces.",
        suggestion: "These directions bring positive energy and natural light.",
        severity: "low",
      });
    }
  }

  // Bedroom placement
  if (roomType === "bedroom") {
    if (zone.includes("southwest") || zone.includes("south-west")) {
      feedback.push({
        type: "success",
        message: "Southwest is the ideal zone for master bedroom (Vastu).",
        suggestion: "This zone provides stability and restful energy.",
        severity: "low",
      });
    } else if (zone.includes("northeast") || zone.includes("north-east")) {
      feedback.push({
        type: "error",
        message: "Bedrooms should avoid Northeast corner.",
        suggestion:
          "This sacred zone is best for prayer room. Move to Southwest.",
        severity: "high",
      });
    }

    if (nearFrontGate) {
      feedback.push({
        type: "warning",
        message: "Bedroom too close to main entrance lacks privacy.",
        suggestion:
          "Bedrooms should be in quieter zones away from entry traffic.",
        severity: "medium",
      });
    }
  }

  // Pooja Room placement
  if (roomType === "poojaRoom") {
    if (zone.includes("northeast") || zone.includes("north-east")) {
      feedback.push({
        type: "success",
        message: "Perfect! Northeast is the most sacred zone for prayer room.",
        suggestion:
          "This zone receives the first rays of sunlight, ideal for worship.",
        severity: "low",
      });
    } else {
      feedback.push({
        type: "error",
        message: "Pooja room should be in Northeast corner (Vastu).",
        suggestion:
          "This is the most auspicious direction for spiritual practices.",
        severity: "high",
      });
    }
  }

  // Bathroom placement
  if (roomType === "bathroom") {
    if (zone.includes("northeast") || zone.includes("north-east")) {
      feedback.push({
        type: "error",
        message: "Bathrooms in Northeast violate Vastu principles.",
        suggestion: "Move to Northwest or West zone.",
        severity: "high",
      });
    } else if (
      zone.includes("northwest") ||
      zone.includes("north-west") ||
      zone.includes("west")
    ) {
      feedback.push({
        type: "success",
        message:
          "Good placement! Northwest/West zones are suitable for bathrooms.",
        severity: "low",
      });
    }
  }

  // Staircase placement
  if (roomType === "staircase") {
    if (zone.includes("center")) {
      feedback.push({
        type: "warning",
        message: "Staircase in center (Brahmasthan) is not ideal.",
        suggestion: "Consider placing staircase in corners or along walls.",
        severity: "medium",
      });
    }

    if (nearFrontGate) {
      feedback.push({
        type: "success",
        message: "Staircase near entrance provides good circulation.",
        suggestion: "Ensure it doesn't block the entrance view.",
        severity: "low",
      });
    }
  }

  // Study Room placement
  if (roomType === "studyRoom") {
    if (
      zone.includes("north") ||
      zone.includes("northeast") ||
      zone.includes("east")
    ) {
      feedback.push({
        type: "success",
        message: "Excellent! North/Northeast/East zones enhance concentration.",
        suggestion:
          "These directions are associated with knowledge and wisdom.",
        severity: "low",
      });
    }
  }

  // Store Room
  if (roomType === "storeRoom") {
    if (zone.includes("southwest") || zone.includes("south-west")) {
      feedback.push({
        type: "success",
        message: "Southwest is ideal for storage and heavy items.",
        suggestion:
          "This zone provides stability and is good for storing valuables.",
        severity: "low",
      });
    }
  }

  // If no specific feedback, provide general guidance
  if (feedback.length === 0) {
    feedback.push({
      type: "info",
      message: `${
        roomType.charAt(0).toUpperCase() + roomType.slice(1)
      } placement looks reasonable.`,
      suggestion: "Continue arranging other rooms for optimal flow.",
      severity: "low",
    });
  }

  return feedback;
};

// Get Vastu zone recommendation for a room type
export const getVastuZoneRecommendation = (roomType) => {
  const recommendations = {
    kitchen: {
      ideal: "Southeast",
      acceptable: "Northwest",
      avoid: "Northeast, Southwest",
      reason: "Fire element zone",
    },
    poojaRoom: {
      ideal: "Northeast",
      acceptable: "North, East",
      avoid: "South, Southwest",
      reason: "Most sacred and auspicious zone",
    },
    bedroom: {
      ideal: "Southwest",
      acceptable: "South, West",
      avoid: "Northeast",
      reason: "Stability and restful energy",
    },
    livingRoom: {
      ideal: "North, Northeast, East",
      acceptable: "Northwest",
      avoid: "Southwest",
      reason: "Positive energy and social interaction",
    },
    diningRoom: {
      ideal: "West, Northwest",
      acceptable: "East",
      avoid: "Southwest",
      reason: "Digestive health and family bonding",
    },
    bathroom: {
      ideal: "Northwest, West",
      acceptable: "South",
      avoid: "Northeast, East",
      reason: "Water drainage and waste elimination",
    },
    studyRoom: {
      ideal: "North, Northeast, East",
      acceptable: "West",
      avoid: "South",
      reason: "Knowledge and concentration",
    },
    storeRoom: {
      ideal: "Southwest",
      acceptable: "South, West",
      avoid: "Northeast",
      reason: "Heavy items and stability",
    },
  };

  return (
    recommendations[roomType] || {
      ideal: "Varies",
      acceptable: "Most zones",
      avoid: "None specific",
      reason: "General room",
    }
  );
};
