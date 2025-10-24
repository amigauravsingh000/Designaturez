import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WizardContainer from "./components/WizardContainer";
import { DesignProvider, useDesign } from "./context/DesignContext";
import QuickTutorial from "./components/QuickTutorial";
import {
  Moon,
  Sun,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Home,
  Sparkles,
  Zap,
  Shield,
  Layers,
} from "lucide-react";

const AppContent = () => {
  const { theme, toggleTheme } = useDesign();
  const [notification, setNotification] = useState(null);
  const [showLanding, setShowLanding] = useState(true);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Landing Page Component
  const LandingPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-16 sm:py-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20 sm:mb-24"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-10 sm:mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 p-7 sm:p-8 rounded-3xl shadow-2xl"
              >
                <Home className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
              </motion.div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-3xl blur-3xl opacity-40 -z-10"></div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-8 px-4"
          >
            <span className="bg-gradient-to-r from-neutral-900 via-primary-700 to-secondary-700 dark:from-neutral-100 dark:via-primary-300 dark:to-secondary-400 bg-clip-text text-transparent">
              Designature
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 mb-5 max-w-3xl mx-auto font-medium px-4"
          >
            AI-Powered Home Design Platform
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-neutral-500 dark:text-neutral-500 mb-14 max-w-2xl mx-auto px-6"
          >
            Create your dream home with intelligent Vastu compliance, smart
            design suggestions, and professional-grade floor plans
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLanding(false)}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 transition-all"
          >
            Start Designing
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-2"
        >
          {[
            {
              icon: Sparkles,
              title: "AI-Powered",
              description:
                "Intelligent design suggestions tailored to your needs",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: Shield,
              title: "Vastu Compliant",
              description: "Traditional wisdom meets modern architecture",
              color: "from-primary-500 to-secondary-500",
            },
            {
              icon: Layers,
              title: "Professional",
              description: "Export-ready designs in PDF, PNG, and JSON",
              color: "from-accent-500 to-secondary-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="relative bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-2xl transition-all">
                <div
                  className={`inline-flex p-4 sm:p-5 bg-gradient-to-br ${feature.color} rounded-2xl mb-5 sm:mb-6 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background with Gradient Orbs */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900">
        {/* Floating gradient orbs for depth */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[32rem] h-[32rem] bg-secondary-500/10 dark:bg-secondary-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent-500/5 dark:bg-accent-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Theme Toggle Button - Clean and Minimal */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-6 sm:top-8 right-6 sm:right-8 z-50"
      >
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-3.5 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-neutral-200/50 dark:border-neutral-700/50 overflow-hidden"
          title="Toggle Theme"
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-5 h-5 text-warning-500" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-5 h-5 text-primary-600" />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="absolute -bottom-8 right-0 text-xs font-medium text-neutral-600 dark:text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Theme
          </span>
        </motion.button>
      </motion.div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
          >
            <div
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
                notification.type === "success"
                  ? "bg-success-50/90 dark:bg-success-900/90 border-success-200 dark:border-success-800"
                  : "bg-danger-50/90 dark:bg-danger-900/90 border-danger-200 dark:border-danger-800"
              }`}
            >
              {notification.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-danger-600 dark:text-danger-400" />
              )}
              <p
                className={`font-medium ${
                  notification.type === "success"
                    ? "text-success-900 dark:text-success-100"
                    : "text-danger-900 dark:text-danger-100"
                }`}
              >
                {notification.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content with Smooth Entry Animation */}
      <AnimatePresence mode="wait">
        {showLanding ? (
          <LandingPage key="landing" />
        ) : (
          <motion.div
            key="wizard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <WizardContainer />
          </motion.div>
        )}
      </AnimatePresence>

      {!showLanding && <QuickTutorial />}
    </div>
  );
};

function App() {
  return (
    <DesignProvider>
      <AppContent />
    </DesignProvider>
  );
}

export default App;
