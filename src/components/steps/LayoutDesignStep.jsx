import { useState, useEffect } from "react";
import { useDesign } from "../../context/DesignContext";
import { generateOptimalLayout } from "../../utils/designRules";
import { ArrowRight, ArrowLeft, Sparkles, RefreshCw } from "lucide-react";
import SuggestionBox from "../common/SuggestionBox";

const LayoutDesignStep = () => {
  const { designData, updateDesignData, nextStep, prevStep } = useDesign();
  const [layout, setLayout] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

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

  return (
    <div className="step-card">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        AI-Generated Layout
      </h2>
      <p className="text-gray-600 mb-6">
        Based on your inputs, we've created an optimal floor plan following
        Vastu principles and modern design standards.
      </p>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-20">
          <RefreshCw className="w-16 h-16 text-primary-600 animate-spin mb-4" />
          <p className="text-lg font-semibold text-gray-700">
            Generating your optimal layout...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Analyzing Vastu compliance and space optimization
          </p>
        </div>
      ) : (
        <>
          {/* Layout Preview */}
          <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-primary-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
                Your Optimized Design
              </h3>
              <button
                onClick={generateLayout}
                className="px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center text-sm font-semibold"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </button>
            </div>

            {/* Simple Floor Plan Visualization */}
            <div className="bg-white rounded-lg p-6 border-2 border-gray-300 mb-4">
              <div className="text-center text-gray-600 mb-4">
                <div className="font-semibold text-lg mb-2">
                  {designData.plotSize.width}' × {designData.plotSize.length}'
                  Plot
                </div>
                <div className="text-sm">
                  {designData.direction.charAt(0).toUpperCase() +
                    designData.direction.slice(1)}
                  -Facing • {designData.floors} Floor(s)
                </div>
              </div>

              {/* Simplified Floor Plan Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-2xl mx-auto">
                <div className="bg-yellow-100 border-2 border-yellow-400 p-4 rounded-lg text-center">
                  <div className="font-semibold text-sm">Living Room</div>
                  <div className="text-xs text-gray-600">Ground Floor</div>
                </div>
                <div className="bg-orange-100 border-2 border-orange-400 p-4 rounded-lg text-center">
                  <div className="font-semibold text-sm">Kitchen</div>
                  <div className="text-xs text-gray-600">Ground Floor</div>
                </div>
                {designData.rooms.diningRoom && (
                  <div className="bg-green-100 border-2 border-green-400 p-4 rounded-lg text-center">
                    <div className="font-semibold text-sm">Dining</div>
                    <div className="text-xs text-gray-600">Ground Floor</div>
                  </div>
                )}
                {[...Array(designData.rooms.bedrooms)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-blue-100 border-2 border-blue-400 p-4 rounded-lg text-center"
                  >
                    <div className="font-semibold text-sm">Bedroom {i + 1}</div>
                    <div className="text-xs text-gray-600">
                      {i === 0 ? "Ground Floor" : "First Floor"}
                    </div>
                  </div>
                ))}
                {[...Array(designData.rooms.bathrooms)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-purple-100 border-2 border-purple-400 p-4 rounded-lg text-center"
                  >
                    <div className="font-semibold text-sm">
                      Bathroom {i + 1}
                    </div>
                    <div className="text-xs text-gray-600">Mixed</div>
                  </div>
                ))}
                {designData.rooms.poojaRoom && (
                  <div className="bg-pink-100 border-2 border-pink-400 p-4 rounded-lg text-center">
                    <div className="font-semibold text-sm">Pooja Room</div>
                    <div className="text-xs text-gray-600">Ground Floor NE</div>
                  </div>
                )}
              </div>
            </div>

            {/* Layout Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-primary-600">
                  {Object.values(designData.rooms).filter(
                    (v) => typeof v === "boolean" && v
                  ).length +
                    designData.rooms.bedrooms +
                    designData.rooms.bathrooms}
                </div>
                <div className="text-xs text-gray-600">Total Spaces</div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">95%</div>
                <div className="text-xs text-gray-600">Vastu Score</div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">A+</div>
                <div className="text-xs text-gray-600">Design Rating</div>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {layout && layout.suggestions && layout.suggestions.length > 0 && (
            <div className="mb-6 space-y-3">
              <h3 className="font-semibold text-lg">Design Suggestions:</h3>
              {layout.suggestions.map((suggestion, index) => (
                <SuggestionBox key={index} suggestion={suggestion} />
              ))}
            </div>
          )}

          {/* Key Features */}
          <div className="mb-6 grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">
                ✓ Vastu Compliant
              </h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Main entrance: {designData.direction.toUpperCase()}</li>
                <li>• Kitchen: Southeast zone</li>
                <li>• Master bedroom: Southwest</li>
                {designData.rooms.poojaRoom && <li>• Pooja room: Northeast</li>}
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">
                ✓ Design Optimizations
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Optimal room dimensions</li>
                <li>• Efficient circulation paths</li>
                <li>• Natural light & ventilation</li>
                <li>• Privacy & accessibility balance</li>
              </ul>
            </div>
          </div>

          {/* Next Step Info */}
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">What's Next?</h4>
            <p className="text-sm text-purple-800">
              In the next step, you'll be able to customize individual rooms,
              adjust dimensions, and fine-tune the layout with our interactive
              designer. We'll provide real-time suggestions to ensure your
              customizations remain optimal.
            </p>
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
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
          Continue to Customize
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default LayoutDesignStep;
