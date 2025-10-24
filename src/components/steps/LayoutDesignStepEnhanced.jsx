import { useState, useEffect } from "react";
import { useDesign } from "../../context/DesignContext";
import { generateOptimalLayout } from "../../utils/designRules";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Maximize2,
  MapPin,
  Sunrise,
  Sunset,
  Wind,
  Navigation,
} from "lucide-react";
import SuggestionBox from "../common/SuggestionBox";

const ProfessionalFloorPlan = ({
  floor,
  rooms,
  plotSize,
  direction,
  roomDimensions,
  roomFloorAssignments,
}) => {
  const floorRooms = Object.entries(roomFloorAssignments || {})
    .filter(([key, assignedFloor]) => assignedFloor === floor)
    .map(([key]) => {
      const dims = roomDimensions[key] || {};
      const roomType = key.split("_")[0];
      const roomIndex = key.split("_")[1];

      // Format label based on room type
      let label;
      if (roomType === "bedroom") {
        label =
          roomIndex === "0"
            ? "Master Bedroom"
            : `Bedroom ${parseInt(roomIndex) + 1}`;
      } else if (roomType === "bathroom") {
        label = `Bathroom ${parseInt(roomIndex) + 1}`;
      } else if (roomType === "balcony") {
        label = `Balcony ${parseInt(roomIndex) + 1}`;
      } else if (roomType === "poojaRoom") {
        label = "Pooja Room";
      } else if (roomType === "livingRoom") {
        label = "Living Room";
      } else if (roomType === "diningRoom") {
        label = "Dining Room";
      } else if (roomType === "studyRoom") {
        label = "Study Room";
      } else if (roomType === "storeRoom") {
        label = "Store Room";
      } else if (roomType === "utilityRoom") {
        label = "Utility Room";
      } else if (roomType === "guestRoom") {
        label = "Guest Room";
      } else if (roomType === "staircase") {
        label = "Staircase";
      } else if (roomType === "parking") {
        label = `Parking ${parseInt(roomIndex) + 1}`;
      } else {
        // Capitalize first letter and add space before capitals
        label =
          roomType.charAt(0).toUpperCase() +
          roomType.slice(1).replace(/([A-Z])/g, " $1");
      }

      return { key, label, dims, roomType };
    });

  // Color coding for room types - using vibrant modern palette
  const getRoomColor = (roomType) => {
    const colors = {
      bedroom: "bg-room-bedroom/30 border-room-bedroom border-2",
      bathroom: "bg-room-bathroom/30 border-room-bathroom border-2",
      kitchen: "bg-room-kitchen/30 border-room-kitchen border-2",
      livingRoom: "bg-room-living/30 border-room-living border-2",
      diningRoom: "bg-room-dining/30 border-room-dining border-2",
      poojaRoom: "bg-room-pooja/30 border-room-pooja border-2",
      studyRoom: "bg-room-study/30 border-room-study border-2",
      gym: "bg-room-gym/30 border-room-gym border-2",
      guestRoom: "bg-room-guest/30 border-room-guest border-2",
      storeRoom: "bg-room-storage/30 border-room-storage border-2",
      balcony: "bg-room-balcony/30 border-room-balcony border-2 border-dashed",
      laundry: "bg-room-laundry/30 border-room-laundry border-2",
      utilityRoom: "bg-room-laundry/30 border-room-laundry border-2",
      lawn: "bg-green-200/40 border-green-500 border-2 border-dashed",
      garden: "bg-emerald-200/40 border-emerald-600 border-2 border-dashed",
      staircase: "bg-gray-300/50 border-gray-500 border-2",
      parking: "bg-gray-400/30 border-gray-500 border-2 border-dashed",
    };
    return (
      colors[roomType] ||
      "bg-gray-200 dark:bg-neutral-700 border-gray-600 dark:border-neutral-500"
    );
  };

  // Calculate room positions in a grid layout
  const gridCols = 6;
  const gridRows = 8;
  const cellWidth = plotSize.width / gridCols;
  const cellHeight = plotSize.length / gridRows;

  // Simple auto-layout algorithm
  const positionRooms = () => {
    const positioned = [];
    let currentRow = 0;
    let currentCol = 0;

    floorRooms.forEach((room) => {
      const roomWidth = room.dims.width || 12;
      const roomLength = room.dims.length || 14;

      const colSpan = Math.ceil(roomWidth / cellWidth);
      const rowSpan = Math.ceil(roomLength / cellHeight);

      if (currentCol + colSpan > gridCols) {
        currentCol = 0;
        currentRow += 2;
      }

      positioned.push({
        ...room,
        gridColumn: `${currentCol + 1} / span ${colSpan}`,
        gridRow: `${currentRow + 1} / span ${rowSpan}`,
      });

      currentCol += colSpan;
    });

    return positioned;
  };

  const positionedRooms = positionRooms();

  // Get direction icon and label
  const getDirectionIcon = () => {
    const directionMap = {
      east: {
        icon: Sunrise,
        color: "text-orange-500",
        label: "East (Sunrise)",
      },
      west: { icon: Sunset, color: "text-amber-600", label: "West (Sunset)" },
      north: { icon: Navigation, color: "text-blue-600", label: "North" },
      south: { icon: Wind, color: "text-green-600", label: "South" },
    };
    return directionMap[direction.toLowerCase()] || directionMap.east;
  };

  const directionInfo = getDirectionIcon();
  const DirectionIcon = directionInfo.icon;

  // Drag & Drop handlers
  const { updateRoomPlacement } = useDesign();

  const Room = ({ room }) => {
    const [hovered, setHovered] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showFloorSelector, setShowFloorSelector] = useState(false);
    const { updateRoomFloorAssignment } = useDesign();

    const area =
      room.dims.width && room.dims.length
        ? room.dims.width * room.dims.length
        : 0;

    return (
      <div
        className={`${getRoomColor(
          room.roomType
        )} border-2 rounded flex flex-col items-center justify-center p-2 relative overflow-hidden transition-all duration-200 ${
          hovered ? "shadow-lg scale-105 z-10" : ""
        }`}
        style={{
          gridColumn: room.gridColumn,
          gridRow: room.gridRow,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setShowDetails(!showDetails)}
        title={`Click to ${showDetails ? "hide" : "view"} details`}
      >
        {/* Hover glow effect */}
        {hovered && (
          <div className="absolute inset-0 bg-white dark:bg-neutral-700 opacity-20 animate-pulse-soft" />
        )}

        <div className="text-center relative z-10">
          <div className="font-bold text-sm text-gray-900 dark:text-neutral-100">
            {room.label}
          </div>
          {room.dims.width && room.dims.length && (
            <>
              <div className="text-xs text-gray-700 dark:text-neutral-300 mt-1">
                {room.dims.width}' × {room.dims.length}'
              </div>
              <div className="text-xs text-gray-600 dark:text-neutral-400">
                {area} sq ft
              </div>
            </>
          )}
        </div>

        {/* Floor indicator badge */}
        <div className="absolute top-1 right-1 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
          {floor === 0 ? "G" : `F${floor}`}
        </div>

        {/* Drag handle */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-400 rounded-t"></div>

        {/* Detail Popup */}
        {showDetails && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-2xl p-4 border-2 border-gray-300 dark:border-neutral-600 z-50 w-64 animate-scale-in">
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b">
                <h4 className="font-bold text-gray-900 dark:text-neutral-100">
                  {room.label}
                </h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(false);
                  }}
                  className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-100"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-neutral-400">
                    Width:
                  </span>
                  <span className="font-semibold ml-1">{room.dims.width}'</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-neutral-400">
                    Length:
                  </span>
                  <span className="font-semibold ml-1">
                    {room.dims.length}'
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-neutral-400">
                    Area:
                  </span>
                  <span className="font-semibold ml-1">{area} sq ft</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-neutral-400">
                    Current Floor:
                  </span>
                  <span className="font-semibold ml-1 text-primary-700">
                    {floor === 0 ? "Ground" : `Floor ${floor + 1}`}
                  </span>
                </div>
              </div>

              {/* Floor Change Section */}
              <div className="pt-2 border-t">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFloorSelector(!showFloorSelector);
                  }}
                  className="text-xs bg-gradient-to-r from-accent-600 to-purple-600 text-white px-3 py-2 rounded-lg hover:from-accent-700 hover:to-purple-700 w-full font-bold mb-2"
                >
                  {showFloorSelector ? "✕ Cancel" : "🔄 Change Floor"}
                </button>

                {showFloorSelector && (
                  <div className="space-y-1 animate-scale-in">
                    {[...Array(designData.floors)].map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateRoomFloorAssignment(room.key, i);
                          setShowFloorSelector(false);
                          setShowDetails(false);
                        }}
                        className={`w-full text-xs px-3 py-2 rounded font-semibold transition-all ${
                          i === floor
                            ? "bg-primary-600 text-white"
                            : "bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 text-gray-800 dark:text-neutral-200"
                        }`}
                      >
                        {i === 0 ? "Ground Floor" : `Floor ${i + 1}`}
                        {i === floor && " (Current)"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToStep(3); // Go back to room config
                  }}
                  className="text-xs bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 w-full font-bold"
                >
                  ✏️ Edit Dimensions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-neutral-800 border-4 border-gray-700 dark:border-neutral-600 rounded-lg p-6 shadow-2xl">
      {/* Floor Label */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-300 dark:border-neutral-700">
        <h4 className="text-lg font-bold text-gray-900 dark:text-neutral-100">
          {floor === 0 ? "Ground Floor" : `Floor ${floor + 1}`}
        </h4>
        <div className="flex items-center gap-4">
          <div className="text-sm font-semibold text-gray-600 dark:text-neutral-400">
            {plotSize.width}' × {plotSize.length}'
          </div>
        </div>
      </div>

      {/* North Direction Indicator */}
      <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full border-2 border-blue-800 text-xs font-bold shadow-lg z-20">
        ↑ NORTH
      </div>

      {/* Floor Plan Grid */}
      <div
        className="relative bg-gray-50 dark:bg-neutral-700 border-2 border-gray-400 dark:border-neutral-600"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
          gap: "4px",
          minHeight: "500px",
          padding: "8px",
        }}
      >
        {positionedRooms.map((room) => (
          <Room key={room.key} room={room} />
        ))}

        {/* Add entrance indicator for ground floor */}
        {floor === 0 && (
          <div
            className={`absolute flex items-center justify-center z-10 ${
              {
                north: "top-0 left-1/2 -translate-x-1/2 -translate-y-full",
                south: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full",
                east: "top-1/2 right-0 translate-x-full -translate-y-1/2 rotate-90",
                west: "top-1/2 left-0 -translate-x-full -translate-y-1/2 -rotate-90",
              }[direction] ||
              "bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
            }`}
          >
            <div className="bg-primary-600 text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Main Entrance
            </div>
          </div>
        )}
      </div>

      {/* Room Legend */}
      <div className="mt-4 pt-3 border-t border-gray-300 dark:border-neutral-700">
        <div className="flex flex-wrap gap-2 text-xs">
          {[...new Set(positionedRooms.map((r) => r.roomType))].map((type) => {
            // Format label for legend
            let legendLabel;
            if (type === "poojaRoom") legendLabel = "Pooja Room";
            else if (type === "livingRoom") legendLabel = "Living Room";
            else if (type === "diningRoom") legendLabel = "Dining Room";
            else if (type === "studyRoom") legendLabel = "Study Room";
            else if (type === "storeRoom") legendLabel = "Store Room";
            else if (type === "utilityRoom") legendLabel = "Utility/Laundry";
            else if (type === "guestRoom") legendLabel = "Guest Room";
            else if (type === "parking") legendLabel = "Parking";
            else legendLabel = type.charAt(0).toUpperCase() + type.slice(1);

            return (
              <div key={type} className="flex items-center">
                <div
                  className={`w-4 h-4 ${getRoomColor(type)} border mr-1`}
                ></div>
                <span className="text-gray-700 dark:text-neutral-300">
                  {legendLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const BalconyVisualization = ({ count, floors }) => {
  if (count === 0) return null;

  return (
    <div className="mt-4 p-4 bg-cyan-50 dark:bg-cyan-900/20 border-2 border-cyan-300 dark:border-cyan-700 rounded-lg">
      <h4 className="font-semibold text-gray-900 dark:text-neutral-100 mb-2 flex items-center">
        <Maximize2 className="w-5 h-5 mr-2 text-cyan-600 dark:text-cyan-400" />
        Balconies ({count})
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-neutral-800 border-2 border-dashed border-cyan-500 dark:border-cyan-700 rounded p-3 text-center"
          >
            <div className="font-semibold text-sm text-gray-900 dark:text-neutral-100">
              Balcony {i + 1}
            </div>
            <div className="text-xs text-gray-600 dark:text-neutral-400 mt-1">
              {i < floors ? `Floor ${i + 1}` : "Ground Floor"}
            </div>
            <div className="text-xs text-cyan-600 mt-1">~50 sq ft</div>
            <div className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
              Open Space
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-600 dark:text-neutral-400 mt-2">
        * Balconies extend from bedrooms/living areas with outdoor access
      </p>
    </div>
  );
};

const LayoutDesignStepEnhanced = () => {
  const { designData, updateDesignData, nextStep, prevStep } = useDesign();
  const [layout, setLayout] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(0);

  useEffect(() => {
    generateLayout();
  }, []);

  const generateLayout = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generatedLayout = generateOptimalLayout(
        designData.plotSize,
        designData.floors,
        designData.rooms,
        designData.direction
      );
      setLayout(generatedLayout);
      setIsGenerating(false);
    }, 1500);
  };

  const handleContinue = () => {
    updateDesignData("layout", layout);
    nextStep();
  };

  // Calculate total built-up area
  const calculateTotalArea = () => {
    let total = 0;
    Object.entries(designData.roomDimensions || {}).forEach(([key, dims]) => {
      if (dims.width && dims.length) {
        total += dims.width * dims.length;
      }
    });
    return total;
  };

  // Prepare rooms data for 3D viewer
  const prepare3DRooms = () => {
    return Object.entries(designData.roomDimensions || {}).map(
      ([key, dims]) => {
        const roomType = key.split("_")[0];
        const colors = {
          bedroom: "#93c5fd",
          bathroom: "#c4b5fd",
          kitchen: "#fdba74",
          livingRoom: "#fde047",
          diningRoom: "#86efac",
        };
        return {
          key,
          dims,
          color: colors[roomType] || "#d1d5db",
        };
      }
    );
  };

  return (
    <div className="step-card">
      <>
        {/* Overview Mode */}
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Professional Floor Plan
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Your custom floor plan with precise room layouts, dimensions, and
          Vastu-compliant design.
        </p>

        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-20">
            <RefreshCw className="w-16 h-16 text-primary-600 animate-spin mb-4" />
            <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
              Generating your professional floor plan...
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              Analyzing room placements, Vastu compliance, and space
              optimization
            </p>
          </div>
        ) : (
          <>
            {/* Design Stats */}
            <div className="mb-6 grid grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg border-2 border-blue-300 dark:border-blue-700 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {designData.plotSize.width} × {designData.plotSize.length}
                </div>
                <div className="text-sm text-gray-700 dark:text-neutral-300 mt-1">
                  Plot Size (ft)
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg border-2 border-green-300 dark:border-green-700 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {calculateTotalArea()}
                </div>
                <div className="text-sm text-gray-700 dark:text-neutral-300 mt-1">
                  Built-up Area (sq ft)
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg border-2 border-purple-300 dark:border-purple-700 text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {designData.floors}
                </div>
                <div className="text-sm text-gray-700 dark:text-neutral-300 mt-1">
                  Floor(s)
                </div>
              </div>
              <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-lg border-2 border-amber-300 dark:border-amber-700 text-center">
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {Object.keys(designData.roomDimensions || {}).length}
                </div>
                <div className="text-sm text-gray-700 dark:text-neutral-300 mt-1">
                  Total Rooms
                </div>
              </div>
            </div>

            {/* Floor Plans */}
            <div className="mb-6 space-y-6">
              {[...Array(designData.floors)].map((_, floorIndex) => (
                <div key={floorIndex}>
                  <ProfessionalFloorPlan
                    floor={floorIndex}
                    rooms={designData.rooms}
                    plotSize={designData.plotSize}
                    direction={designData.direction}
                    roomDimensions={designData.roomDimensions}
                    roomFloorAssignments={designData.roomFloorAssignments}
                  />
                </div>
              ))}
            </div>

            {/* Regenerate Button */}
            <div className="mb-6 text-center">
              <button
                onClick={generateLayout}
                className="px-6 py-3 bg-white dark:bg-neutral-700 rounded-lg border-2 border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-600 flex items-center mx-auto font-semibold text-neutral-700 dark:text-neutral-200"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Regenerate Layout
              </button>
            </div>
          </>
        )}
      </>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="btn-secondary flex items-center"
          disabled={isGenerating}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <button
          onClick={handleContinue}
          className="btn-primary flex items-center"
          disabled={isGenerating}
        >
          Continue to Review
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default LayoutDesignStepEnhanced;
