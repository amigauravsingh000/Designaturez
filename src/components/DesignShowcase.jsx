import React, { useState } from "react";
import {
  Sparkles,
  Palette,
  Moon,
  Sun,
  Check,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

/**
 * Design System Showcase Component
 * Demonstrates the modern minimalist color palette and components
 * Inspired by Linear.app, Notion, and Vercel
 */
const DesignShowcase = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background dark:bg-neutral-950 transition-colors duration-300">
        {/* Header */}
        <header className="border-b border-border dark:border-neutral-800 bg-background/80 dark:bg-neutral-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-display font-bold text-foreground dark:text-neutral-50">
                  Design System
                </h1>
                <p className="text-xs text-foreground-tertiary dark:text-neutral-500">
                  Modern Minimalist v2.0
                </p>
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-background-secondary dark:bg-neutral-900 border border-border dark:border-neutral-800 hover:bg-background-tertiary dark:hover:bg-neutral-800 transition-all"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-warning-500" />
              ) : (
                <Moon className="w-5 h-5 text-primary-500" />
              )}
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-slide-down">
              <Palette className="w-4 h-4" />
              New Color System
            </div>

            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-foreground dark:text-neutral-50 mb-6">
              Modern Minimalist
              <span className="block bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
                Design System
              </span>
            </h1>

            <p className="text-xl text-foreground-secondary dark:text-neutral-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              A sophisticated color palette inspired by Linear, Notion, and
              Vercel. Built with color theory principles for perfect harmony and
              accessibility.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary group">
                Explore Components
                <Sparkles className="w-5 h-5 ml-2 inline-block group-hover:animate-pulse" />
              </button>
              <button className="btn-secondary">View Documentation</button>
            </div>
          </div>

          {/* Decorative gradient orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </section>

        {/* Color Palette Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-neutral-50 mb-8">
            Color Palette
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Primary Colors */}
            <div className="bg-background-secondary dark:bg-neutral-900/80 rounded-xl p-6 border border-border dark:border-neutral-800">
              <h3 className="text-lg font-semibold text-foreground dark:text-neutral-50 mb-4">
                Primary
              </h3>
              <div className="space-y-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                  (shade) => (
                    <div key={shade} className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg border border-neutral-200 dark:border-neutral-700`}
                        style={{
                          backgroundColor: `var(--color-primary-${shade})`,
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground dark:text-neutral-200">
                          primary-{shade}
                        </p>
                        <p className="text-xs text-foreground-tertiary dark:text-neutral-500">
                          {shade === 500 && "← Core brand"}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="bg-background-secondary dark:bg-neutral-900/80 rounded-xl p-6 border border-border dark:border-neutral-800">
              <h3 className="text-lg font-semibold text-foreground dark:text-neutral-50 mb-4">
                Secondary
              </h3>
              <div className="space-y-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                  (shade) => (
                    <div key={shade} className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg border border-neutral-200 dark:border-neutral-700`}
                        style={{
                          backgroundColor: `var(--color-secondary-${shade})`,
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground dark:text-neutral-200">
                          secondary-{shade}
                        </p>
                        <p className="text-xs text-foreground-tertiary dark:text-neutral-500">
                          {shade === 500 && "← Accent color"}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Accent Colors */}
            <div className="bg-background-secondary dark:bg-neutral-900/80 rounded-xl p-6 border border-border dark:border-neutral-800">
              <h3 className="text-lg font-semibold text-foreground dark:text-neutral-50 mb-4">
                Accent
              </h3>
              <div className="space-y-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
                  (shade) => (
                    <div key={shade} className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg border border-neutral-200 dark:border-neutral-700`}
                        style={{
                          backgroundColor: `var(--color-accent-${shade})`,
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground dark:text-neutral-200">
                          accent-{shade}
                        </p>
                        <p className="text-xs text-foreground-tertiary dark:text-neutral-500">
                          {shade === 500 && "← Highlight"}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Button Examples */}
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-neutral-50 mb-8 mt-16">
            Buttons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-background-secondary dark:bg-neutral-900/80 rounded-xl p-6 border border-border dark:border-neutral-800">
              <h3 className="text-sm font-semibold text-foreground-secondary dark:text-neutral-400 mb-4">
                PRIMARY BUTTON
              </h3>
              <button className="btn-primary w-full">Get Started</button>
              <p className="text-xs text-foreground-tertiary dark:text-neutral-500 mt-3">
                Main call-to-action
              </p>
            </div>

            <div className="bg-background-secondary dark:bg-neutral-900/80 rounded-xl p-6 border border-border dark:border-neutral-800">
              <h3 className="text-sm font-semibold text-foreground-secondary dark:text-neutral-400 mb-4">
                SECONDARY BUTTON
              </h3>
              <button className="btn-secondary w-full">Learn More</button>
              <p className="text-xs text-foreground-tertiary dark:text-neutral-500 mt-3">
                Secondary actions
              </p>
            </div>

            <div className="bg-background-secondary dark:bg-neutral-900/80 rounded-xl p-6 border border-border dark:border-neutral-800">
              <h3 className="text-sm font-semibold text-foreground-secondary dark:text-neutral-400 mb-4">
                ACCENT BUTTON
              </h3>
              <button className="btn-accent w-full">Premium</button>
              <p className="text-xs text-foreground-tertiary dark:text-neutral-500 mt-3">
                Special features
              </p>
            </div>
          </div>

          {/* Input Fields */}
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-neutral-50 mb-8 mt-16">
            Form Elements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div>
              <label className="block text-sm font-medium text-foreground dark:text-neutral-200 mb-2">
                Text Input
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground dark:text-neutral-200 mb-2">
                Email Input
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="input-field"
              />
            </div>
          </div>

          {/* Alert Components */}
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-neutral-50 mb-8 mt-16">
            Alerts & Notifications
          </h2>

          <div className="space-y-4 max-w-4xl">
            {/* Success */}
            <div className="bg-success-50 dark:bg-success-500/10 border-l-4 border-success-500 dark:border-success-500/50 p-4 rounded-r-lg backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-success-900 dark:text-success-200">
                    Success!
                  </p>
                  <p className="text-sm text-success-800 dark:text-success-300 mt-1">
                    Your design has been saved successfully.
                  </p>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-warning-50 dark:bg-warning-500/10 border-l-4 border-warning-500 dark:border-warning-500/50 p-4 rounded-r-lg backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-warning-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-warning-900 dark:text-warning-200">
                    Attention Required
                  </p>
                  <p className="text-sm text-warning-800 dark:text-warning-300 mt-1">
                    Some rooms may overlap. Please adjust placement.
                  </p>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-secondary-50 dark:bg-secondary-500/10 border-l-4 border-secondary-500 dark:border-secondary-500/50 p-4 rounded-r-lg backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-900 dark:text-secondary-200">
                    Pro Tip
                  </p>
                  <p className="text-sm text-secondary-800 dark:text-secondary-300 mt-1">
                    Place the kitchen in the southeast for optimal Vastu
                    compliance.
                  </p>
                </div>
              </div>
            </div>

            {/* Error */}
            <div className="bg-danger-50 dark:bg-danger-500/10 border-l-4 border-danger-500 dark:border-danger-500/50 p-4 rounded-r-lg backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-danger-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-danger-900 dark:text-danger-200">
                    Error
                  </p>
                  <p className="text-sm text-danger-800 dark:text-danger-300 mt-1">
                    Unable to process your request. Please try again.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <h2 className="text-3xl font-display font-bold text-foreground dark:text-neutral-50 mb-8 mt-16">
            Feature Cards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group step-card">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground dark:text-neutral-50 mb-2">
                AI-Powered Design
              </h3>
              <p className="text-sm text-foreground-secondary dark:text-neutral-300">
                Intelligent room placement suggestions based on Vastu principles
                and modern design theory.
              </p>
            </div>

            <div className="group step-card">
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6 text-secondary-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground dark:text-neutral-50 mb-2">
                Modern Aesthetics
              </h3>
              <p className="text-sm text-foreground-secondary dark:text-neutral-300">
                Beautiful, minimalist interface inspired by Linear, Notion, and
                Vercel.
              </p>
            </div>

            <div className="group step-card">
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Check className="w-6 h-6 text-accent-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground dark:text-neutral-50 mb-2">
                Accessibility First
              </h3>
              <p className="text-sm text-foreground-secondary dark:text-neutral-300">
                WCAG AA+ compliant with perfect contrast ratios for all users.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border dark:border-neutral-800 bg-background-secondary dark:bg-neutral-900/80 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <p className="text-center text-sm text-foreground-secondary dark:text-neutral-400">
              Built with ❤️ using Tailwind CSS & Color Theory Principles
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DesignShowcase;
