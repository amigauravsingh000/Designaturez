import { useState } from "react";
import { useDesign } from "../../context/DesignContext";
import { getVastuSuggestions } from "../../utils/designRules";
import { ArrowRight, ArrowLeft, Compass } from "lucide-react";
import SuggestionBox from "../common/SuggestionBox";

const DirectionStep = () => {
  const { designData, updateDesignData, nextStep, prevStep } = useDesign();
  const [direction, setDirection] = useState(designData.direction);
  const [suggestions, setSuggestions] = useState(
    getVastuSuggestions(designData.direction)
  );

  const directions = [
    {
      value: "north",
      label: "North",
      description: "Prosperity and wealth",
      color: "bg-blue-100 border-blue-500",
    },
    {
      value: "south",
      label: "South",
      description: "Stability and fame",
      color: "bg-red-100 border-red-500",
    },
    {
      value: "east",
      label: "East",
      description: "Auspicious, new beginnings",
      color: "bg-green-100 border-green-500",
    },
    {
      value: "west",
      label: "West",
      description: "Gains and prosperity",
      color: "bg-yellow-100 border-yellow-500",
    },
    {
      value: "northeast",
      label: "Northeast",
      description: "Most auspicious",
      color: "bg-purple-100 border-purple-500",
    },
    {
      value: "southeast",
      label: "Southeast",
      description: "Fire element",
      color: "bg-orange-100 border-orange-500",
    },
    {
      value: "northwest",
      label: "Northwest",
      description: "Air element",
      color: "bg-teal-100 border-teal-500",
    },
    {
      value: "southwest",
      label: "Southwest",
      description: "Earth element",
      color: "bg-amber-100 border-amber-500",
    },
  ];

  const handleDirectionSelect = (dir) => {
    setDirection(dir);
    setSuggestions(getVastuSuggestions(dir));
  };

  const handleContinue = () => {
    updateDesignData("direction", direction);
    nextStep();
  };

  return (
    <div className="step-card">
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        Plot Direction
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Select the direction your plot faces. This is crucial for Vastu
        compliance and optimal design.
      </p>

      {/* Direction Selector */}
      <div className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {directions.map((dir) => (
            <button
              key={dir.value}
              onClick={() => handleDirectionSelect(dir.value)}
              className={`p-6 rounded-xl border-2 transition-all bg-white dark:bg-neutral-800 ${
                direction === dir.value
                  ? "border-green-500 dark:border-green-400 shadow-lg scale-105"
                  : "border-gray-300 dark:border-neutral-600 hover:border-primary-400 hover:shadow-md"
              }`}
            >
              <Compass className="w-8 h-8 mx-auto mb-2 text-gray-700 dark:text-neutral-300" />
              <div className="font-bold text-lg text-neutral-900 dark:text-neutral-100">
                {dir.label}
              </div>
              <div className="text-xs mt-1 text-neutral-600 dark:text-neutral-400">
                {dir.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Vastu Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6 space-y-3">
          <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
            Vastu Guidelines for{" "}
            {direction.charAt(0).toUpperCase() + direction.slice(1)}-Facing
            Plot:
          </h3>
          {suggestions.map((suggestion, index) => (
            <SuggestionBox key={index} suggestion={suggestion} />
          ))}
        </div>
      )}

      {/* Additional Info */}
      <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">
          Understanding Plot Direction:
        </h4>
        <p className="text-sm text-indigo-800 dark:text-indigo-300 mb-2">
          The plot direction is determined by the road on which the main
          entrance faces. For example:
        </p>
        <ul className="text-sm text-indigo-800 dark:text-indigo-300 space-y-1 list-disc list-inside">
          <li>
            If your main entrance faces the road on the east side, it's an
            East-facing plot
          </li>
          <li>
            Plot direction influences room placement, entrance design, and
            overall Vastu compliance
          </li>
          <li>
            Northeast and East-facing plots are considered highly auspicious in
            Vastu
          </li>
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
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default DirectionStep;
