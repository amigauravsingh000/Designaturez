import React from "react";
import { Check, AlertTriangle, Info, X, Sparkles } from "lucide-react";

/**
 * Theme Comparison Component
 * Shows before/after of the color system redesign
 */
const ThemeComparison = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-2">
          Design System Transformation
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-12">
          Modern Minimalist Redesign inspired by Linear.app, Notion & Vercel
        </p>

        {/* Color Palette Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* OLD PALETTE */}
          <div className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-6 border-2 border-neutral-300 dark:border-neutral-700">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              🔴 Old Palette (Vibrant Orange/Blue)
            </h2>

            {/* Old Primary */}
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2 text-neutral-700 dark:text-neutral-300">
                Primary - Orange
              </p>
              <div className="flex gap-1">
                <div
                  className="w-12 h-12 rounded"
                  style={{ backgroundColor: "#f97316" }}
                  title="#f97316"
                ></div>
                <div
                  className="w-12 h-12 rounded"
                  style={{ backgroundColor: "#ea580c" }}
                  title="#ea580c"
                ></div>
                <div
                  className="w-12 h-12 rounded"
                  style={{ backgroundColor: "#c2410c" }}
                  title="#c2410c"
                ></div>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                High-energy but potentially harsh
              </p>
            </div>

            {/* Old Accent */}
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2 text-neutral-700 dark:text-neutral-300">
                Accent - Blue
              </p>
              <div className="flex gap-1">
                <div
                  className="w-12 h-12 rounded"
                  style={{ backgroundColor: "#3b82f6" }}
                  title="#3b82f6"
                ></div>
                <div
                  className="w-12 h-12 rounded"
                  style={{ backgroundColor: "#2563eb" }}
                  title="#2563eb"
                ></div>
                <div
                  className="w-12 h-12 rounded"
                  style={{ backgroundColor: "#1d4ed8" }}
                  title="#1d4ed8"
                ></div>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                Strong but common
              </p>
            </div>

            {/* Old Style Example */}
            <div className="mt-6 space-y-3">
              <button
                className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundColor: "#f97316" }}
              >
                Old Primary Button
              </button>
              <button
                className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundColor: "#3b82f6" }}
              >
                Old Accent Button
              </button>
            </div>
          </div>

          {/* NEW PALETTE */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-neutral-900 dark:to-neutral-800 rounded-2xl p-6 border-2 border-primary-300 dark:border-primary-700 shadow-lg">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary-500" />
              New Palette (Modern Minimalist)
            </h2>

            {/* New Primary */}
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                Primary - Purple-Blue
              </p>
              <div className="flex gap-1">
                <div
                  className="w-12 h-12 rounded border border-neutral-200 dark:border-neutral-700"
                  style={{ backgroundColor: "#6b7ff2" }}
                  title="#6b7ff2"
                ></div>
                <div
                  className="w-12 h-12 rounded border border-neutral-200 dark:border-neutral-700"
                  style={{ backgroundColor: "#5865e8" }}
                  title="#5865e8"
                ></div>
                <div
                  className="w-12 h-12 rounded border border-neutral-200 dark:border-neutral-700"
                  style={{ backgroundColor: "#4650d3" }}
                  title="#4650d3"
                ></div>
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-2">
                Professional & sophisticated
              </p>
            </div>

            {/* New Secondary */}
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                Secondary - Cyan-Teal
              </p>
              <div className="flex gap-1">
                <div
                  className="w-12 h-12 rounded border border-neutral-200 dark:border-neutral-700"
                  style={{ backgroundColor: "#0ebde6" }}
                  title="#0ebde6"
                ></div>
                <div
                  className="w-12 h-12 rounded border border-neutral-200 dark:border-neutral-700"
                  style={{ backgroundColor: "#0298c2" }}
                  title="#0298c2"
                ></div>
                <div
                  className="w-12 h-12 rounded border border-neutral-200 dark:border-neutral-700"
                  style={{ backgroundColor: "#07799d" }}
                  title="#07799d"
                ></div>
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-2">
                Calm & modern accent
              </p>
            </div>

            {/* New Accent */}
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                Accent - Warm Purple
              </p>
              <div className="flex gap-1">
                <div
                  className="w-12 h-12 rounded border border-neutral-200 dark:border-neutral-700"
                  style={{ backgroundColor: "#a855f7" }}
                  title="#a855f7"
                ></div>
                <div
                  className="w-12 h-12 rounded border border-neutral-200 dark:border-neutral-700"
                  style={{ backgroundColor: "#9333ea" }}
                  title="#9333ea"
                ></div>
                <div
                  className="w-12 h-12 rounded border border-neutral-200 dark:border-neutral-700"
                  style={{ backgroundColor: "#7e22ce" }}
                  title="#7e22ce"
                ></div>
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-2">
                Creative & energetic
              </p>
            </div>

            {/* New Style Example */}
            <div className="mt-6 space-y-3">
              <button className="btn-primary w-full">New Primary Button</button>
              <button className="btn-secondary w-full">
                New Secondary Button
              </button>
              <button className="btn-accent w-full">New Accent Button</button>
            </div>
          </div>
        </div>

        {/* Alert Comparison */}
        <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
          Alert Components
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* OLD ALERTS */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
              Old Style
            </h3>
            <div className="space-y-3">
              <div
                className="p-4 rounded-lg border-l-4"
                style={{ backgroundColor: "#bbf7d0", borderColor: "#22c55e" }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#14532d" }}
                >
                  Success
                </p>
                <p className="text-sm" style={{ color: "#166534" }}>
                  Operation completed
                </p>
              </div>
              <div
                className="p-4 rounded-lg border-l-4"
                style={{ backgroundColor: "#fde68a", borderColor: "#f59e0b" }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#78350f" }}
                >
                  Warning
                </p>
                <p className="text-sm" style={{ color: "#92400e" }}>
                  Please review your input
                </p>
              </div>
            </div>
          </div>

          {/* NEW ALERTS */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
              New Style
            </h3>
            <div className="space-y-3">
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
                      Operation completed successfully
                    </p>
                  </div>
                </div>
              </div>

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
                      Please review your input carefully
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Typography Comparison */}
        <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
          Typography System
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* OLD TYPOGRAPHY */}
          <div className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
              Old System
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Heading (Basic)
              </p>
              <p className="text-neutral-700 dark:text-neutral-300">
                Body text with standard spacing
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Small text for captions
              </p>
            </div>
          </div>

          {/* NEW TYPOGRAPHY */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-neutral-900 dark:to-neutral-800 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
            <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-50">
              New System (Inter + Poppins)
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                Heading (Modern)
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Body text with optimized line-height and letter-spacing
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 tracking-wide">
                Small text with improved legibility
              </p>
            </div>
          </div>
        </div>

        {/* Key Improvements */}
        <div className="mt-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 rounded-2xl p-8 border border-primary-200 dark:border-primary-800">
          <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-50 mb-6">
            ✨ Key Improvements
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/10 rounded-lg flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50 mb-2">
                Professional Palette
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Sophisticated purple-blue replaces harsh orange for a more
                trustworthy, modern feel
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-500/10 rounded-lg flex items-center justify-center mb-3">
                <Check className="w-6 h-6 text-secondary-500" />
              </div>
              <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50 mb-2">
                WCAG AA+ Compliant
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                All color combinations meet accessibility standards with proper
                contrast ratios
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-500/10 rounded-lg flex items-center justify-center mb-3">
                <Info className="w-6 h-6 text-accent-500" />
              </div>
              <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50 mb-2">
                Enhanced Dark Mode
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Sophisticated dark theme with backdrop blur and colored shadows
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeComparison;
