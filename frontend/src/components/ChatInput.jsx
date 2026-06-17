import { Send } from 'lucide-react';
import { useState } from 'react';

const MAX = 500;
const MIN = 5;

const CONTEXTS = ['B2B Enterprise', 'SMB', 'General'];

export default function ChatInput({ onSubmit, isLoading, context, onContextChange }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const remaining = MAX - value.length;
  const tooShort = value.trim().length > 0 && value.trim().length < MIN;
  const tooLong = value.length > MAX;

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();

    if (!trimmed) {
      setError('Please enter an objection first.');
      return;
    }
    if (trimmed.length < MIN) {
      setError(`Please be more specific — at least ${MIN} characters.`);
      return;
    }
    if (trimmed.length > MAX) {
      setError(`Please shorten your input to under ${MAX} characters.`);
      return;
    }

    // Strip HTML tags before sending
    const sanitised = trimmed.replace(/<[^>]*>/g, '');

    setError('');
    onSubmit(sanitised);
    setValue('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <div className="w-full">
      {/* Context selector */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-500 font-medium">Deal context:</span>
        <div className="flex gap-1">
          {CONTEXTS.map((c) => (
            <button
              key={c}
              onClick={() => onContextChange(c)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                context === c
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError('');
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type the objection you just received... e.g. 'Your price is too high for us right now.'"
          rows={3}
          disabled={isLoading}
          className={`w-full resize-none rounded-xl border px-4 py-3 pr-14 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            tooLong || error
              ? 'border-red-300 focus:ring-red-200'
              : tooShort
              ? 'border-amber-300 focus:ring-amber-200'
              : 'border-gray-200 focus:ring-blue-200 focus:border-blue-400'
          }`}
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || !value.trim() || tooLong}
          className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </button>
      </form>

      {/* Character counter + error */}
      <div className="flex items-center justify-between mt-1 px-1">
        <span className="text-xs text-red-500 min-h-[16px]">{error}</span>
        <span
          className={`text-xs font-mono ${
            remaining < 50 ? 'text-red-500' : remaining < 100 ? 'text-amber-500' : 'text-gray-400'
          }`}
        >
          {remaining}
        </span>
      </div>

      <p className="text-xs text-gray-400 mt-1 px-1">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}