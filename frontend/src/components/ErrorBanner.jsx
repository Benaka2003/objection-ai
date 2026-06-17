import { AlertCircle, X } from 'lucide-react';

export default function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="w-full flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 animate-fadeIn">
      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
      <p className="text-sm flex-1">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}