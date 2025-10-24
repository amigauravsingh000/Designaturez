// Vastu and design validation rules
export const VASTU_RULES = {
  directions: {
    east: {
      favorable: ["entrance", "poojaRoom", "balcony", "windows"],
      unfavorable: ["bathroom", "toilet", "storeRoom"],
      description: "East is auspicious for main entrance and prayer rooms",
    },
    west: {
      favorable: ["bedroom", "storeRoom", "guestRoom"],
      unfavorable: ["entrance", "poojaRoom"],
      description: "West is suitable for bedrooms and storage",
    },
    north: {
      favorable: ["livingRoom", "studyRoom", "treasury"],
      unfavorable: ["bathroom", "kitchen"],
      description: "North brings prosperity, ideal for living areas",
    },
    south: {
      favorable: ["heavyStorage", "gym", "masterBedroom"],
      unfavorable: ["entrance", "kitchen"],
      description: "South is stable, good for master bedroom and gym",
    },
    northeast: {
      favorable: ["poojaRoom", "meditation", "entrance"],
      unfavorable: ["bathroom", "kitchen", "staircase"],
      description: "Northeast is most sacred, ideal for prayer room",
    },
    southeast: {
      favorable: ["kitchen", "firePlace"],
      unfavorable: ["poojaRoom", "bedroom"],
      description: "Southeast is fire element zone, perfect for kitchen",
    },
    northwest: {
      favorable: ["guestRoom", "bathroom", "garage"],
      unfavorable: ["poojaRoom", "masterBedroom"],
      description: "Northwest suits guest rooms and utilities",
    },
    southwest: {
      favorable: ["masterBedroom", "heavyFurniture", "storeRoom"],
      unfavorable: ["entrance", "kitchen"],
      description: "Southwest is most stable, ideal for master bedroom",
    },
  },
};

// Room dimension standards (in feet)
export const ROOM_STANDARDS = {
  bedroom: {
    master: { min: 150, ideal: 180, max: 250, minDimension: 12 },
    regular: { min: 100, ideal: 120, max: 180, minDimension: 10 },
    child: { min: 80, ideal: 100, max: 150, minDimension: 9 },
  },
  bathroom: {
    master: { min: 35, ideal: 50, max: 80, minDimension: 5 },
    regular: { min: 25, ideal: 35, max: 60, minDimension: 5 },
  },
  kitchen: {
    min: 80,
    ideal: 120,
    max: 200,
    minDimension: 8,
    description: "Kitchen should be spacious enough for movement",
  },
  livingRoom: {
    min: 150,
    ideal: 250,
    max: 400,
    minDimension: 12,
    description: "Living room is the heart of the home",
  },
  diningRoom: {
    min: 100,
    ideal: 150,
    max: 250,
    minDimension: 10,
  },
  poojaRoom: {
    min: 25,
    ideal: 35,
    max: 60,
    minDimension: 5,
  },
  studyRoom: {
    min: 80,
    ideal: 100,
    max: 150,
    minDimension: 8,
  },
  gym: {
    min: 100,
    ideal: 150,
    max: 300,
    minDimension: 10,
  },
  storeRoom: {
    min: 20,
    ideal: 40,
    max: 80,
    minDimension: 4,
  },
  balcony: {
    min: 30,
    ideal: 50,
    max: 100,
    minDimension: 4,
  },
  lawn: {
    min: 100,
    ideal: 200,
    max: 500,
    minDimension: 10,
    description: "Open green space for outdoor activities",
  },
  garden: {
    min: 50,
    ideal: 150,
    max: 400,
    minDimension: 8,
    description: "Landscaped garden area",
  },
  utilityRoom: {
    min: 30,
    ideal: 50,
    max: 100,
    minDimension: 5,
    description: "Laundry and utility space",
  },
  parking: {
    single: { min: 120, ideal: 160, dimensions: "8x20" },
    double: { min: 240, ideal: 320, dimensions: "16x20" },
  },
};

// Design validation functions
export const validatePlotSize = (width, length) => {
  const area = width * length;
  const suggestions = [];

  if (area < 800) {
    suggestions.push({
      type: "warning",
      message:
        "Plot size is quite small. Consider a compact design with fewer rooms.",
      severity: "medium",
    });
  }

  if (area > 5000) {
    suggestions.push({
      type: "tip",
      message:
        "Large plot! You can accommodate spacious rooms and outdoor areas.",
      severity: "low",
    });
  }

  const aspectRatio = Math.max(width, length) / Math.min(width, length);
  if (aspectRatio > 3) {
    suggestions.push({
      type: "warning",
      message: "Plot is very elongated. This may limit design flexibility.",
      severity: "high",
    });
  }

  if (width < 20 || length < 20) {
    suggestions.push({
      type: "warning",
      message:
        "Narrow plot dimension detected. Consider vertical construction (multiple floors).",
      severity: "medium",
    });
  }

  return { valid: area >= 400, suggestions, area };
};

export const validateRoomCount = (rooms, plotArea, floors) => {
  const suggestions = [];
  const totalFloorArea = plotArea * floors * 0.7; // 70% built-up area assumption

  // Calculate approximate required area
  let requiredArea = 0;
  requiredArea += (rooms.bedrooms || 0) * 120; // avg bedroom
  requiredArea += (rooms.bathrooms || 0) * 40; // avg bathroom
  requiredArea += rooms.kitchen ? 100 : 0;
  requiredArea += rooms.livingRoom ? 200 : 0;
  requiredArea += rooms.diningRoom ? 120 : 0;
  requiredArea += rooms.poojaRoom ? 35 : 0;
  requiredArea += rooms.gym ? 150 : 0;
  requiredArea += rooms.studyRoom ? 100 : 0;
  requiredArea += rooms.guestRoom ? 120 : 0;
  requiredArea += rooms.storeRoom ? 40 : 0;
  requiredArea += (rooms.balconies || 0) * 50;
  requiredArea += (rooms.parkingSpaces || 0) * 160;

  const utilization = (requiredArea / totalFloorArea) * 100;

  if (utilization > 90) {
    suggestions.push({
      type: "error",
      message: `Too many rooms for the plot size! Space utilization: ${utilization.toFixed(
        0
      )}%. Consider reducing rooms or adding more floors.`,
      severity: "high",
    });
  } else if (utilization > 75) {
    suggestions.push({
      type: "warning",
      message: `Rooms are tightly packed (${utilization.toFixed(
        0
      )}% utilization). Circulation space will be limited.`,
      severity: "medium",
    });
  } else if (utilization < 40) {
    suggestions.push({
      type: "tip",
      message: `You have extra space (${utilization.toFixed(
        0
      )}% utilization). Consider adding more amenities or larger rooms.`,
      severity: "low",
    });
  } else {
    suggestions.push({
      type: "success",
      message: `Good space utilization (${utilization.toFixed(
        0
      )}%). Balanced design with adequate circulation.`,
      severity: "low",
    });
  }

  // Bathroom to bedroom ratio
  const bathroomRatio = rooms.bathrooms / Math.max(rooms.bedrooms, 1);
  if (bathroomRatio < 0.5) {
    suggestions.push({
      type: "warning",
      message:
        "Consider adding more bathrooms. Recommended: at least 1 bathroom per 2 bedrooms.",
      severity: "medium",
    });
  }

  // Parking validation
  if (
    rooms.bedrooms >= 3 &&
    (!rooms.parkingSpaces || rooms.parkingSpaces < 1)
  ) {
    suggestions.push({
      type: "tip",
      message: "For a 3+ bedroom house, consider adding parking space.",
      severity: "low",
    });
  }

  return {
    valid: utilization <= 90,
    suggestions,
    utilization,
    requiredArea,
    totalFloorArea,
  };
};

export const validateRoomPlacement = (roomType, position, plotDirection) => {
  const suggestions = [];

  // Vastu-based validation
  const vastuZones = VASTU_RULES.directions;

  // Determine which vastu zone this position falls into
  // This is simplified - in real implementation, calculate based on coordinates

  return suggestions;
};

// Basic building code compliance checks (simplified)
export const validateBuildingCode = (plotSize, floors, designData) => {
  const suggestions = [];
  const { width, length } = plotSize;
  // Simple setback rule: minimum 3 ft setback on all sides for small plots
  const minSetback = width * length < 1000 ? 3 : 5;

  suggestions.push({
    type: "info",
    message: `Recommended minimum setback: ${minSetback} ft on all sides (check local codes)`,
    severity: "low",
  });

  // Max built-up coverage rule
  const maxCoverage = 0.75; // 75% for residential as a starting assumption
  const plotArea = width * length;

  let builtUpArea = 0;
  Object.values(designData.roomDimensions || {}).forEach((d) => {
    if (d.width && d.length) builtUpArea += d.width * d.length;
  });

  if (builtUpArea / (plotArea * floors) > maxCoverage) {
    suggestions.push({
      type: "warning",
      message: `Built-up area exceeds ${
        maxCoverage * 100
      }% of total permitted area by this simple check. Consider reducing room sizes or increasing floors.`,
      severity: "medium",
    });
  }

  return suggestions;
};

export const getVastuSuggestions = (direction) => {
  const rules = VASTU_RULES.directions[direction.toLowerCase()];
  if (!rules) return [];

  return [
    {
      type: "tip",
      message: rules.description,
      severity: "low",
    },
    {
      type: "info",
      message: `Favorable: ${rules.favorable.join(", ")}`,
      severity: "low",
    },
    {
      type: "warning",
      message: `Avoid: ${rules.unfavorable.join(", ")}`,
      severity: "low",
    },
  ];
};

export const generateOptimalLayout = (plotSize, floors, rooms, direction) => {
  // Simplified layout generator that creates floor buckets and assigns rooms
  const { width, length } = plotSize;
  const plotArea = width * length;

  const layout = {
    floors: Array.from({ length: Math.max(1, floors) }).map(() => ({
      rooms: [],
    })),
    suggestions: [],
    directionIcon: null,
  };

  // Direction icon mapping (for export/visuals)
  const dir = (direction || "east").toLowerCase();
  if (dir === "east") layout.directionIcon = "sunrise";
  else if (dir === "west") layout.directionIcon = "sunset";
  else if (dir === "north") layout.directionIcon = "north";
  else layout.directionIcon = dir;

  // Vastu suggestion
  if (dir === "east") {
    layout.suggestions.push({
      type: "success",
      message: "East-facing plot recommended entrance at East/Northeast.",
      severity: "low",
    });
  }

  // Helper to assign room to a floor
  const assignRoom = (roomKey, type, targetFloor = 0) => {
    const fi = Math.min(Math.max(0, targetFloor), layout.floors.length - 1);
    layout.floors[fi].rooms.push({
      key: roomKey,
      type,
      dims: null,
      placement: null,
    });
  };

  // Assign bedrooms
  for (let i = 0; i < (rooms.bedrooms || 0); i++) {
    assignRoom(
      `bedroom_${i}`,
      "bedroom",
      i === 0 ? 0 : Math.min(1, layout.floors.length - 1)
    );
  }
  // Assign bathrooms
  for (let i = 0; i < (rooms.bathrooms || 0); i++) {
    assignRoom(
      `bathroom_${i}`,
      "bathroom",
      i < 2 ? 0 : Math.min(1, layout.floors.length - 1)
    );
  }

  // Core spaces on ground floor
  if (rooms.livingRoom) assignRoom("livingRoom", "livingRoom", 0);
  if (rooms.kitchen) assignRoom("kitchen", "kitchen", 0);
  if (rooms.diningRoom) assignRoom("diningRoom", "diningRoom", 0);
  if (rooms.poojaRoom) assignRoom("poojaRoom", "poojaRoom", 0);

  // Additional rooms on upper floors by default
  if (rooms.studyRoom)
    assignRoom("studyRoom", "studyRoom", Math.min(1, layout.floors.length - 1));
  if (rooms.gym)
    assignRoom("gym", "gym", Math.min(1, layout.floors.length - 1));
  if (rooms.guestRoom)
    assignRoom("guestRoom", "bedroom", Math.min(1, layout.floors.length - 1));

  // Utility rooms on ground floor
  if (rooms.storeRoom) assignRoom("storeRoom", "storeRoom", 0);
  if (rooms.utilityRoom) assignRoom("utilityRoom", "utilityRoom", 0);
  if (rooms.laundry) assignRoom("laundry", "laundry", 0);

  // Staircase for multi-floor houses
  if (layout.floors.length > 1) {
    assignRoom("staircase", "staircase", 0);
  }

  // Balconies
  const balconies = rooms.balconies || 0;
  for (let i = 0; i < balconies; i++) {
    assignRoom(
      `balcony_${i}`,
      "balcony",
      Math.min(i, layout.floors.length - 1)
    );
  }

  layout.suggestions.push({
    type: "info",
    message: "Basic layout generated. Use customization to refine placements.",
    severity: "low",
  });

  return layout;
};

export const DESIGN_TIPS = {
  general: [
    "Ensure adequate natural light and ventilation in all rooms",
    "Keep at least 3 feet circulation space between furniture",
    "Plan for future expansion or modifications",
    "Consider energy efficiency - proper insulation and window placement",
    "Ensure emergency exits and safety compliance",
  ],
  vastu: [
    "Keep the northeast corner light and clutter-free",
    "Place heavy furniture in the southwest",
    "Avoid toilets in the northeast corner",
    "Kitchen should ideally be in the southeast",
    "Main door should open clockwise (towards the right)",
  ],
  practical: [
    "Keep kitchen near dining area for convenience",
    "Master bedroom should be away from main entrance",
    "Place study room in a quiet zone",
    "Ensure plumbing rooms (kitchen, bathrooms) are grouped for cost efficiency",
    "Plan for adequate storage throughout the house",
  ],
};

// Get ideal room dimensions based on house size and room count
export const getIdealRoomDimensions = (
  roomType,
  roomCount,
  plotArea,
  totalFloors
) => {
  const availableArea = plotArea * totalFloors * 0.7; // 70% built-up area
  const standards = ROOM_STANDARDS[roomType];

  if (!standards) return null;

  let recommended;
  if (roomType === "bedroom" && roomCount) {
    // First bedroom is master
    if (roomCount.bedroomIndex === 0) {
      recommended = standards.master;
    } else {
      recommended = standards.regular;
    }
  } else if (typeof standards.ideal === "number") {
    recommended = {
      ideal: standards.ideal,
      min: standards.min,
      max: standards.max,
    };
  } else {
    recommended = standards.regular || standards;
  }

  // Adjust based on available space
  const suggestedWidth = Math.sqrt(recommended.ideal * 0.8); // Slightly rectangular
  const suggestedLength = Math.sqrt(recommended.ideal * 1.2);

  return {
    width: Math.round(suggestedWidth),
    length: Math.round(suggestedLength),
    area: recommended.ideal,
    minArea: recommended.min,
    maxArea: recommended.max,
    minDimension: standards.minDimension,
  };
};

// Validate room dimensions against standards
export const validateRoomDimensions = (roomType, width, length) => {
  const standards = ROOM_STANDARDS[roomType];
  if (!standards) return { valid: true, warnings: [] };

  const area = width * length;
  const warnings = [];
  let minArea, maxArea, minDimension;

  if (roomType === "bedroom") {
    minArea = standards.regular.min;
    maxArea = standards.master.max;
    minDimension = standards.regular.minDimension;
  } else if (roomType === "bathroom") {
    minArea = standards.regular.min;
    maxArea = standards.master.max;
    minDimension = standards.regular.minDimension;
  } else {
    minArea = standards.min;
    maxArea = standards.max;
    minDimension = standards.minDimension;
  }

  if (width < minDimension || length < minDimension) {
    warnings.push({
      type: "error",
      message: `Minimum dimension should be ${minDimension}' for comfortable ${roomType}`,
      severity: "high",
    });
  }

  if (area < minArea) {
    warnings.push({
      type: "warning",
      message: `Room is smaller than recommended (${minArea} sq ft minimum)`,
      severity: "medium",
    });
  }

  if (area > maxArea) {
    warnings.push({
      type: "warning",
      message: `Room is unusually large (${maxArea} sq ft maximum recommended)`,
      severity: "low",
    });
  }

  const aspectRatio = Math.max(width, length) / Math.min(width, length);
  if (aspectRatio > 2.5) {
    warnings.push({
      type: "warning",
      message: "Room is too elongated. Consider more balanced proportions.",
      severity: "medium",
    });
  }

  return {
    valid:
      area >= minArea &&
      area <= maxArea * 1.2 &&
      width >= minDimension &&
      length >= minDimension,
    warnings,
    area,
  };
};
