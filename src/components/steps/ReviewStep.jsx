import { useState } from "react";
import { useDesign } from "../../context/DesignContext";
import {
  ArrowLeft,
  Download,
  FileText,
  Image,
  CheckCircle,
  Home,
} from "lucide-react";

const ReviewStep = () => {
  const { designData, prevStep, goToStep } = useDesign();
  const [exportFormat, setExportFormat] = useState("pdf");

  const handleExport = () => {
    // In a real implementation, this would generate and download the file
    alert(`Exporting design as ${exportFormat.toUpperCase()}...`);
  };

  const handleStartOver = () => {
    if (
      confirm(
        "Are you sure you want to start over? All current progress will be lost."
      )
    ) {
      window.location.reload();
    }
  };

  const plotArea = designData.plotSize.width * designData.plotSize.length;
  const totalRooms =
    designData.rooms.bedrooms +
    designData.rooms.bathrooms +
    (designData.rooms.kitchen ? 1 : 0) +
    (designData.rooms.livingRoom ? 1 : 0) +
    (designData.rooms.diningRoom ? 1 : 0) +
    (designData.rooms.poojaRoom ? 1 : 0) +
    (designData.rooms.studyRoom ? 1 : 0) +
    (designData.rooms.gym ? 1 : 0) +
    (designData.rooms.guestRoom ? 1 : 0) +
    (designData.rooms.storeRoom ? 1 : 0) +
    (designData.rooms.utilityRoom ? 1 : 0);

  return (
    <div className="step-card">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Design Complete!
        </h2>
        <p className="text-gray-600 text-lg">
          Your custom house design is ready. Review the summary and download
          your plan.
        </p>
      </div>

      {/* Design Summary */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Plot Information */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Home className="w-6 h-6 mr-2 text-blue-600" />
            Plot Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-700">Dimensions:</span>
              <span className="font-semibold">
                {designData.plotSize.width}' × {designData.plotSize.length}'
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Total Area:</span>
              <span className="font-semibold">
                {plotArea.toLocaleString()} sq ft
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Direction:</span>
              <span className="font-semibold">
                {designData.direction.charAt(0).toUpperCase() +
                  designData.direction.slice(1)}
                -Facing
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Floors:</span>
              <span className="font-semibold">{designData.floors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Built-up Area:</span>
              <span className="font-semibold">
                ~{(plotArea * 0.65).toLocaleString()} sq ft
              </span>
            </div>
          </div>
        </div>

        {/* Room Summary */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Room Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Bedrooms:</span>
              <span className="font-semibold">{designData.rooms.bedrooms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Bathrooms:</span>
              <span className="font-semibold">
                {designData.rooms.bathrooms}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Kitchen:</span>
              <span className="font-semibold">
                {designData.rooms.kitchen ? "1" : "0"}
              </span>
            </div>
            {designData.rooms.livingRoom && (
              <div className="flex justify-between">
                <span className="text-gray-700">Living Room:</span>
                <span className="font-semibold">✓</span>
              </div>
            )}
            {designData.rooms.diningRoom && (
              <div className="flex justify-between">
                <span className="text-gray-700">Dining Room:</span>
                <span className="font-semibold">✓</span>
              </div>
            )}
            {designData.rooms.poojaRoom && (
              <div className="flex justify-between">
                <span className="text-gray-700">Pooja Room:</span>
                <span className="font-semibold">✓</span>
              </div>
            )}
            {designData.rooms.studyRoom && (
              <div className="flex justify-between">
                <span className="text-gray-700">Study Room:</span>
                <span className="font-semibold">✓</span>
              </div>
            )}
            {designData.rooms.gym && (
              <div className="flex justify-between">
                <span className="text-gray-700">Gym:</span>
                <span className="font-semibold">✓</span>
              </div>
            )}
            {designData.rooms.guestRoom && (
              <div className="flex justify-between">
                <span className="text-gray-700">Guest Room:</span>
                <span className="font-semibold">✓</span>
              </div>
            )}
            <div className="pt-2 border-t border-purple-200 mt-2">
              <div className="flex justify-between font-bold">
                <span className="text-gray-900">Total Spaces:</span>
                <span className="text-purple-600">{totalRooms}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features & Amenities */}
      <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Features & Amenities
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {designData.rooms.balconies > 0 && (
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span>Balconies: {designData.rooms.balconies}</span>
            </div>
          )}
          {designData.rooms.parkingSpaces > 0 && (
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span>Parking: {designData.rooms.parkingSpaces} car(s)</span>
            </div>
          )}
          {designData.rooms.lawn && (
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span>Lawn Area</span>
            </div>
          )}
          {designData.rooms.garden && (
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span>Garden</span>
            </div>
          )}
          {designData.rooms.terrace && (
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span>Terrace</span>
            </div>
          )}
          {designData.rooms.storeRoom && (
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span>Store Room</span>
            </div>
          )}
          {designData.rooms.utilityRoom && (
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span>Utility Room</span>
            </div>
          )}
        </div>
      </div>

      {/* Design Highlights */}
      <div className="mb-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Design Highlights
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">
              ✓ Vastu Compliant
            </h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Optimized room placements</li>
              <li>• Proper directional alignment</li>
              <li>• Sacred space considerations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">
              ✓ Modern Design
            </h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Efficient space utilization</li>
              <li>• Natural light & ventilation</li>
              <li>• Contemporary aesthetics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="mb-8 bg-white rounded-xl p-6 border-2 border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Download Your Design
        </h3>
        <p className="text-gray-600 mb-4">
          Export your house design in your preferred format. Includes floor
          plans, room dimensions, and design guidelines.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setExportFormat("pdf")}
            className={`p-4 rounded-lg border-2 transition-all ${
              exportFormat === "pdf"
                ? "border-primary-600 bg-primary-50"
                : "border-gray-300 hover:border-primary-400"
            }`}
          >
            <FileText className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <div className="font-semibold">PDF Document</div>
            <div className="text-xs text-gray-600 mt-1">
              Printable & shareable
            </div>
          </button>

          <button
            onClick={() => setExportFormat("png")}
            className={`p-4 rounded-lg border-2 transition-all ${
              exportFormat === "png"
                ? "border-primary-600 bg-primary-50"
                : "border-gray-300 hover:border-primary-400"
            }`}
          >
            <Image className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="font-semibold">PNG Image</div>
            <div className="text-xs text-gray-600 mt-1">
              High-resolution image
            </div>
          </button>

          <button
            onClick={() => setExportFormat("json")}
            className={`p-4 rounded-lg border-2 transition-all ${
              exportFormat === "json"
                ? "border-primary-600 bg-primary-50"
                : "border-gray-300 hover:border-primary-400"
            }`}
          >
            <FileText className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="font-semibold">JSON Data</div>
            <div className="text-xs text-gray-600 mt-1">
              For further editing
            </div>
          </button>
        </div>

        <button
          onClick={handleExport}
          className="btn-primary w-full flex items-center justify-center text-lg"
        >
          <Download className="w-6 h-6 mr-2" />
          Download {exportFormat.toUpperCase()}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => goToStep(5)}
          className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-all"
        >
          <h4 className="font-semibold text-blue-900 mb-1">
            View Layout Again
          </h4>
          <p className="text-sm text-blue-700">
            Review the generated floor plan
          </p>
        </button>
        <button
          onClick={() => goToStep(6)}
          className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 transition-all"
        >
          <h4 className="font-semibold text-purple-900 mb-1">Make Changes</h4>
          <p className="text-sm text-purple-700">Customize room dimensions</p>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={prevStep} className="btn-secondary flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <button onClick={handleStartOver} className="btn-secondary">
          Start New Design
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
