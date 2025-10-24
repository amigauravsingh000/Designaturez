import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesign } from "../../context/DesignContext";
import { validatePlotSize } from "../../utils/designRules";
import {
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  Maximize2,
  Sparkles,
  Ruler,
  Home,
  Building,
  Building2,
  Castle,
  HomeIcon,
} from "lucide-react";
import SuggestionBox from "../common/SuggestionBox";

const PlotSizeStep = () => {
  const { designData, updateDesignData, nextStep } = useDesign();
  const [width, setWidth] = useState(designData.plotSize.width);
  const [length, setLength] = useState(designData.plotSize.length);
  const [unit, setUnit] = useState(designData.plotSize.unit);
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    const result = validatePlotSize(width, length);
    setValidation(result);
  }, [width, length]);

  const handleContinue = () => {
    if (validation?.valid) {
      updateDesignData("plotSize", { width, length, unit });
      nextStep();
    }
  };

  const commonSizes = [
    { name: "20×30", width: 20, length: 30, area: 600, icon: Home },
    { name: "30×40", width: 30, length: 40, area: 1200, icon: HomeIcon },
    { name: "30×60", width: 30, length: 60, area: 1800, icon: Building },
    { name: "40×60", width: 40, length: 60, area: 2400, icon: Building2 },
    { name: "50×80", width: 50, length: 80, area: 4000, icon: Castle },
  ];

  const isSelected = (size) => width === size.width && length === size.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="step-card space-y-10"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-neutral-900 via-primary-700 to-secondary-700 dark:from-neutral-100 dark:via-primary-300 dark:to-secondary-300 bg-clip-text text-transparent mb-3">
          Plot Size
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Let's start by defining your plot dimensions. This will help us create
          an optimal design.
        </p>
      </motion.div>

      {/* Quick Select Common Sizes */}
      <div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-lg shadow-primary-500/30"
          >
            <Maximize2 className="w-5 h-5 text-white" />
          </motion.div>
          <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
            Quick Select (Common Sizes)
          </label>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {commonSizes.map((size) => {
            const selected = isSelected(size);
            return (
              <motion.button
                key={size.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  show: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setWidth(size.width);
                  setLength(size.length);
                }}
                className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  selected
                    ? "border-primary-500 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-950/40 dark:via-neutral-800 dark:to-secondary-950/40 shadow-xl shadow-primary-500/30"
                    : "border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm hover:shadow-lg"
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />

                {selected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-2 right-2 p-1 bg-primary-500 rounded-full shadow-lg"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                )}

                <div className="relative z-10 text-center">
                  <motion.div
                    className="mb-3"
                    animate={selected ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <size.icon
                      className={`w-8 h-8 mx-auto ${
                        selected
                          ? "text-primary-600 dark:text-primary-400"
                          : "text-neutral-500 dark:text-neutral-400"
                      }`}
                    />
                  </motion.div>
                  <div className="font-bold text-base text-neutral-900 dark:text-neutral-50 mb-1">
                    {size.name}
                  </div>
                  <motion.div
                    className={`text-sm font-semibold ${
                      selected
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-neutral-500 dark:text-neutral-500"
                    }`}
                    animate={selected ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    {size.area} sq {unit}
                  </motion.div>
                </div>

                {selected && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute bottom-2 right-2 text-primary-400 opacity-60"
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Custom Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm p-8 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="p-2 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl shadow-lg shadow-secondary-500/30"
          >
            <Ruler className="w-5 h-5 text-white" />
          </motion.div>
          <label className="text-sm font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
            Custom Dimensions
          </label>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
              Width
            </label>
            <div className="relative group">
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 pr-16 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 rounded-xl 
                         text-neutral-900 dark:text-neutral-100 font-medium
                         focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 
                         transition-all duration-200 outline-none"
                min="10"
                max="200"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 font-medium">
                {unit}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
              Length
            </label>
            <div className="relative group">
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 pr-16 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 rounded-xl 
                         text-neutral-900 dark:text-neutral-100 font-medium
                         focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 
                         transition-all duration-200 outline-none"
                min="10"
                max="200"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 font-medium">
                {unit}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 rounded-xl 
                       text-neutral-900 dark:text-neutral-100 font-medium
                       focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 
                       transition-all duration-200 outline-none cursor-pointer"
            >
              <option value="feet">Feet</option>
              <option value="meters">Meters</option>
            </select>
          </motion.div>
        </div>
      </motion.div>

      {/* Plot Area Display */}
      {validation && validation.area > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="p-8 bg-gradient-to-br from-primary-50 via-white to-secondary-50 
                   dark:from-primary-950/30 dark:via-neutral-800 dark:to-secondary-950/30 
                   rounded-3xl border-2 border-primary-200 dark:border-primary-800 shadow-xl"
        >
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-lg"
              >
                <CheckCircle2 className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                  Total Plot Area
                </div>
                <motion.div
                  key={validation.area}
                  initial={{ scale: 1.2, color: "#6b7ff2" }}
                  animate={{ scale: 1, color: "#171717" }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl font-bold text-neutral-900 dark:text-neutral-100"
                >
                  {validation.area.toLocaleString()}
                  <span className="text-lg text-primary-600 dark:text-primary-400 ml-2">
                    sq {unit}
                  </span>
                </motion.div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                Approx. built-up area:
              </div>
              <div className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                {(validation.area * 0.6).toLocaleString()} -{" "}
                {(validation.area * 0.8).toLocaleString()} sq {unit}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Suggestions */}
      <AnimatePresence>
        {validation &&
          validation.suggestions?.length > 0 &&
          validation.suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <SuggestionBox suggestion={suggestion} />
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Pro Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 
                 dark:from-amber-950/20 dark:via-yellow-950/20 dark:to-orange-950/20 
                 p-6 rounded-3xl border border-amber-200 dark:border-amber-800 shadow-lg"
      >
        <div className="flex gap-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex-shrink-0"
          >
            <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </motion.div>
          <div>
            <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-3 text-lg">
              Pro Tips
            </h4>
            <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-0.5">
                  •
                </span>
                <span>
                  Ideal plot ratio for residential: 1:1.5 to 1:2 (width:length)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-0.5">
                  •
                </span>
                <span>Leave 10-20% space for future expansion</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-0.5">
                  •
                </span>
                <span>
                  Consider setback requirements: typically 5-10 feet on all
                  sides
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-0.5">
                  •
                </span>
                <span>
                  Rectangular plots are easier to design than irregular shapes
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="flex justify-end pt-4"
      >
        <motion.button
          whileHover={{
            scale: validation?.valid ? 1.02 : 1,
            x: validation?.valid ? 5 : 0,
          }}
          whileTap={{ scale: validation?.valid ? 0.98 : 1 }}
          onClick={handleContinue}
          disabled={!validation || !validation.valid}
          className={`group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 ${
            validation?.valid
              ? "bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
              : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
          }`}
        >
          Continue
          <motion.div
            animate={validation?.valid ? { x: [0, 5, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PlotSizeStep;
