import { useState } from "react";
import { useDesign } from "../../context/DesignContext";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { validateBuildingCode } from "../../utils/designRules";
import { analyzePlacement } from "../../utils/placementAnalyzer";
import {
  ArrowLeft,
  Download,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  Home,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Lightbulb,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const ReviewStepEnhanced = () => {
  const { designData, prevStep, goToStep, updateDesignData } = useDesign();
  const [exportFormat, setExportFormat] = useState("pdf");
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);

  const handleExportPDF = async () => {
    setIsExporting(true);
    setExportStatus("Generating PDF...");

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Title Page
      pdf.setFontSize(24);
      pdf.setFont(undefined, "bold");
      pdf.text("House Design Plan", pageWidth / 2, 30, { align: "center" });

      pdf.setFontSize(12);
      pdf.setFont(undefined, "normal");
      pdf.text(
        `Generated on: ${new Date().toLocaleDateString()}`,
        pageWidth / 2,
        40,
        { align: "center" }
      );

      // Plot Information
      pdf.setFontSize(16);
      pdf.setFont(undefined, "bold");
      pdf.text("Plot Information", 20, 60);

      pdf.setFontSize(11);
      pdf.setFont(undefined, "normal");
      let yPos = 70;
      pdf.text(
        `Plot Size: ${designData.plotSize.width}' × ${designData.plotSize.length}'`,
        25,
        yPos
      );
      yPos += 7;
      pdf.text(
        `Total Area: ${(
          designData.plotSize.width * designData.plotSize.length
        ).toLocaleString()} sq ft`,
        25,
        yPos
      );
      yPos += 7;
      pdf.text(
        `Direction: ${
          designData.direction.charAt(0).toUpperCase() +
          designData.direction.slice(1)
        }-Facing`,
        25,
        yPos
      );
      yPos += 7;
      pdf.text(`Floors: ${designData.floors}`, 25, yPos);

      // Room Summary
      yPos += 15;
      pdf.setFontSize(16);
      pdf.setFont(undefined, "bold");
      pdf.text("Room Summary", 20, yPos);

      pdf.setFontSize(11);
      pdf.setFont(undefined, "normal");
      yPos += 10;
      pdf.text(`Bedrooms: ${designData.rooms.bedrooms}`, 25, yPos);
      yPos += 7;
      pdf.text(`Bathrooms: ${designData.rooms.bathrooms}`, 25, yPos);
      yPos += 7;
      pdf.text(`Kitchen: ${designData.rooms.kitchen ? "Yes" : "No"}`, 25, yPos);
      yPos += 7;
      pdf.text(
        `Living Room: ${designData.rooms.livingRoom ? "Yes" : "No"}`,
        25,
        yPos
      );
      yPos += 7;
      pdf.text(
        `Dining Room: ${designData.rooms.diningRoom ? "Yes" : "No"}`,
        25,
        yPos
      );

      if (designData.rooms.poojaRoom) {
        yPos += 7;
        pdf.text(`Pooja Room: Yes`, 25, yPos);
      }
      if (designData.rooms.studyRoom) {
        yPos += 7;
        pdf.text(`Study Room: Yes`, 25, yPos);
      }
      if (designData.rooms.gym) {
        yPos += 7;
        pdf.text(`Gym: Yes`, 25, yPos);
      }
      if (designData.rooms.balconies > 0) {
        yPos += 7;
        pdf.text(`Balconies: ${designData.rooms.balconies}`, 25, yPos);
      }

      // Room Dimensions
      yPos += 15;
      pdf.setFontSize(16);
      pdf.setFont(undefined, "bold");
      pdf.text("Room Dimensions", 20, yPos);

      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      yPos += 10;

      Object.entries(designData.roomDimensions || {}).forEach(([key, dims]) => {
        if (yPos > pageHeight - 20) {
          pdf.addPage();
          yPos = 20;
        }

        const roomType = key.split("_")[0];
        const roomIndex = key.split("_")[1];
        let label = roomType.charAt(0).toUpperCase() + roomType.slice(1);
        if (roomIndex !== undefined) {
          label += ` ${parseInt(roomIndex) + 1}`;
        }

        const floor = designData.roomFloorAssignments?.[key] || 0;
        const floorLabel = floor === 0 ? "Ground" : `Floor ${floor + 1}`;

        if (dims.width && dims.length) {
          pdf.text(
            `${label}: ${dims.width}' × ${dims.length}' (${
              dims.width * dims.length
            } sq ft) - ${floorLabel}`,
            25,
            yPos
          );
          yPos += 6;
        }
      });

      // Features & Amenities
      yPos += 15;
      if (yPos > pageHeight - 40) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(16);
      pdf.setFont(undefined, "bold");
      pdf.text("Features & Amenities", 20, yPos);

      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      yPos += 10;

      const features = [];
      if (designData.rooms.parkingSpaces > 0)
        features.push(`Parking: ${designData.rooms.parkingSpaces} car(s)`);
      if (designData.rooms.lawn) features.push("Lawn Area");
      if (designData.rooms.garden) features.push("Garden");
      if (designData.rooms.terrace) features.push("Terrace");
      if (designData.rooms.storeRoom) features.push("Store Room");
      if (designData.rooms.utilityRoom) features.push("Utility Room");
      if (designData.rooms.laundry) features.push("Laundry Area");

      features.forEach((feature) => {
        pdf.text(`• ${feature}`, 25, yPos);
        yPos += 6;
      });

      // Design Highlights
      yPos += 15;
      if (yPos > pageHeight - 40) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.setFontSize(16);
      pdf.setFont(undefined, "bold");
      pdf.text("Design Highlights", 20, yPos);

      pdf.setFontSize(10);
      pdf.setFont(undefined, "normal");
      yPos += 10;

      const highlights = [
        "Vastu-compliant room placements",
        "Optimized space utilization",
        "Natural light and ventilation",
        "Modern architectural standards",
        "Efficient circulation paths",
        "Privacy and accessibility balance",
      ];

      highlights.forEach((highlight) => {
        pdf.text(`✓ ${highlight}`, 25, yPos);
        yPos += 6;
      });

      // Try to capture the visual summary and embed it into the PDF
      try {
        const summaryElement = document.getElementById("design-summary");
        if (summaryElement) {
          const canvas = await html2canvas(summaryElement, {
            scale: 2,
            backgroundColor: "#ffffff",
            logging: false,
          });

          const imgData = canvas.toDataURL("image/png");

          // Fit image within page margins (15mm left/right)
          const imgWidthMM = pageWidth - 30;
          const imgHeightMM = (canvas.height * imgWidthMM) / canvas.width;

          // Add a new page if there's not enough space on current page
          if (yPos + imgHeightMM > pageHeight - 20) {
            pdf.addPage();
            yPos = 20;
          }

          pdf.addImage(imgData, "PNG", 15, yPos, imgWidthMM, imgHeightMM);
          yPos += imgHeightMM + 6;
        }
      } catch (embedError) {
        console.error("Error embedding design image into PDF:", embedError);
        // proceed to save text-only PDF if embedding fails
      }

      // Save PDF
      pdf.save("house-design-plan.pdf");
      setExportStatus("PDF downloaded successfully!");

      setTimeout(() => {
        setExportStatus(null);
        setIsExporting(false);
      }, 2000);
    } catch (error) {
      console.error("PDF export error:", error);
      setExportStatus("Error generating PDF. Please try again.");
      setTimeout(() => {
        setExportStatus(null);
        setIsExporting(false);
      }, 3000);
    }
  };

  const handleExportPNG = async () => {
    setIsExporting(true);
    setExportStatus("Generating PNG image...");

    try {
      const summaryElement = document.getElementById("design-summary");
      if (!summaryElement) {
        throw new Error("Summary element not found");
      }

      const canvas = await html2canvas(summaryElement, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "house-design-plan.png";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);

        setExportStatus("PNG image downloaded successfully!");
        setTimeout(() => {
          setExportStatus(null);
          setIsExporting(false);
        }, 2000);
      });
    } catch (error) {
      console.error("PNG export error:", error);
      setExportStatus("Error generating PNG. Please try again.");
      setTimeout(() => {
        setExportStatus(null);
        setIsExporting(false);
      }, 3000);
    }
  };

  const handleExportJSON = () => {
    setIsExporting(true);
    setExportStatus("Generating JSON file...");

    try {
      const designJSON = JSON.stringify(designData, null, 2);
      const blob = new Blob([designJSON], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "house-design-data.json";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      setExportStatus("JSON file downloaded successfully!");
      setTimeout(() => {
        setExportStatus(null);
        setIsExporting(false);
      }, 2000);
    } catch (error) {
      console.error("JSON export error:", error);
      setExportStatus("Error generating JSON. Please try again.");
      setTimeout(() => {
        setExportStatus(null);
        setIsExporting(false);
      }, 3000);
    }
  };

  const handleExport = () => {
    switch (exportFormat) {
      case "pdf":
        handleExportPDF();
        break;
      case "png":
        handleExportPNG();
        break;
      case "json":
        handleExportJSON();
        break;
      default:
        alert("Please select an export format");
    }
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
  const totalRooms = Object.keys(designData.roomDimensions || {}).length;

  // Calculate total built-up area
  const calculateBuiltUpArea = () => {
    let total = 0;
    Object.values(designData.roomDimensions || {}).forEach((dims) => {
      if (dims.width && dims.length) {
        total += dims.width * dims.length;
      }
    });
    return total;
  };

  const builtUpArea = calculateBuiltUpArea();

  // Check building code compliance
  const complianceCheck = validateBuildingCode(
    designData.plotSize,
    designData.floors,
    designData
  );

  // Analyze placement intelligence
  const placementAnalysis = analyzePlacement(designData);

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

      {/* Export Status */}
      {exportStatus && (
        <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg text-center">
          <p className="text-blue-800 font-semibold">{exportStatus}</p>
        </div>
      )}

      {/* Design Summary Container for Export */}
      <div id="design-summary">
        {/* Design Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Plot Information */}
          <div className="bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-primary-300 shadow-lg">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-indigo-700 bg-clip-text text-transparent mb-4 flex items-center">
              <Home className="w-6 h-6 mr-2 text-primary-600" />
              Plot Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                <span className="text-gray-700 dark:text-neutral-300 font-medium">
                  Dimensions:
                </span>
                <span className="font-bold text-primary-700 dark:text-primary-300">
                  {designData.plotSize.width}' × {designData.plotSize.length}'
                </span>
              </div>
              <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                <span className="text-gray-700 dark:text-neutral-300 font-medium">
                  Total Area:
                </span>
                <span className="font-bold text-primary-700 dark:text-primary-300">
                  {plotArea.toLocaleString()} sq ft
                </span>
              </div>
              <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                <span className="text-gray-700 dark:text-neutral-300 font-medium">
                  Direction:
                </span>
                <span className="font-bold text-primary-700 dark:text-primary-300">
                  {designData.direction.charAt(0).toUpperCase() +
                    designData.direction.slice(1)}
                  -Facing
                </span>
              </div>
              <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                <span className="text-gray-700 dark:text-neutral-300 font-medium">
                  Floors:
                </span>
                <span className="font-bold text-primary-700 dark:text-primary-300">
                  {designData.floors}
                </span>
              </div>
              <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                <span className="text-gray-700 dark:text-neutral-300 font-medium">
                  Built-up Area:
                </span>
                <span className="font-bold text-primary-700 dark:text-primary-300">
                  {builtUpArea.toLocaleString()} sq ft
                </span>
              </div>
              <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                <span className="text-gray-700 dark:text-neutral-300 font-medium">
                  Utilization:
                </span>
                <span className="font-bold text-primary-700 dark:text-primary-300">
                  {((builtUpArea / plotArea) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Room Summary */}
          <div className="bg-gradient-to-br from-accent-50 via-purple-50 to-pink-50 rounded-xl p-6 border-2 border-accent-300 shadow-lg">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-accent-700 to-pink-700 bg-clip-text text-transparent mb-4">
              Room Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                <span className="text-gray-700 dark:text-neutral-300 font-medium">
                  Bedrooms:
                </span>
                <span className="font-bold text-accent-700 dark:text-accent-300">
                  {designData.rooms.bedrooms}
                </span>
              </div>
              <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                <span className="text-gray-700 dark:text-neutral-300 font-medium">
                  Bathrooms:
                </span>
                <span className="font-bold text-accent-700 dark:text-accent-300">
                  {designData.rooms.bathrooms}
                </span>
              </div>
              <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                <span className="text-gray-700 dark:text-neutral-300 font-medium">
                  Kitchen:
                </span>
                <span className="font-bold text-accent-700 dark:text-accent-300">
                  {designData.rooms.kitchen ? "1" : "0"}
                </span>
              </div>
              {designData.rooms.livingRoom && (
                <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                  <span className="text-gray-700 dark:text-neutral-300 font-medium">
                    Living Room:
                  </span>
                  <span className="font-bold text-accent-700 dark:text-accent-300">
                    ✓
                  </span>
                </div>
              )}
              {designData.rooms.diningRoom && (
                <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                  <span className="text-gray-700 dark:text-neutral-300 font-medium">
                    Dining Room:
                  </span>
                  <span className="font-bold text-accent-700 dark:text-accent-300">
                    ✓
                  </span>
                </div>
              )}
              {designData.rooms.poojaRoom && (
                <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                  <span className="text-gray-700 dark:text-neutral-300 font-medium">
                    Pooja Room:
                  </span>
                  <span className="font-bold text-accent-700 dark:text-accent-300">
                    ✓
                  </span>
                </div>
              )}
              {designData.rooms.studyRoom && (
                <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                  <span className="text-gray-700 dark:text-neutral-300 font-medium">
                    Study Room:
                  </span>
                  <span className="font-bold text-accent-700 dark:text-accent-300">
                    ✓
                  </span>
                </div>
              )}
              {designData.rooms.gym && (
                <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                  <span className="text-gray-700 dark:text-neutral-300 font-medium">
                    Gym:
                  </span>
                  <span className="font-bold text-accent-700 dark:text-accent-300">
                    ✓
                  </span>
                </div>
              )}
              {designData.rooms.guestRoom && (
                <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                  <span className="text-gray-700 dark:text-neutral-300 font-medium">
                    Guest Room:
                  </span>
                  <span className="font-bold text-accent-700 dark:text-accent-300">
                    ✓
                  </span>
                </div>
              )}
              {designData.rooms.laundry && (
                <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                  <span className="text-gray-700 dark:text-neutral-300 font-medium">
                    Laundry:
                  </span>
                  <span className="font-bold text-accent-700 dark:text-accent-300">
                    ✓
                  </span>
                </div>
              )}
              {designData.rooms.balconies > 0 && (
                <div className="flex justify-between bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                  <span className="text-gray-700 dark:text-neutral-300 font-medium">
                    Balconies:
                  </span>
                  <span className="font-bold text-accent-700 dark:text-accent-300">
                    {designData.rooms.balconies}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-accent-300 dark:border-accent-700 mt-2">
                <div className="flex justify-between font-bold bg-white/60 dark:bg-neutral-800/60 rounded-lg p-2">
                  <span className="text-gray-900 dark:text-neutral-100">
                    Total Spaces:
                  </span>
                  <span className="text-accent-700 dark:text-accent-300">
                    {totalRooms}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Building Code Compliance */}
        <div
          className={`mb-8 rounded-xl p-6 border-2 shadow-lg ${
            complianceCheck.compliant
              ? "bg-gradient-to-br from-success-50 via-green-50 to-emerald-50 dark:from-success-900/20 dark:via-green-900/20 dark:to-emerald-900/20 border-success-300 dark:border-success-700"
              : "bg-gradient-to-br from-warning-50 via-yellow-50 to-orange-50 dark:from-warning-900/20 dark:via-yellow-900/20 dark:to-orange-900/20 border-warning-300 dark:border-warning-700"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-4 flex items-center ${
              complianceCheck.compliant
                ? "bg-gradient-to-r from-success-700 to-emerald-700 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-warning-700 to-orange-700 bg-clip-text text-transparent"
            }`}
          >
            {complianceCheck.compliant ? (
              <ShieldCheck className="w-6 h-6 mr-2 text-success-600" />
            ) : (
              <ShieldAlert className="w-6 h-6 mr-2 text-warning-600" />
            )}
            Building Code Compliance
          </h3>

          {complianceCheck.compliant ? (
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-800 dark:text-green-300 font-semibold">
                  All checks passed!
                </p>
                <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                  Your design meets standard building code requirements
                  including setbacks, coverage ratios, and ventilation
                  standards.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-yellow-800 dark:text-yellow-300 font-semibold">
                Please review the following recommendations:
              </p>
              {complianceCheck.issues?.map((issue, idx) => (
                <div key={idx} className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    {issue}
                  </p>
                </div>
              ))}
              <p className="text-sm text-gray-600 dark:text-neutral-400 italic mt-2">
                * Building codes vary by location. Consult with a local
                architect or authority.
              </p>
            </div>
          )}

          {/* Intelligent Placement Analysis */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-neutral-100 flex items-center">
                <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
                Smart Placement Analysis
              </h3>
              <div className="flex items-center space-x-4">
                <div
                  className={`text-2xl font-bold ${
                    placementAnalysis.score >= 90
                      ? "text-green-600"
                      : placementAnalysis.score >= 70
                      ? "text-blue-600"
                      : placementAnalysis.score >= 50
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {placementAnalysis.score}/100
                </div>
                <div className="text-sm text-gray-700 dark:text-neutral-300">
                  Utilization
                </div>
              </div>
            </div>

            {/* Score Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden">
                <div
                  className={
                    placementAnalysis.score >= 90
                      ? "bg-green-500"
                      : placementAnalysis.score >= 70
                      ? "bg-blue-500"
                      : placementAnalysis.score >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }
                  style={{
                    width: `${placementAnalysis.score}%`,
                    height: "100%",
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-neutral-400 mt-1">
                <span>Poor</span>
                <span>Average</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 text-center border border-red-200 dark:border-red-800">
                <div className="text-2xl font-bold text-red-600">
                  {placementAnalysis.summary.critical}
                </div>
                <div className="text-xs text-gray-600 dark:text-neutral-400">
                  Critical
                </div>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 text-center border border-yellow-200 dark:border-yellow-800">
                <div className="text-2xl font-bold text-yellow-600">
                  {placementAnalysis.summary.warnings}
                </div>
                <div className="text-xs text-gray-600 dark:text-neutral-400">
                  Warnings
                </div>
              </div>
              <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 text-center border border-blue-200 dark:border-blue-800">
                <div className="text-2xl font-bold text-blue-600">
                  {placementAnalysis.summary.minor}
                </div>
                <div className="text-xs text-gray-600 dark:text-neutral-400">
                  Tips
                </div>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {placementAnalysis.warnings.length > 0 && (
            <div className="space-y-2 mb-3">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-neutral-100">
                ⚠️ Issues Found:
              </h4>
              {placementAnalysis.warnings.map((warning, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    warning.severity === "high"
                      ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700"
                      : "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700"
                  }`}
                >
                  <div className="flex items-start">
                    <AlertCircle
                      className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${
                        warning.severity === "high"
                          ? "text-red-600 dark:text-red-400"
                          : "text-yellow-600 dark:text-yellow-400"
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm font-semibold ${
                          warning.severity === "high"
                            ? "text-red-800 dark:text-red-300"
                            : "text-yellow-800 dark:text-yellow-300"
                        }`}
                      >
                        {warning.message}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-neutral-400 mt-1">
                        💡 {warning.suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {placementAnalysis.suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-neutral-100">
                💡 Suggestions:
              </h4>
              {placementAnalysis.suggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700"
                >
                  <div className="flex items-start">
                    <Lightbulb className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                    <div className="flex-1">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        {suggestion.message}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-neutral-400 mt-1">
                        {suggestion.suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* All Good Message */}
          {placementAnalysis.warnings.length === 0 &&
            placementAnalysis.suggestions.length === 0 && (
              <div className="flex items-center justify-center p-6 bg-white dark:bg-neutral-800 rounded-lg border-2 border-green-300 dark:border-green-800">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                <p className="text-green-800 font-semibold">
                  Perfect! Your design has optimal room placements! 🎉
                </p>
              </div>
            )}

          <div className="mt-4 p-3 bg-white dark:bg-neutral-800 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-gray-600">
              <strong>Note:</strong> This analysis is based on common design
              principles, Vastu guidelines, and practical considerations. You
              can adjust placements on the Room Configuration step (Step 4).
            </p>
          </div>
        </div>

        {/* Room Dimensions Detail */}
        <div className="mb-8 bg-white dark:bg-neutral-800 rounded-xl p-6 border-2 border-gray-200 dark:border-neutral-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-neutral-100 mb-4">
            Detailed Room Dimensions
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(designData.roomDimensions || {}).map(
              ([key, dims]) => {
                const roomType = key.split("_")[0];
                const roomIndex = key.split("_")[1];
                let label =
                  roomType.charAt(0).toUpperCase() + roomType.slice(1);
                if (roomIndex !== undefined) {
                  label += ` ${parseInt(roomIndex) + 1}`;
                }

                const floor = designData.roomFloorAssignments?.[key] || 0;
                const floorLabel =
                  floor === 0 ? "Ground" : `Floor ${floor + 1}`;

                return dims.width && dims.length ? (
                  <div
                    key={key}
                    className="p-3 bg-gray-50 dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded"
                  >
                    <div className="font-semibold text-sm text-gray-900 dark:text-neutral-100">
                      {label}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-neutral-300 mt-1">
                      {dims.width}' × {dims.length}'
                    </div>
                    <div className="text-xs text-gray-600 dark:text-neutral-400">
                      {dims.width * dims.length} sq ft • {floorLabel}
                    </div>
                  </div>
                ) : null;
              }
            )}
          </div>
        </div>

        {/* Features & Amenities */}
        {(designData.rooms.balconies > 0 ||
          designData.rooms.parkingSpaces > 0 ||
          designData.rooms.lawn ||
          designData.rooms.garden ||
          designData.rooms.terrace ||
          designData.rooms.storeRoom ||
          designData.rooms.utilityRoom ||
          designData.rooms.laundry) && (
          <div className="mb-8 bg-gradient-to-br from-success-50 via-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-success-300 shadow-lg">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-success-700 to-emerald-700 bg-clip-text text-transparent mb-4">
              Features & Amenities
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {designData.rooms.balconies > 0 && (
                <div className="flex items-center bg-white/60 dark:bg-neutral-800/60 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
                  <span className="font-medium text-gray-800">
                    Balconies: {designData.rooms.balconies}
                  </span>
                </div>
              )}
              {designData.rooms.parkingSpaces > 0 && (
                <div className="flex items-center bg-white/60 dark:bg-neutral-800/60 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
                  <span className="font-medium text-gray-800">
                    Parking: {designData.rooms.parkingSpaces} car(s)
                  </span>
                </div>
              )}
              {designData.rooms.lawn && (
                <div className="flex items-center bg-white/60 dark:bg-neutral-800/60 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
                  <span className="font-medium text-gray-800">Lawn Area</span>
                </div>
              )}
              {designData.rooms.garden && (
                <div className="flex items-center bg-white/60 dark:bg-neutral-800/60 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
                  <span className="font-medium text-gray-800">Garden</span>
                </div>
              )}
              {designData.rooms.terrace && (
                <div className="flex items-center bg-white/60 dark:bg-neutral-800/60 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
                  <span className="font-medium text-gray-800">Terrace</span>
                </div>
              )}
              {designData.rooms.storeRoom && (
                <div className="flex items-center bg-white/60 dark:bg-neutral-800/60 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
                  <span className="font-medium text-gray-800">Store Room</span>
                </div>
              )}
              {designData.rooms.utilityRoom && (
                <div className="flex items-center bg-white/60 dark:bg-neutral-800/60 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
                  <span className="font-medium text-gray-800">
                    Utility Room
                  </span>
                </div>
              )}
              {designData.rooms.laundry && (
                <div className="flex items-center bg-white/60 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-5 h-5 text-success-600 mr-2" />
                  <span className="font-medium text-gray-800">
                    Laundry Area
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Design Highlights */}
        <div className="mb-8 bg-gradient-to-br from-warning-50 via-amber-50 to-yellow-50 dark:from-warning-900/20 dark:via-amber-900/20 dark:to-yellow-900/20 rounded-xl p-6 border-2 border-warning-300 dark:border-warning-700 shadow-lg">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-warning-700 to-amber-700 bg-clip-text text-transparent mb-4">
            Design Highlights
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/60 dark:bg-neutral-800/60 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-warning-900 dark:text-warning-400 mb-3 text-lg flex items-center">
                <span className="text-2xl mr-2">✓</span> Vastu Compliant
              </h4>
              <ul className="text-sm text-warning-800 dark:text-warning-300 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span> Optimized room placements
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Proper directional alignment
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Sacred space considerations
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Energy flow optimization
                </li>
              </ul>
            </div>
            <div className="bg-white/60 dark:bg-neutral-800/60 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-warning-900 dark:text-warning-400 mb-3 text-lg flex items-center">
                <span className="text-2xl mr-2">✓</span> Modern Design
              </h4>
              <ul className="text-sm text-warning-800 dark:text-warning-300 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span> Efficient space utilization
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Natural light & ventilation
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Contemporary aesthetics
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span> Professional standards
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="mb-8 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-900/20 dark:via-neutral-800 dark:to-accent-900/20 rounded-xl p-6 border-2 border-primary-200 dark:border-primary-700 shadow-lg">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-accent-700 bg-clip-text text-transparent mb-4">
          Download Your Design
        </h3>
        <p className="text-gray-700 dark:text-neutral-300 mb-6 font-medium">
          Export your house design in your preferred format. Includes floor
          plans, room dimensions, and design guidelines.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => setExportFormat("pdf")}
            className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
              exportFormat === "pdf"
                ? "border-danger-500 bg-gradient-to-br from-danger-50 to-red-100 dark:from-danger-900/20 dark:to-red-900/20 shadow-lg"
                : "border-gray-300 dark:border-neutral-600 hover:border-danger-400 bg-white dark:bg-neutral-800"
            }`}
          >
            <FileText className="w-8 h-8 mx-auto mb-2 text-danger-600 dark:text-danger-400" />
            <div className="font-bold text-gray-900 dark:text-neutral-100">
              PDF Document
            </div>
            <div className="text-xs text-gray-600 dark:text-neutral-400 mt-1">
              Printable & shareable
            </div>
          </button>

          <button
            onClick={() => setExportFormat("png")}
            className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
              exportFormat === "png"
                ? "border-primary-500 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-primary-900/20 dark:to-blue-900/20 shadow-lg"
                : "border-gray-300 dark:border-neutral-600 hover:border-primary-400 bg-white dark:bg-neutral-800"
            }`}
          >
            <ImageIcon className="w-8 h-8 mx-auto mb-2 text-primary-600 dark:text-primary-400" />
            <div className="font-bold text-gray-900 dark:text-neutral-100">
              PNG Image
            </div>
            <div className="text-xs text-gray-600 dark:text-neutral-400 mt-1">
              High-resolution image
            </div>
          </button>

          <button
            onClick={() => setExportFormat("json")}
            className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
              exportFormat === "json"
                ? "border-success-500 bg-gradient-to-br from-success-50 to-green-100 dark:from-success-900/20 dark:to-green-900/20 shadow-lg"
                : "border-gray-300 dark:border-neutral-600 hover:border-success-400 bg-white dark:bg-neutral-800"
            }`}
          >
            <FileText className="w-8 h-8 mx-auto mb-2 text-success-600 dark:text-success-400" />
            <div className="font-bold text-gray-900 dark:text-neutral-100">
              JSON Data
            </div>
            <div className="text-xs text-gray-600 dark:text-neutral-400 mt-1">
              For further editing
            </div>
          </button>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className={`btn-primary w-full flex items-center justify-center text-lg py-4 rounded-xl font-bold shadow-lg transform transition-all ${
            isExporting
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700"
          }`}
        >
          <Download className="w-6 h-6 mr-2" />
          {isExporting
            ? "Exporting..."
            : `Download ${exportFormat.toUpperCase()}`}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => goToStep(5)}
          className="p-4 bg-gradient-to-br from-primary-50 to-blue-100 dark:from-primary-900/20 dark:to-blue-900/20 border-2 border-primary-300 dark:border-primary-700 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
        >
          <h4 className="font-bold text-primary-900 dark:text-primary-400 mb-1">
            View Layout Again
          </h4>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Review the generated floor plan
          </p>
        </button>
        <button
          onClick={() => goToStep(3)}
          className="p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
        >
          <h4 className="font-semibold text-purple-900 dark:text-purple-400 mb-1">
            Make Changes
          </h4>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Modify room dimensions
          </p>
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

export default ReviewStepEnhanced;
