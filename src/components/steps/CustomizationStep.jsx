import { useState } from "react";
import { useDesign } from "../../context/DesignContext";
import { ROOM_STANDARDS } from "../../utils/designRules";
import {
  ArrowRight,
  ArrowLeft,
  Move,
  Maximize2,
  AlertTriangle,
} from "lucide-react";
import SuggestionBox from "../common/SuggestionBox";

const CustomizationStep = () => {
  const { designData, nextStep, prevStep } = useDesign();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomDimensions, setRoomDimensions] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  const handleRoomSelect = (roomName, type) => {
    setSelectedRoom({ name: roomName, type });
    generateSuggestions(type);
  };

  const generateSuggestions = (type) => {
    const newSuggestions = [];
    const standard = ROOM_STANDARDS[type];

    if (standard) {
      newSuggestions.push({
        type: "info",
        message: `Standard ${type} dimensions: ${standard.minDimension}' × ${standard.minDimension}' (minimum)`,
        severity: "low",
      });
      newSuggestions.push({
        type: "tip",
        message: `Recommended area: ${standard.ideal} sq ft for comfortable usage`,
        severity: "low",
      });
    }

    setSuggestions(newSuggestions);
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <div className="step-card">
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        Customize Your Design
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Fine-tune room dimensions and placements. Click on any room to customize
        it.
      </p>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Interactive Floor Plan */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-neutral-100">
            Interactive Floor Plan
          </h3>
          <div className="bg-white dark:bg-neutral-800 border-2 border-gray-300 dark:border-neutral-600 rounded-lg p-6 min-h-96">
            {/* Simplified Interactive View */}
            <div className="relative bg-gray-50 dark:bg-neutral-700 rounded-lg p-4 h-full">
              <div className="absolute top-2 right-2 text-xs text-gray-500 dark:text-neutral-400 font-semibold">
                {designData.direction.toUpperCase()} ↑
              </div>

              <div className="grid grid-cols-2 gap-2 h-full">
                {/* Living Room */}
                <button
                  onClick={() => handleRoomSelect("Living Room", "livingRoom")}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    selectedRoom?.name === "Living Room"
                      ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-lg"
                      : "border-gray-400 bg-yellow-100 dark:bg-yellow-900/20 hover:border-primary-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">Living Room</span>
                    <Move className="w-4 h-4 text-gray-600 dark:text-neutral-300" />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-neutral-300">
                    16' × 18'
                  </div>
                  <div className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                    Ground Floor
                  </div>
                </button>

                {/* Kitchen */}
                <button
                  onClick={() => handleRoomSelect("Kitchen", "kitchen")}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    selectedRoom?.name === "Kitchen"
                      ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-lg"
                      : "border-gray-400 bg-orange-100 dark:bg-orange-900/20 hover:border-primary-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">Kitchen</span>
                    <Move className="w-4 h-4 text-gray-600 dark:text-neutral-300" />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-neutral-300">
                    10' × 12'
                  </div>
                  <div className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                    SE Zone ✓
                  </div>
                </button>

                {/* Master Bedroom */}
                <button
                  onClick={() => handleRoomSelect("Master Bedroom", "bedroom")}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    selectedRoom?.name === "Master Bedroom"
                      ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-lg"
                      : "border-gray-400 bg-blue-100 dark:bg-blue-900/20 hover:border-primary-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">
                      Master Bedroom
                    </span>
                    <Maximize2 className="w-4 h-4 text-gray-600 dark:text-neutral-300" />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-neutral-300">
                    14' × 16'
                  </div>
                  <div className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                    SW Zone ✓
                  </div>
                </button>

                {/* Bathroom */}
                <button
                  onClick={() => handleRoomSelect("Bathroom", "bathroom")}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    selectedRoom?.name === "Bathroom"
                      ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-lg"
                      : "border-gray-400 bg-purple-100 dark:bg-purple-900/20 hover:border-primary-400"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">Bathroom</span>
                    <Move className="w-4 h-4 text-gray-600 dark:text-neutral-300" />
                  </div>
                  <div className="text-xs text-gray-600 dark:text-neutral-300">
                    6' × 8'
                  </div>
                  <div className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                    NW Zone ✓
                  </div>
                </button>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500 dark:text-neutral-400">
                Click any room to customize dimensions and placement
              </div>
            </div>
          </div>
        </div>

        {/* Customization Panel */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-neutral-100">
            Room Details
          </h3>
          {selectedRoom ? (
            <div className="bg-white dark:bg-neutral-800 border-2 border-primary-200 dark:border-primary-700 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 dark:text-neutral-100 mb-4">
                {selectedRoom.name}
              </h4>

              {/* Dimension Controls */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-2">
                    Width (feet)
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="12"
                    min="5"
                    max="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-2">
                    Length (feet)
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="14"
                    min="5"
                    max="30"
                  />
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm text-gray-700 dark:text-neutral-300">
                    <span className="font-semibold">Calculated Area:</span> 168
                    sq ft
                  </div>
                </div>
              </div>

              {/* Vastu Position */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-2">
                  Vastu-Recommended Position
                </label>
                <select className="input-field">
                  <option>Auto-optimize (Recommended)</option>
                  <option>Northeast</option>
                  <option>Southeast</option>
                  <option>Southwest</option>
                  <option>Northwest</option>
                </select>
              </div>

              {/* Suggestions for selected room */}
              {suggestions.length > 0 && (
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <SuggestionBox key={index} suggestion={suggestion} />
                  ))}
                </div>
              )}

              <button className="btn-primary w-full mt-4">Apply Changes</button>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-neutral-700 border-2 border-gray-200 dark:border-neutral-600 rounded-lg p-12 text-center h-full flex items-center justify-center">
              <div>
                <AlertTriangle className="w-12 h-12 text-gray-400 dark:text-neutral-500 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-neutral-400">
                  Select a room to customize its dimensions and placement
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Tips */}
      <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
        <h4 className="font-semibold text-amber-900 dark:text-amber-400 mb-2">
          Customization Tips:
        </h4>
        <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1 list-disc list-inside">
          <li>
            Maintain minimum room dimensions for comfort and functionality
          </li>
          <li>Keep at least 3 feet circulation space around furniture</li>
          <li>
            Bathroom placements affect plumbing costs - group them if possible
          </li>
          <li>Follow Vastu recommendations for optimal energy flow</li>
          <li>Ensure windows are placed for cross-ventilation</li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={prevStep} className="btn-secondary flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <button
          onClick={handleContinue}
          className="btn-primary flex items-center"
        >
          Continue to Review
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CustomizationStep;
