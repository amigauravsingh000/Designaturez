import { useState, useEffect } from "react";
import {
  X,
  Home,
  Compass,
  Layers,
  Grid,
  Layout,
  FileCheck,
  Lightbulb,
  Moon,
  Sun,
  Save,
  Box,
  Move,
} from "lucide-react";

const QuickTutorial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Show tutorial on first visit
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const closeTutorial = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenTutorial", "true");
  };

  const slides = [
    {
      icon: <Home className="w-12 h-12 text-primary-600" />,
      title: "Welcome to House Design Wizard! 🏡",
      content:
        "Create your dream home design in 6 easy steps. We'll guide you through plot size, room selection, customization, and generate professional floor plans with 3D visualization.",
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-yellow-600" />,
      title: "Smart AI Suggestions ✨",
      content:
        "Get intelligent recommendations for room dimensions, placements, and optimal design patterns based on your plot size and requirements. We validate against building codes and design principles.",
    },
    {
      icon: <Layout className="w-12 h-12 text-blue-600" />,
      title: "Professional Floor Plans 📐",
      content:
        "View color-coded, grid-based floor plans with accurate dimensions. See balconies, entrances, and directional markers (sunrise for East, etc.). Plans are Vastu-compliant and follow modern standards.",
    },
    {
      icon: <Box className="w-12 h-12 text-purple-600" />,
      title: "3D Visualization & Drag-Drop 🎯",
      content:
        "Toggle 3D view to see your design in three dimensions. Drag and drop rooms to reposition them. Experiment with layouts interactively!",
    },
    {
      icon: <Save className="w-12 h-12 text-green-600" />,
      title: "Save & Export 💾",
      content:
        "Save designs to browser storage and load them anytime. Export as PDF (with diagrams), PNG images, or JSON data. Switch between dark/light mode for comfortable viewing.",
    },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-all z-50 flex items-center gap-2"
        title="Show Tutorial"
      >
        <Lightbulb className="w-6 h-6" />
        <span className="hidden sm:inline text-sm font-semibold">Help</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 relative">
          <button
            onClick={closeTutorial}
            className="absolute top-4 right-4 hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center justify-center mb-2">
            {slides[currentSlide].icon}
          </div>
          <h2 className="text-2xl font-bold text-center">
            {slides[currentSlide].title}
          </h2>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-700 text-lg leading-relaxed text-center mb-8">
            {slides[currentSlide].content}
          </p>

          {/* Feature Icons Grid */}
          {currentSlide === 4 && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Save className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-xs text-gray-700 font-semibold">
                  Save/Load
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <FileCheck className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-xs text-gray-700 font-semibold">
                  Export PDF
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <Moon className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-xs text-gray-700 font-semibold">
                  Dark Mode
                </span>
              </div>
            </div>
          )}

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide
                    ? "bg-primary-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                currentSlide === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              ← Previous
            </button>

            {currentSlide === slides.length - 1 ? (
              <button
                onClick={closeTutorial}
                className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-bold hover:shadow-lg transition-all"
              >
                Get Started! 🚀
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))
                }
                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Skip Button */}
        <div className="bg-gray-50 px-6 py-3 flex justify-center border-t">
          <button
            onClick={closeTutorial}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            Skip Tutorial
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickTutorial;
