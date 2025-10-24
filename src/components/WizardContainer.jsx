import { motion, AnimatePresence } from "framer-motion";
import { useDesign } from "../context/DesignContext";
import PlotSizeStep from "./steps/PlotSizeStep";
import DirectionStep from "./steps/DirectionStep";
import FloorsStep from "./steps/FloorsStep";
import RoomsStepEnhanced from "./steps/RoomsStepEnhanced";

import LayoutDesignStepEnhanced from "./steps/LayoutDesignStepEnhanced";
import CustomizationStep from "./steps/CustomizationStep";
import ReviewStepEnhanced from "./steps/ReviewStepEnhanced";
import {
  Home,
  CheckCircle,
  Sparkles,
  Ruler,
  Compass,
  Building2,
  BedDouble,
  Star,
  LayoutGrid,
  Palette,
  CheckSquare,
} from "lucide-react";

const STEPS = [
  { id: 0, name: "Plot Size", component: PlotSizeStep, icon: Ruler },
  { id: 1, name: "Direction", component: DirectionStep, icon: Compass },
  { id: 2, name: "Floors", component: FloorsStep, icon: Building2 },
  { id: 3, name: "Rooms", component: RoomsStepEnhanced, icon: BedDouble },
  {
    id: 4,
    name: "Layout",
    component: LayoutDesignStepEnhanced,
    icon: LayoutGrid,
  },
  { id: 5, name: "Customize", component: CustomizationStep, icon: Palette },
  { id: 6, name: "Review", component: ReviewStepEnhanced, icon: CheckSquare },
];

const WizardContainer = () => {
  const { currentStep } = useDesign();
  const CurrentStepComponent = STEPS[currentStep].component;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen py-6 sm:py-12 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Progress Section - Clean and Minimal */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 sm:mb-12"
        >
          {/* Overall Progress Bar */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Progress
              </span>
              <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between max-w-5xl mx-auto px-2 overflow-x-auto pb-4 scrollbar-hide">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-center flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="flex flex-col items-center min-w-[80px] sm:min-w-[100px]">
                  {/* Step Circle */}
                  <motion.div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 ${
                      index < currentStep
                        ? "bg-gradient-to-br from-success-500 to-success-600 text-white shadow-lg shadow-success-500/30"
                        : index === currentStep
                        ? "bg-gradient-to-br from-primary-500 to-secondary-600 text-white shadow-2xl shadow-primary-500/40"
                        : "bg-white dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 border-2 border-neutral-200 dark:border-neutral-700"
                    }`}
                    whileHover={{
                      scale: 1.05,
                      rotate: index === currentStep ? 5 : 0,
                    }}
                    animate={{
                      scale: index === currentStep ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                      scale: {
                        duration: 2,
                        repeat: index === currentStep ? Infinity : 0,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    {index < currentStep ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                      </motion.div>
                    ) : (
                      <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                    {/* Active Step Pulse Ring */}
                    {index === currentStep && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-primary-500/20 dark:bg-primary-400/20"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Step Label */}
                  <motion.span
                    className={`text-xs sm:text-sm mt-2 font-semibold text-center transition-all px-2 ${
                      index === currentStep
                        ? "text-primary-600 dark:text-primary-400 scale-105"
                        : index < currentStep
                        ? "text-success-600 dark:text-success-400"
                        : "text-neutral-500 dark:text-neutral-500"
                    }`}
                    animate={{
                      y: index === currentStep ? [0, -2, 0] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: index === currentStep ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    {step.name}
                  </motion.span>
                </div>

                {/* Connector Line */}
                {index < STEPS.length - 1 && (
                  <motion.div
                    className={`h-0.5 w-8 sm:w-12 mx-1 sm:mx-2 rounded-full transition-all duration-500 ${
                      index < currentStep
                        ? "bg-gradient-to-r from-success-500 to-success-600"
                        : "bg-neutral-200 dark:bg-neutral-700"
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step Content with Smooth Page Transitions */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.98 }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WizardContainer;
