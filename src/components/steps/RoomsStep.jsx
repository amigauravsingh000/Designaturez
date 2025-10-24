import { useState, useEffect } from "react";
import { useDesign } from "../../context/DesignContext";
import { validateRoomCount } from "../../utils/designRules";
import { ArrowRight, ArrowLeft, Bed, Bath, Users } from "lucide-react";
import SuggestionBox from "../common/SuggestionBox";

const RoomsStep = () => {
  const { designData, updateRoomData, nextStep, prevStep } = useDesign();
  const [rooms, setRooms] = useState(designData.rooms);
  const [validation, setValidation] = useState(null);

  const plotArea = designData.plotSize.width * designData.plotSize.length;

  useEffect(() => {
    const result = validateRoomCount(rooms, plotArea, designData.floors);
    setValidation(result);
  }, [rooms, plotArea, designData.floors]);

  const handleRoomChange = (type, value) => {
    const newRooms = { ...rooms, [type]: value };
    setRooms(newRooms);
  };

  const handleContinue = () => {
    Object.keys(rooms).forEach((key) => {
      updateRoomData(key, rooms[key]);
    });
    nextStep();
  };

  return (
    <div className="step-card">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-2">
        Essential Rooms
      </h2>
      <p className="text-gray-600 dark:text-neutral-400 mb-6">
        Define the number of essential rooms. We'll help you optimize the
        layout.
      </p>

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
              <span className="ml-1 font-semibold text-gray-900 dark:text-neutral-100">
                {validation.requiredArea.toFixed(0)} sq ft
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-neutral-400">
                Available:
              </span>
              <span className="ml-1 font-semibold text-gray-900 dark:text-neutral-100">
                {validation.totalFloorArea.toFixed(0)} sq ft
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-neutral-400">
                Remaining:
              </span>
              <span className="ml-1 font-semibold text-gray-900 dark:text-neutral-100">
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

      {/* Room Size Standards */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg border border-gray-200 dark:border-neutral-600">
        <h4 className="font-semibold text-gray-900 dark:text-neutral-100 mb-3">
          Standard Room Sizes (for reference):
        </h4>
        <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-neutral-300">
          <div>• Master Bedroom: 12' × 15' (180 sq ft)</div>
          <div>• Regular Bedroom: 10' × 12' (120 sq ft)</div>
          <div>• Bathroom: 5' × 7' (35 sq ft)</div>
          <div>• Kitchen: 8' × 12' (96 sq ft)</div>
          <div>• Living Room: 15' × 18' (270 sq ft)</div>
          <div>• Dining: 10' × 12' (120 sq ft)</div>
        </div>
      </div>

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

export default RoomsStep;
