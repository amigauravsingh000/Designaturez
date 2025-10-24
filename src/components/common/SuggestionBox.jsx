import { AlertCircle, CheckCircle2, Lightbulb, Info } from "lucide-react";

const SuggestionBox = ({ suggestion }) => {
  const icons = {
    error: AlertCircle,
    warning: AlertCircle,
    success: CheckCircle2,
    tip: Lightbulb,
    info: Info,
  };

  const styles = {
    error: "suggestion-bad",
    warning: "suggestion-tip",
    success: "suggestion-good",
    tip: "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 rounded-r-lg",
    info: "bg-gray-50 dark:bg-neutral-700 border-l-4 border-gray-400 dark:border-neutral-500 p-4 rounded-r-lg",
  };

  const iconColors = {
    error: "text-red-600",
    warning: "text-amber-600",
    success: "text-green-600",
    tip: "text-blue-600 dark:text-blue-400",
    info: "text-gray-600 dark:text-neutral-400",
  };

  const Icon = icons[suggestion.type] || Info;

  return (
    <div className={styles[suggestion.type]}>
      <div className="flex items-start">
        <Icon
          className={`w-5 h-5 ${
            iconColors[suggestion.type]
          } mr-3 mt-0.5 flex-shrink-0`}
        />
        <p className="text-sm text-gray-800 dark:text-neutral-200">
          {suggestion.message}
        </p>
      </div>
    </div>
  );
};

export default SuggestionBox;
