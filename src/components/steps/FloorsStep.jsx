import { useState } from "react";
import { useDesign } from "../../context/DesignContext";
import { ArrowRight, ArrowLeft, Building2 } from "lucide-react";
import SuggestionBox from "../common/SuggestionBox";

const FloorsStep = () => {
  const { designData, updateDesignData, nextStep, prevStep } = useDesign();
  const [floors, setFloors] = useState(designData.floors);
  const [suggestions, setSuggestions] = useState([]);

  const floorOptions = [1, 2, 3, 4];

  const handleFloorSelect = (count) => {
    setFloors(count);
    const newSuggestions = [];

    const plotArea = designData.plotSize.width * designData.plotSize.length;

    if (count === 1 && plotArea < 1500) {
      newSuggestions.push({
        type: "warning",
        message:
          "Single floor with small plot size may limit room options. Consider 2 floors for better space utilization.",
        severity: "medium",
      });
    }

    if (count === 1 && plotArea >= 2000) {
      newSuggestions.push({
        type: "success",
        message:
          "Single floor design on large plot provides excellent accessibility and open feel.",
        severity: "low",
      });
    }

    if (count === 2) {
      newSuggestions.push({
        type: "success",
        message:
          "Two floors is the most common and practical choice for residential homes.",
        severity: "low",
      });
    }

    if (count >= 3) {
      newSuggestions.push({
        type: "tip",
        message:
          "Multiple floors require proper structural planning, staircase design, and may need elevator consideration.",
        severity: "medium",
      });
    }

    if (count >= 4) {
      newSuggestions.push({
        type: "warning",
        message:
          "Four or more floors typically require special permits, fire safety measures, and professional structural engineering.",
        severity: "high",
      });
    }

    setSuggestions(newSuggestions);
  };

  const handleContinue = () => {
    updateDesignData("floors", floors);
    nextStep();
  };

  return (
    <div className="step-card">
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        Number of Floors
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        How many floors would you like in your house? This affects room
        distribution and vertical space planning.
      </p>

      {/* Floor Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {floorOptions.map((count) => (
          <button
            key={count}
            onClick={() => handleFloorSelect(count)}
            className={`p-8 rounded-xl border-2 transition-all ${
              floors === count
                ? "border-primary-600 bg-primary-50 dark:bg-primary-900/30 shadow-lg scale-105"
                : "border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 hover:border-primary-400 hover:shadow-md"
            }`}
          >
            <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-700 dark:text-neutral-300" />
            <div className="font-bold text-2xl text-neutral-900 dark:text-neutral-100">
              {count}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              {count === 1 ? "Floor" : "Floors"}
            </div>
          </button>
        ))}
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6 space-y-3">
          {suggestions.map((suggestion, index) => (
            <SuggestionBox key={index} suggestion={suggestion} />
          ))}
        </div>
      )}

      {/* Floor Distribution Info */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
          Typical Floor Distribution:
        </h4>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
          {floors === 1 && (
            <p>
              • Ground Floor: All rooms including living, bedrooms, kitchen, and
              bathrooms
            </p>
          )}
          {floors === 2 && (
            <>
              <p>
                • Ground Floor: Living room, dining, kitchen, 1 bedroom, common
                areas
              </p>
              <p>• First Floor: Bedrooms, study room, family area</p>
            </>
          )}
          {floors === 3 && (
            <>
              <p>
                • Ground Floor: Living, dining, kitchen, guest room, parking
              </p>
              <p>• First Floor: Master bedroom, children's bedrooms</p>
              <p>
                • Second Floor: Additional bedrooms, recreation room, terrace
              </p>
            </>
          )}
          {floors >= 4 && (
            <>
              <p>• Ground Floor: Parking, common areas, guest room</p>
              <p>• Upper Floors: Bedrooms, living spaces, amenities</p>
              <p>• Top Floor: Recreation, terrace, optional penthouse</p>
            </>
          )}
        </div>
      </div>

      {/* Design Tips */}
      <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
          Design Considerations:
        </h4>
        <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-1 list-disc list-inside">
          <li>
            Staircase placement is crucial - typically in South or Southwest
            (Vastu)
          </li>
          <li>Allow 100-120 sq ft for staircase area per floor</li>
          <li>Ground floor height: 10-12 feet, upper floors: 9-10 feet</li>
          <li>
            Consider accessibility for elderly - bedrooms on ground floor if
            needed
          </li>
          {floors >= 3 && (
            <li>
              For 3+ floors, consider elevator shaft (requires ~25-30 sq ft)
            </li>
          )}
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

export default FloorsStep;
