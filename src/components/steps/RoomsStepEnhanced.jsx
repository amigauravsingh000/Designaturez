import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesign } from "../../context/DesignContext";
import {
  validateRoomCount,
  getIdealRoomDimensions,
  validateRoomDimensions,
} from "../../utils/designRules";
import {
  ArrowRight,
  ArrowLeft,
  Bed,
  Bath,
  Users,
  Ruler,
  Home,
  AlertCircle,
  X,
  Edit3,
  ChefHat,
  Sofa,
  UtensilsCrossed,
  BookOpen,
  Dumbbell,
  Package,
  Wind,
  Flower2,
  Building2,
  Sparkles,
  Trees,
  Car,
  Building,
} from "lucide-react";
import SuggestionBox from "../common/SuggestionBox";

const RoomsStepEnhanced = () => {
  const {
    designData,
    updateRoomData,
    updateDesignData,
    updateRoomFloorAssignment,
    nextStep,
    prevStep,
  } = useDesign();
  const [rooms, setRooms] = useState(designData.rooms);
  const [roomDimensions, setRoomDimensions] = useState(
    designData.roomDimensions || {}
  );
  const [roomFloorAssignments, setRoomFloorAssignments] = useState(
    designData.roomFloorAssignments || {}
  );
  const [validation, setValidation] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [dimensionWarnings, setDimensionWarnings] = useState({});
  const [flippedCards, setFlippedCards] = useState({});
  const [cardTempDimensions, setCardTempDimensions] = useState({});

  const plotArea = designData.plotSize.width * designData.plotSize.length;

  const featureOptions = [
    {
      id: "poojaRoom",
      name: "Pooja Room",
      icon: Flower2,
      description: "A sacred space for prayer.",
    },
    {
      id: "studyRoom",
      name: "Study Room",
      icon: BookOpen,
      description: "A quiet place for work or reading.",
    },
    {
      id: "gym",
      name: "Gym",
      icon: Dumbbell,
      description: "For your fitness needs.",
    },
    {
      id: "guestRoom",
      name: "Guest Room",
      icon: Users,
      description: "A welcoming space for visitors.",
    },
    {
      id: "storeRoom",
      name: "Store Room",
      icon: Package,
      description: "For extra storage.",
    },
    {
      id: "utilityRoom",
      name: "Utility Room",
      icon: Wind,
      description: "For laundry and other utilities.",
    },
    {
      id: "lawn",
      name: "Lawn",
      icon: Trees,
      description: "An open green area.",
    },
    {
      id: "garden",
      name: "Garden",
      icon: Trees,
      description: "For planting flowers and vegetables.",
    },
    {
      id: "terrace",
      name: "Terrace",
      icon: Building,
      description: "An open space on the roof.",
    },
  ];

  useEffect(() => {
    const result = validateRoomCount(rooms, plotArea, designData.floors);
    setValidation(result);
  }, [rooms, plotArea, designData.floors]);

  // Initialize dimensions with ideal values
  useEffect(() => {
    const initDimensions = {};
    const initFloorAssignments = {};

    // Bedrooms
    for (let i = 0; i < rooms.bedrooms; i++) {
      const key = `bedroom_${i}`;
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "bedroom",
          { bedroomIndex: i },
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] =
          i === 0 ? 0 : Math.min(1, designData.floors - 1);
      }
    }

    // Bathrooms
    for (let i = 0; i < rooms.bathrooms; i++) {
      const key = `bathroom_${i}`;
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "bathroom",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = i < 2 ? 0 : 1;
      }
    }

    // Kitchen
    if (rooms.kitchen) {
      const key = "kitchen_0";
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "kitchen",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = 0;
      }
    }

    // Living Room
    if (rooms.livingRoom) {
      const key = "livingRoom_0";
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "livingRoom",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = 0;
      }
    }

    // Dining Room
    if (rooms.diningRoom) {
      const key = "diningRoom_0";
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "diningRoom",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = 0;
      }
    }

    // Pooja Room
    if (rooms.poojaRoom) {
      const key = "poojaRoom_0";
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "poojaRoom",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = 0;
      }
    }

    // Study Room
    if (rooms.studyRoom) {
      const key = "studyRoom_0";
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "studyRoom",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = designData.floors > 1 ? 1 : 0;
      }
    }

    // Gym
    if (rooms.gym) {
      const key = "gym_0";
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "gym",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = 0;
      }
    }

    // Guest Room
    if (rooms.guestRoom) {
      const key = "guestRoom_0";
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "bedroom",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = 0;
      }
    }

    // Store Room
    if (rooms.storeRoom) {
      const key = "storeRoom_0";
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "storeRoom",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = 0;
      }
    }

    // Utility Room
    if (rooms.utilityRoom) {
      const key = "utilityRoom_0";
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "storeRoom",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = 0;
      }
    }

    // Balconies
    for (let i = 0; i < rooms.balconies; i++) {
      const key = `balcony_${i}`;
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "balcony",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = {
            width: ideal.width || 5,
            length: ideal.length || 10,
          };
        }
      }
      if (!roomFloorAssignments[key]) {
        // Balconies should be on upper floors, not ground
        initFloorAssignments[key] = designData.floors > 1 ? 1 : 0;
      }
    }

    // Staircase (for multi-floor houses)
    if (designData.floors > 1) {
      const key = "staircase_0";
      if (!roomDimensions[key]) {
        initDimensions[key] = { width: 5, length: 12 };
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = 0; // Staircase spans all floors
      }
    }

    // Laundry
    if (rooms.laundry) {
      const key = "laundry_0";
      if (!roomDimensions[key]) {
        initDimensions[key] = { width: 6, length: 8 };
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = 0;
      }
    }

    // Lawn
    if (rooms.lawn) {
      const key = "lawn_0";
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "lawn",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = 0;
      }
    }

    // Garden
    if (rooms.garden) {
      const key = "garden_0";
      if (!roomDimensions[key]) {
        const ideal = getIdealRoomDimensions(
          "garden",
          null,
          plotArea,
          designData.floors
        );
        if (ideal) {
          initDimensions[key] = { width: ideal.width, length: ideal.length };
        }
      }
      if (!roomFloorAssignments[key]) {
        initFloorAssignments[key] = 0;
      }
    }

    // Parking Spaces
    if (rooms.parkingSpaces > 0) {
      for (let i = 0; i < rooms.parkingSpaces; i++) {
        const key = `parking_${i}`;
        if (!roomDimensions[key]) {
          initDimensions[key] = { width: 10, length: 20 }; // Standard size
        }
        if (!roomFloorAssignments[key]) {
          initFloorAssignments[key] = 0; // Ground floor
        }
      }
    }

    setRoomDimensions((prev) => ({ ...initDimensions, ...prev }));
    setRoomFloorAssignments((prev) => ({ ...initFloorAssignments, ...prev }));
  }, [rooms, designData.floors, plotArea]);

  const handleRoomChange = (type, value) => {
    const newRooms = { ...rooms, [type]: value };
    setRooms(newRooms);

    // If a room is deselected (value is false), remove its associated data.
    if (!value) {
      const newDimensions = { ...roomDimensions };
      const newAssignments = { ...roomFloorAssignments };

      // Find keys related to the deselected room type (e.g., "studyRoom_0").
      const keysToRemove = Object.keys(newDimensions).filter((k) =>
        k.startsWith(type)
      );

      keysToRemove.forEach((key) => {
        delete newDimensions[key];
        delete newAssignments[key];
      });

      setRoomDimensions(newDimensions);
      setRoomFloorAssignments(newAssignments);
    }
  };

  const handleDimensionChange = (roomKey, dimension, value) => {
    const newDimensions = {
      ...roomDimensions,
      [roomKey]: {
        ...roomDimensions[roomKey],
        [dimension]: parseInt(value) || 0,
      },
    };
    setRoomDimensions(newDimensions);

    // Validate dimensions
    const roomType = roomKey.split("_")[0];
    const dims = newDimensions[roomKey];
    if (dims.width && dims.length) {
      const validation = validateRoomDimensions(
        roomType,
        dims.width,
        dims.length
      );
      setDimensionWarnings((prev) => ({
        ...prev,
        [roomKey]: validation.warnings,
      }));
    }
  };

  const handleFloorAssignment = (roomKey, floor) => {
    const floorNum = parseInt(floor);
    setRoomFloorAssignments((prev) => ({
      ...prev,
      [roomKey]: floorNum,
    }));
    // Also update in context
    updateRoomFloorAssignment(roomKey, floorNum);
  };

  const handleContinue = () => {
    Object.keys(rooms).forEach((key) => {
      updateRoomData(key, rooms[key]);
    });
    updateDesignData("roomDimensions", roomDimensions);
    updateDesignData("roomFloorAssignments", roomFloorAssignments);
    nextStep();
  };

  // Get ideal floor for a room type
  const getIdealFloor = (roomType, roomIndex = 0) => {
    const floors = designData.floors;
    if (floors === 1) return 0;

    switch (roomType) {
      case "bedroom":
        // Master bedroom on ground, others on upper floors
        return roomIndex === 0 ? 0 : 1;
      case "bathroom":
        // Distribute bathrooms across floors
        return roomIndex < 2 ? 0 : 1;
      case "kitchen":
      case "diningRoom":
      case "livingRoom":
      case "poojaRoom":
        return 0; // Common areas on ground floor
      case "studyRoom":
      case "gym":
        return floors > 1 ? 1 : 0; // Upper floor if available
      case "balcony":
        return floors > 1 ? 1 : 0; // Balconies on upper floors
      case "storeRoom":
      case "utilityRoom":
      case "laundry":
      case "lawn":
      case "garden":
        return 0; // Utility and outdoor areas on ground floor
      case "guestRoom":
        return 0; // Guest room on ground floor for easy access
      case "staircase":
        return 0; // Staircase starts from ground
      default:
        return 0;
    }
  };

  // Get floor recommendation text
  const getFloorRecommendation = (roomType, roomIndex = 0) => {
    const idealFloor = getIdealFloor(roomType, roomIndex);
    const floorName =
      idealFloor === 0 ? "Ground Floor" : `Floor ${idealFloor + 1}`;

    const reasons = {
      bedroom:
        roomIndex === 0
          ? "Master bedroom recommended on ground floor for accessibility"
          : "Upper floor recommended for privacy and quietness",
      bathroom: "Distributed across floors for convenience",
      kitchen:
        "Ground floor recommended - easy access for deliveries and utilities",
      diningRoom: "Ground floor recommended - near kitchen for convenience",
      livingRoom: "Ground floor recommended - main entertainment area",
      poojaRoom: "Ground floor recommended - northeast corner as per Vastu",
      studyRoom: "Upper floor recommended - quiet environment",
      gym: "Upper floor recommended - separate from living areas",
      balcony: "Upper floors recommended - better views and privacy",
      storeRoom: "Ground floor recommended - easy storage access",
      utilityRoom: "Ground floor recommended - near kitchen/laundry",
      laundry: "Ground floor recommended - plumbing convenience",
      lawn: "Ground floor recommended - outdoor open space",
      garden: "Ground floor recommended - landscaping and greenery",
      guestRoom: "Ground floor recommended - easy guest access",
      staircase: "Connects all floors - central location recommended",
    };

    return {
      idealFloor,
      floorName,
      reason: reasons[roomType] || "Standard placement",
    };
  };

  // Open card flip to edit room
  const openEditCard = (roomKey, roomLabel, roomType, event) => {
    if (event) event.stopPropagation();

    const dims = roomDimensions[roomKey] || {};
    const floor = roomFloorAssignments[roomKey] || 0;

    // Set temp dimensions for this specific card
    setCardTempDimensions((prev) => ({
      ...prev,
      [roomKey]: {
        width: dims.width || 10,
        length: dims.length || 12,
        floor: floor,
      },
    }));

    // Close all other cards and open only this one
    setFlippedCards({ [roomKey]: true });
  };

  // Save and flip card back
  const saveAndFlipBack = (roomKey) => {
    const tempDims = cardTempDimensions[roomKey];
    if (tempDims) {
      handleDimensionChange(roomKey, "width", tempDims.width);
      handleDimensionChange(roomKey, "length", tempDims.length);
      handleFloorAssignment(roomKey, tempDims.floor);
    }
    setFlippedCards((prev) => ({ ...prev, [roomKey]: false }));
  };

  // Cancel and flip back
  const cancelAndFlipBack = (roomKey) => {
    setFlippedCards((prev) => ({ ...prev, [roomKey]: false }));
  }; // Get icon for room type
  const getRoomIcon = (roomType) => {
    const icons = {
      bedroom: Bed,
      bathroom: Bath,
      kitchen: ChefHat,
      livingRoom: Sofa,
      diningRoom: UtensilsCrossed,
      poojaRoom: Flower2,
      studyRoom: BookOpen,
      gym: Dumbbell,
      storeRoom: Package,
      utilityRoom: Wind,
      balcony: Building2,
      guestRoom: Users,
      laundry: Wind,
      staircase: Building2,
      lawn: Trees,
      garden: Trees,
    };
    return icons[roomType] || Home;
  };

  const RoomDimensionCard = ({
    roomKey,
    roomLabel,
    roomType,
    colorClass,
    icon: IconComponent,
  }) => {
    const dims = roomDimensions[roomKey] || {};
    const floor = roomFloorAssignments[roomKey] || 0;
    const area = (dims.width || 0) * (dims.length || 0);
    const Icon = IconComponent || getRoomIcon(roomType);
    const isFlipped = flippedCards[roomKey] || false;

    // Get temp dimensions for this specific card
    const tempDims = cardTempDimensions[roomKey] || {
      width: dims.width || 10,
      length: dims.length || 12,
      floor: floor,
    };

    const roomIndex = parseInt(roomKey.split("_")[1]) || 0;
    const ideal = getIdealRoomDimensions(
      roomType,
      roomType === "bedroom" ? { bedroomIndex: roomIndex } : null,
      plotArea,
      designData.floors
    );

    // Update temp dimensions for this card
    const updateTempDims = (updates) => {
      setCardTempDimensions((prev) => ({
        ...prev,
        [roomKey]: { ...tempDims, ...updates },
      }));
    };

    return (
      <div className="relative h-[220px]" style={{ perspective: "1000px" }}>
        <motion.div
          key={roomKey}
          className="relative w-full h-[220px]"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          style={{ transformStyle: "preserve-3d" }}
          initial={false}
        >
          {/* Front Side */}
          <motion.div
            className={`absolute inset-0 ${colorClass} dark:bg-neutral-800 dark:border-neutral-600 rounded-2xl border-2 shadow-md p-4 h-[220px]`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/80 dark:bg-neutral-700/80 rounded-xl shadow-sm">
                  <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-neutral-100">
                    {roomLabel}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    {dims.width || 0}' × {dims.length || 0}' • {area} sq ft
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-white dark:bg-neutral-700 rounded-xl shadow-sm hover:shadow-md transition-all"
                onClick={(e) => openEditCard(roomKey, roomLabel, roomType, e)}
              >
                <Edit3 className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              </motion.button>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/80 dark:bg-neutral-700/80 rounded-full text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                <Building2 className="w-3 h-3" />
                {floor === 0 ? "Ground Floor" : `Floor ${floor + 1}`}
              </span>
            </div>
          </motion.div>

          {/* Back Side - Edit Form */}
          <motion.div
            className={`absolute inset-0 ${colorClass} dark:bg-neutral-800 dark:border-neutral-600 rounded-2xl border-2 shadow-md p-4 h-[220px] overflow-hidden`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="h-full flex flex-col justify-center gap-3">
              {/* Row 1: Width, Length, and Total Area */}
              <div className="grid grid-cols-3 gap-2 items-end">
                <div>
                  <label className="block text-[10px] font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                    Width
                  </label>
                  <input
                    type="number"
                    value={tempDims.width}
                    onChange={(e) =>
                      updateTempDims({
                        width: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-2 py-1.5 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-neutral-100 font-semibold focus:border-primary-500 outline-none transition-all"
                    min="5"
                    max="50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                    Length
                  </label>
                  <input
                    type="number"
                    value={tempDims.length}
                    onChange={(e) =>
                      updateTempDims({
                        length: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-2 py-1.5 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-neutral-100 font-semibold focus:border-primary-500 outline-none transition-all"
                    min="5"
                    max="50"
                  />
                </div>
                <div className="px-2 py-1.5 bg-white/80 dark:bg-neutral-700/80 rounded-lg text-center">
                  <div className="text-[10px] font-medium text-neutral-600 dark:text-neutral-400">
                    Area
                  </div>
                  <div className="text-xs font-bold text-primary-700 dark:text-primary-400">
                    {(tempDims.width * tempDims.length).toFixed(0)} ft²
                  </div>
                </div>
              </div>

              {/* Row 2: Floor Level and Use Recommended */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                    Floor
                  </label>
                  <select
                    value={tempDims.floor}
                    onChange={(e) =>
                      updateTempDims({
                        floor: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-2 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-neutral-900 dark:text-neutral-100 font-semibold focus:border-primary-500 outline-none cursor-pointer transition-all"
                  >
                    {[...Array(designData.floors)].map((_, i) => (
                      <option key={i} value={i}>
                        {i === 0 ? "Ground" : `Floor ${i + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
                {ideal && (
                  <button
                    onClick={() =>
                      updateTempDims({
                        width: ideal.width,
                        length: ideal.length,
                      })
                    }
                    className="px-2 py-1.5 text-[10px] bg-gradient-to-r from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-1 shadow-sm hover:shadow mt-[18px]"
                  >
                    <Sparkles className="w-3 h-3" />
                    Use {ideal.width}' × {ideal.length}'
                  </button>
                )}
              </div>

              {/* Row 3: Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => cancelAndFlipBack(roomKey)}
                  className="flex-1 px-3 py-1.5 text-xs bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 font-semibold rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveAndFlipBack(roomKey)}
                  className="flex-1 px-3 py-1.5 text-xs bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-lg transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  const FeatureToggle = ({ feature }) => {
    const { id, name, icon: Icon, description } = feature;
    const isSelected = rooms[id];

    return (
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => handleRoomChange(id, !isSelected)}
        className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-left ${
          isSelected
            ? "bg-primary-50 border-primary-300 dark:bg-primary-900/30 dark:border-primary-700 shadow-sm"
            : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon
              className={`w-6 h-6 ${
                isSelected
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-neutral-500 dark:text-neutral-400"
              }`}
            />
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-100">
              {name}
            </h4>
          </div>
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
              isSelected
                ? "bg-primary-500 border-primary-500"
                : "border-neutral-300 dark:border-neutral-600"
            }`}
          >
            {isSelected && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="step-card">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-neutral-900 via-primary-700 to-secondary-700 dark:from-neutral-100 dark:via-primary-300 dark:to-secondary-300 bg-clip-text text-transparent mb-3">
          Room Configuration
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8">
          Click on any room card to edit dimensions and floor assignment
        </p>
      </motion.div>

      {/* Room Counters */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Bedrooms */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center mb-3">
            <Bed className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
            <label className="font-semibold text-gray-900 dark:text-neutral-100">
              Bedrooms
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() =>
                handleRoomChange("bedrooms", Math.max(1, rooms.bedrooms - 1))
              }
              className="w-10 h-10 rounded-full bg-white dark:bg-neutral-700 border-2 border-blue-400 dark:border-blue-600 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40"
            >
              -
            </button>
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {rooms.bedrooms}
            </span>
            <button
              onClick={() =>
                handleRoomChange("bedrooms", Math.min(8, rooms.bedrooms + 1))
              }
              className="w-10 h-10 rounded-full bg-white dark:bg-neutral-700 border-2 border-blue-400 dark:border-blue-600 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40"
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-600 dark:text-neutral-400 mt-2">
            Includes master bedroom
          </p>
        </div>

        {/* Bathrooms */}
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center mb-3">
            <Bath className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
            <label className="font-semibold text-gray-900 dark:text-neutral-100">
              Bathrooms
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() =>
                handleRoomChange("bathrooms", Math.max(1, rooms.bathrooms - 1))
              }
              className="w-10 h-10 rounded-full bg-white dark:bg-neutral-700 border-2 border-purple-400 dark:border-purple-600 text-purple-600 dark:text-purple-400 font-bold hover:bg-purple-100 dark:hover:bg-purple-900/40"
            >
              -
            </button>
            <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {rooms.bathrooms}
            </span>
            <button
              onClick={() =>
                handleRoomChange("bathrooms", Math.min(6, rooms.bathrooms + 1))
              }
              className="w-10 h-10 rounded-full bg-white dark:bg-neutral-700 border-2 border-purple-400 dark:border-purple-600 text-purple-600 dark:text-purple-400 font-bold hover:bg-purple-100 dark:hover:bg-purple-900/40"
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-600 dark:text-neutral-400 mt-2">
            Attached + common
          </p>
        </div>

        {/* Kitchen */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center mb-3">
            <Users className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
            <label className="font-semibold text-gray-900 dark:text-neutral-100">
              Kitchen
            </label>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold text-green-600 dark:text-green-400">
              1
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-neutral-400 mt-2 text-center">
            Standard kitchen included
          </p>
        </div>
      </div>

      {/* Additional Spaces & Amenities */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent mb-4 text-center">
          Additional Spaces & Amenities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {featureOptions.map((feature) => (
            <FeatureToggle key={feature.id} feature={feature} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Balconies */}
          <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800">
            <div className="flex items-center mb-3">
              <Building2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mr-2" />
              <label className="font-semibold text-gray-900 dark:text-neutral-100">
                Balconies
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  handleRoomChange(
                    "balconies",
                    Math.max(0, rooms.balconies - 1)
                  )
                }
                className="w-10 h-10 rounded-full bg-white dark:bg-neutral-700 border-2 border-cyan-400 dark:border-cyan-600 text-cyan-600 dark:text-cyan-400 font-bold hover:bg-cyan-100 dark:hover:bg-cyan-900/40"
              >
                -
              </button>
              <span className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                {rooms.balconies}
              </span>
              <button
                onClick={() =>
                  handleRoomChange(
                    "balconies",
                    Math.min(5, rooms.balconies + 1)
                  )
                }
                className="w-10 h-10 rounded-full bg-white dark:bg-neutral-700 border-2 border-cyan-400 dark:border-cyan-600 text-cyan-600 dark:text-cyan-400 font-bold hover:bg-cyan-100 dark:hover:bg-cyan-900/40"
              >
                +
              </button>
            </div>
          </div>

          {/* Parking Spaces */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Car className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
              <label className="font-semibold text-gray-900 dark:text-neutral-100">
                Parking Spaces
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  handleRoomChange(
                    "parkingSpaces",
                    Math.max(0, rooms.parkingSpaces - 1)
                  )
                }
                className="w-10 h-10 rounded-full bg-white dark:bg-neutral-700 border-2 border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-200 dark:hover:bg-gray-700/60"
              >
                -
              </button>
              <span className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                {rooms.parkingSpaces}
              </span>
              <button
                onClick={() =>
                  handleRoomChange(
                    "parkingSpaces",
                    Math.min(4, rooms.parkingSpaces + 1)
                  )
                }
                className="w-10 h-10 rounded-full bg-white dark:bg-neutral-700 border-2 border-gray-400 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-200 dark:hover:bg-gray-700/60"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Room Dimensions Section - Grouped by Type */}
      <div className="mb-6 space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6b7ff2] to-[#0ebde6] bg-clip-text text-transparent mb-2 flex items-center justify-center">
            <Ruler className="w-7 h-7 mr-3 text-[#6b7ff2]" />
            Room Dimensions & Floor Assignment
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Organized by room type for easy access
          </p>
        </div>

        {/* Bedrooms Group */}
        {(rooms.bedrooms > 0 || rooms.guestRoom) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-2">
                <Bed className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                Bedrooms
              </h4>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {[...Array(rooms.bedrooms)].map((_, i) => (
                <RoomDimensionCard
                  key={`bedroom_${i}`}
                  roomKey={`bedroom_${i}`}
                  roomLabel={i === 0 ? "Master Bedroom" : `Bedroom ${i + 1}`}
                  roomType="bedroom"
                  colorClass="bg-blue-50 border-blue-200"
                />
              ))}
              {rooms.guestRoom && (
                <RoomDimensionCard
                  roomKey="guestRoom_0"
                  roomLabel="Guest Room"
                  roomType="guestRoom"
                  colorClass="bg-teal-50 border-teal-200"
                />
              )}
            </div>
          </motion.div>
        )}

        {/* Bathrooms Group */}
        {rooms.bathrooms > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-2">
                <Bath className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                Bathrooms
              </h4>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-200 to-transparent" />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {[...Array(rooms.bathrooms)].map((_, i) => (
                <RoomDimensionCard
                  key={`bathroom_${i}`}
                  roomKey={`bathroom_${i}`}
                  roomLabel={`Bathroom ${i + 1}`}
                  roomType="bathroom"
                  colorClass="bg-purple-50 border-purple-200"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Common Areas Group */}
        {(rooms.kitchen || rooms.livingRoom || rooms.diningRoom) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl p-2">
                <Sofa className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                Common Areas
              </h4>
              <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent" />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {rooms.livingRoom && (
                <RoomDimensionCard
                  roomKey="livingRoom_0"
                  roomLabel="Living Room"
                  roomType="livingRoom"
                  colorClass="bg-yellow-50 border-yellow-200"
                />
              )}
              {rooms.diningRoom && (
                <RoomDimensionCard
                  roomKey="diningRoom_0"
                  roomLabel="Dining Room"
                  roomType="diningRoom"
                  colorClass="bg-green-50 border-green-200"
                />
              )}
              {rooms.kitchen && (
                <RoomDimensionCard
                  roomKey="kitchen_0"
                  roomLabel="Kitchen"
                  roomType="kitchen"
                  colorClass="bg-orange-50 border-orange-200"
                />
              )}
            </div>
          </motion.div>
        )}

        {/* Special Purpose Rooms Group */}
        {(rooms.poojaRoom || rooms.studyRoom || rooms.gym) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl p-2">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                Special Purpose Rooms
              </h4>
              <div className="flex-1 h-px bg-gradient-to-r from-pink-200 to-transparent" />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {rooms.poojaRoom && (
                <RoomDimensionCard
                  roomKey="poojaRoom_0"
                  roomLabel="Pooja Room"
                  roomType="poojaRoom"
                  colorClass="bg-pink-50 border-pink-200"
                />
              )}
              {rooms.studyRoom && (
                <RoomDimensionCard
                  roomKey="studyRoom_0"
                  roomLabel="Study Room"
                  roomType="studyRoom"
                  colorClass="bg-indigo-50 border-indigo-200"
                />
              )}
              {rooms.gym && (
                <RoomDimensionCard
                  roomKey="gym_0"
                  roomLabel="Gym"
                  roomType="gym"
                  colorClass="bg-red-50 border-red-200"
                />
              )}
            </div>
          </motion.div>
        )}

        {/* Utility & Storage Group */}
        {(rooms.storeRoom ||
          rooms.utilityRoom ||
          rooms.laundry ||
          rooms.balconies > 0 ||
          rooms.lawn ||
          rooms.garden ||
          designData.floors > 1) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl p-2">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                Utility & Outdoor Spaces
              </h4>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {rooms.storeRoom && (
                <RoomDimensionCard
                  roomKey="storeRoom_0"
                  roomLabel="Store Room"
                  roomType="storeRoom"
                  colorClass="bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-600"
                />
              )}
              {rooms.utilityRoom && (
                <RoomDimensionCard
                  roomKey="utilityRoom_0"
                  roomLabel="Utility Room"
                  roomType="utilityRoom"
                  colorClass="bg-gray-50 border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                />
              )}
              {rooms.laundry && (
                <RoomDimensionCard
                  roomKey="laundry_0"
                  roomLabel="Laundry Area"
                  roomType="laundry"
                  colorClass="bg-violet-50 border-violet-200 dark:bg-violet-900/20 dark:border-violet-700"
                />
              )}
              {rooms.lawn && (
                <RoomDimensionCard
                  roomKey="lawn_0"
                  roomLabel="Lawn Area"
                  roomType="lawn"
                  colorClass="bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700"
                  IconComponent={Trees}
                />
              )}
              {rooms.garden && (
                <RoomDimensionCard
                  roomKey="garden_0"
                  roomLabel="Garden"
                  roomType="garden"
                  colorClass="bg-emerald-50 border-emerald-300 dark:bg-emerald-900/20 dark:border-emerald-700"
                  IconComponent={Trees}
                />
              )}
              {[...Array(rooms.balconies || 0)].map((_, i) => (
                <RoomDimensionCard
                  key={`balcony_${i}`}
                  roomKey={`balcony_${i}`}
                  roomLabel={`Balcony ${i + 1}`}
                  roomType="balcony"
                  colorClass="bg-cyan-50 border-cyan-200 dark:bg-cyan-900/20 dark:border-cyan-700"
                />
              ))}
              {designData.floors > 1 && (
                <RoomDimensionCard
                  roomKey="staircase_0"
                  roomLabel="Staircase"
                  roomType="staircase"
                  colorClass="bg-gradient-to-br from-gray-100 to-slate-100 dark:from-neutral-700 dark:to-neutral-600 border-gray-400 dark:border-gray-500"
                />
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Space Utilization */}
      {validation && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900 dark:text-neutral-100">
              Space Utilization
            </span>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {validation.utilization.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full transition-all ${
                validation.utilization > 90
                  ? "bg-red-500"
                  : validation.utilization > 75
                  ? "bg-amber-500"
                  : validation.utilization > 40
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
              style={{ width: `${Math.min(validation.utilization, 100)}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
            <div>
              <span className="text-gray-600 dark:text-neutral-400">
                Required:
              </span>
              <span className="ml-1 font-semibold text-neutral-900 dark:text-neutral-100">
                {validation.requiredArea.toFixed(0)} sq ft
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-neutral-400">
                Available:
              </span>
              <span className="ml-1 font-semibold text-neutral-900 dark:text-neutral-100">
                {validation.totalFloorArea.toFixed(0)} sq ft
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-neutral-400">
                Remaining:
              </span>
              <span className="ml-1 font-semibold text-neutral-900 dark:text-neutral-100">
                {(validation.totalFloorArea - validation.requiredArea).toFixed(
                  0
                )}{" "}
                sq ft
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {validation && validation.suggestions.length > 0 && (
        <div className="mb-6 space-y-3">
          {validation.suggestions.map((suggestion, index) => (
            <SuggestionBox key={index} suggestion={suggestion} />
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={prevStep} className="btn-secondary flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={validation && !validation.valid}
          className="btn-primary flex items-center"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default RoomsStepEnhanced;
