import { useState, useEffect, useCallback } from "react";
import { useDesign } from "../../context/DesignContext";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Move,
  Maximize2,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  MapPin,
  Home,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Grid as GridIcon,
} from "lucide-react";
import {
  getPlacementMeta,
  getZoneDescriptor,
  isNearFrontGate,
  getFrontGateDescriptor,
  normalizeToGrid,
  getGridConfig,
} from "../../utils/placementUtils";
import {
  getVastuZoneRecommendation,
  analyzeRoomPlacementPro,
} from "../../utils/placementAnalyzer";

const GRID_CONFIG = getGridConfig();

const InteractiveLayoutEditor = ({ floor = 0 }) => {
  const { designData, updateRoomPlacementZone, nextStep, prevStep } =
    useDesign();

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [placementFeedback, setPlacementFeedback] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const [autoSuggest, setAutoSuggest] = useState(true);

  // Get rooms for this floor
  const floorRooms = Object.entries(designData.roomFloorAssignments || {})
    .filter(([_, assignedFloor]) => assignedFloor === floor)
    .map(([key]) => {
      const dims = designData.roomDimensions?.[key] || {};
      const placement = designData.roomPlacements?.[key] || {};
      const roomType = key.split("_")[0];
      const roomIndex = key.split("_")[1];

      let label = roomType.charAt(0).toUpperCase() + roomType.slice(1);
      if (roomIndex !== undefined && roomIndex !== "0") {
        label += ` ${parseInt(roomIndex) + 1}`;
      } else if (roomType === "bedroom" && roomIndex === "0") {
        label = "Master Bedroom";
      }

      return {
        key,
        label,
        dims,
        roomType,
        placement: placement || { row: 0, col: 0, rowSpan: 2, colSpan: 2 },
      };
    });

  // Initialize placements if not set
  useEffect(() => {
    floorRooms.forEach((room, index) => {
      if (!room.placement.row && room.placement.row !== 0) {
        const col = (index % 3) * 4;
        const row = Math.floor(index / 3) * 3;
        updateRoomPlacementZone(room.key, {
          row: Math.min(row, GRID_CONFIG.rows - 2),
          col: Math.min(col, GRID_CONFIG.cols - 2),
          rowSpan: 2,
          colSpan: 2,
        });
      }
    });
  }, [floorRooms.length]);

  const handleRoomMove = useCallback(
    (roomKey, newRow, newCol) => {
      const room = floorRooms.find((r) => r.key === roomKey);
      if (!room) return;

      const normalized = normalizeToGrid(
        newRow,
        newCol,
        room.placement.rowSpan || 2,
        room.placement.colSpan || 2
      );

      updateRoomPlacementZone(roomKey, {
        row: normalized.row,
        col: normalized.col,
        rowSpan: normalized.rowSpan,
        colSpan: normalized.colSpan,
      });

      // Analyze the new placement
      if (autoSuggest) {
        const meta = getPlacementMeta(
          normalized.row,
          normalized.col,
          normalized.rowSpan,
          normalized.colSpan,
          designData.direction
        );

        const analysis = analyzeRoomPlacementPro(
          room.roomType,
          meta.zone,
          meta.nearFront,
          designData.direction
        );

        setPlacementFeedback(analysis);
        setSelectedRoom(roomKey);

        // Auto-clear feedback after 5 seconds
        setTimeout(() => {
          if (selectedRoom === roomKey) {
            setPlacementFeedback([]);
          }
        }, 5000);
      }
    },
    [
      floorRooms,
      designData.direction,
      autoSuggest,
      selectedRoom,
      updateRoomPlacementZone,
    ]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center">
              <GridIcon className="w-8 h-8 mr-3" />
              Interactive Floor Plan Editor
            </h2>
            <p className="mt-2 text-primary-100">
              Drag and drop rooms to customize your layout. Get real-time
              professional suggestions.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-primary-100">Editing</div>
            <div className="text-2xl font-bold">
              {floor === 0 ? "Ground Floor" : `Floor ${floor + 1}`}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                showGrid
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
              }`}
            >
              <GridIcon className="w-4 h-4 inline mr-2" />
              {showGrid ? "Hide Grid" : "Show Grid"}
            </button>
            <button
              onClick={() => setAutoSuggest(!autoSuggest)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                autoSuggest
                  ? "bg-accent-500 text-white"
                  : "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
              }`}
            >
              <Lightbulb className="w-4 h-4 inline mr-2" />
              {autoSuggest ? "Suggestions On" : "Suggestions Off"}
            </button>
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            <Info className="w-4 h-4 inline mr-1" />
            Drag rooms to reposition them
          </div>
        </div>
      </div>

      {/* Front Gate Indicator */}
      <div className="bg-success-50 dark:bg-success-900/20 border-l-4 border-success-500 p-4 rounded-r-lg">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-success-600 dark:text-success-400 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-success-900 dark:text-success-100">
              {getFrontGateDescriptor(designData.direction)}
            </p>
            <p className="text-sm text-success-700 dark:text-success-300 mt-1">
              Position your entrance-facing rooms (living room, foyer) near the{" "}
              {designData.direction} side for a welcoming arrival.
            </p>
          </div>
        </div>
      </div>

      {/* Placement Feedback */}
      {placementFeedback.length > 0 && selectedRoom && (
        <div className="space-y-2 animate-fadeIn">
          <h3 className="font-semibold text-lg text-neutral-800 dark:text-neutral-200 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-accent-500" />
            Professional Suggestions for{" "}
            {floorRooms.find((r) => r.key === selectedRoom)?.label}
          </h3>
          {placementFeedback.map((feedback, idx) => (
            <FeedbackCard key={idx} feedback={feedback} />
          ))}
        </div>
      )}

      {/* Floor Plan Grid */}
      <DndProvider backend={HTML5Backend}>
        <FloorPlanGrid
          rooms={floorRooms}
          showGrid={showGrid}
          direction={designData.direction}
          onRoomMove={handleRoomMove}
          selectedRoom={selectedRoom}
          onSelectRoom={setSelectedRoom}
        />
      </DndProvider>

      {/* Room Legend */}
      <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow border border-neutral-200 dark:border-neutral-700">
        <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
          Rooms on This Floor ({floorRooms.length})
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {floorRooms.map((room) => (
            <div
              key={room.key}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedRoom === room.key
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg"
                  : "border-neutral-300 dark:border-neutral-600 hover:border-primary-400"
              }`}
              onClick={() => setSelectedRoom(room.key)}
            >
              <div className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">
                {room.label}
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                {room.dims.width}' × {room.dims.length}' (
                {(room.dims.width * room.dims.length).toFixed(0)} sq ft)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={prevStep} className="btn-secondary flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <button onClick={nextStep} className="btn-primary flex items-center">
          Continue to Customization
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

// Floor Plan Grid Component
const FloorPlanGrid = ({
  rooms,
  showGrid,
  direction,
  onRoomMove,
  selectedRoom,
  onSelectRoom,
}) => {
  const [, drop] = useDrop(() => ({
    accept: "ROOM",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta) return;

      const cellHeight = 40; // Approximate cell height
      const cellWidth = 40; // Approximate cell width

      const rowDelta = Math.round(delta.y / cellHeight);
      const colDelta = Math.round(delta.x / cellWidth);

      const newRow = Math.max(
        0,
        Math.min(
          item.placement.row + rowDelta,
          GRID_CONFIG.rows - item.placement.rowSpan
        )
      );
      const newCol = Math.max(
        0,
        Math.min(
          item.placement.col + colDelta,
          GRID_CONFIG.cols - item.placement.colSpan
        )
      );

      onRoomMove(item.key, newRow, newCol);
    },
  }));

  return (
    <div
      ref={drop}
      className="relative bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 border-2 border-neutral-300 dark:border-neutral-600 overflow-auto"
      style={{ minHeight: "600px" }}
    >
      {/* Direction Indicator */}
      <DirectionIndicator direction={direction} />

      {/* Grid */}
      <div
        className="relative"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_CONFIG.cols}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_CONFIG.rows}, 1fr)`,
          gap: showGrid ? "2px" : "0",
          minHeight: "500px",
        }}
      >
        {/* Grid Cells Background */}
        {showGrid &&
          Array.from({ length: GRID_CONFIG.rows * GRID_CONFIG.cols }).map(
            (_, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-neutral-700/30 border border-neutral-300 dark:border-neutral-600/50"
                style={{ minHeight: "40px", minWidth: "40px" }}
              />
            )
          )}

        {/* Draggable Rooms */}
        {rooms.map((room) => (
          <DraggableRoom
            key={room.key}
            room={room}
            isSelected={selectedRoom === room.key}
            onSelect={onSelectRoom}
          />
        ))}
      </div>
    </div>
  );
};

// Draggable Room Component
const DraggableRoom = ({ room, isSelected, onSelect }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ROOM",
    item: { key: room.key, placement: room.placement },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getRoomColor = (roomType) => {
    const colors = {
      bedroom: "bg-blue-400/70 border-blue-600",
      bathroom: "bg-purple-400/70 border-purple-600",
      kitchen: "bg-orange-400/70 border-orange-600",
      livingRoom: "bg-yellow-400/70 border-yellow-600",
      diningRoom: "bg-green-400/70 border-green-600",
      poojaRoom: "bg-pink-400/70 border-pink-600",
      studyRoom: "bg-indigo-400/70 border-indigo-600",
      gym: "bg-red-400/70 border-red-600",
      guestRoom: "bg-teal-400/70 border-teal-600",
      storeRoom: "bg-gray-400/70 border-gray-600",
      balcony: "bg-cyan-300/50 border-cyan-500 border-dashed",
      staircase: "bg-neutral-400/70 border-neutral-700",
      utilityRoom: "bg-amber-400/70 border-amber-600",
      laundry: "bg-lime-400/70 border-lime-600",
    };
    return colors[roomType] || "bg-gray-400/70 border-gray-600";
  };

  return (
    <div
      ref={drag}
      className={`${getRoomColor(
        room.roomType
      )} border-2 rounded-lg p-2 cursor-move shadow-lg flex flex-col items-center justify-center text-center transition-all ${
        isDragging ? "opacity-50 scale-95" : "opacity-100"
      } ${
        isSelected
          ? "ring-4 ring-primary-500 ring-offset-2 scale-105 z-20"
          : "hover:scale-102 z-10"
      }`}
      style={{
        gridColumn: `${room.placement.col + 1} / span ${
          room.placement.colSpan
        }`,
        gridRow: `${room.placement.row + 1} / span ${room.placement.rowSpan}`,
      }}
      onClick={() => onSelect(room.key)}
    >
      <Move className="w-4 h-4 text-white mb-1" />
      <div className="font-bold text-white text-sm drop-shadow-md">
        {room.label}
      </div>
      <div className="text-xs text-white/90 drop-shadow">
        {room.dims.width}' × {room.dims.length}'
      </div>
    </div>
  );
};

// Direction Indicator
const DirectionIndicator = ({ direction }) => {
  const getPosition = () => {
    switch (direction.toLowerCase()) {
      case "north":
        return "top-4 left-1/2 -translate-x-1/2";
      case "south":
        return "bottom-4 left-1/2 -translate-x-1/2";
      case "east":
        return "top-1/2 right-4 -translate-y-1/2";
      case "west":
        return "top-1/2 left-4 -translate-y-1/2";
      default:
        return "top-4 right-4";
    }
  };

  return (
    <div
      className={`absolute ${getPosition()} bg-primary-500 text-white px-4 py-2 rounded-full font-bold shadow-lg border-2 border-white z-30 flex items-center`}
    >
      <MapPin className="w-5 h-5 mr-2" />
      {direction.toUpperCase()} ENTRANCE
    </div>
  );
};

// Feedback Card
const FeedbackCard = ({ feedback }) => {
  const getIcon = () => {
    switch (feedback.type) {
      case "error":
        return <AlertTriangle className="w-5 h-5 text-danger-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning-600" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      default:
        return <Info className="w-5 h-5 text-accent-600" />;
    }
  };

  const getStyle = () => {
    switch (feedback.type) {
      case "error":
        return "bg-danger-50 dark:bg-danger-900/20 border-danger-500";
      case "warning":
        return "bg-warning-50 dark:bg-warning-900/20 border-warning-500";
      case "success":
        return "bg-success-50 dark:bg-success-900/20 border-success-500";
      default:
        return "bg-accent-50 dark:bg-accent-900/20 border-accent-500";
    }
  };

  return (
    <div className={`${getStyle()} border-l-4 p-4 rounded-r-lg`}>
      <div className="flex items-start">
        {getIcon()}
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {feedback.message}
          </p>
          {feedback.suggestion && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              💡 {feedback.suggestion}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveLayoutEditor;
