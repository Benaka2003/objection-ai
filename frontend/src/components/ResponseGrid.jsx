import { Check, Copy, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { rateResponse } from '../api/api';

const STYLE_CONFIG = {
  empathetic: {
    label: 'Empathetic',
    emoji: '💙',
    border: 'border-l-4 border-blue-400',
    bg: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
    ring: 'focus:ring-blue-200',
  },
  logical: {
    label: 'Logical',
    emoji: '🧠',
    border: 'border-l-4 border-gray-400',
    bg: 'bg-gray-50',
    badge: 'bg-gray-200 text-gray-700',
    ring: 'focus:ring-gray-200',
  },
  assertive: {
    label: 'Assertive',
    emoji: '🔥',
    border: 'border-l-4 border-red-400',
    bg: 'bg-red-50',
    badge: 'bg-red-100 text-red-700',
    ring: 'focus:ring-red-200',
  },
};

export default function ResponseCard({ objectionId, style, response }) {
  const [copied, setCopied] = useState(false);
  const [rated, setRated] = useState(null); // null | 1 | -1

  const config = STYLE_CONFIG[style] || STYLE_CONFIG.logical;

  function handleCopy() {
    navigator.clipboard.writeText(response).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!', { duration: 1500 });
      setTimeout(() => setCopied(false), 1500);
    });
  }

  async function handleRate(rating) {
    if (rated !== null) return;
    setRated(rating);
    const { error } = await rateResponse(objectionId, style, rating);
    if (error) {
      toast.error('Could not save feedback.');
      setRated(null);
    } else {
      toast.success('Thanks for your feedback!', { duration: 1500 });
    }
  }

  return (
    <div
      className={`rounded-xl p-4 flex flex-col gap-3 ${config.border} ${config.bg} transition-all hover:shadow-sm`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.badge}`}
        >
          <span>{config.emoji}</span>
          {config.label}
        </span>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          title="Copy response"
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-white transition-all"
        >
          {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
        </button>
      </div>

      {/* Response text */}
      <p className="text-sm text-gray-700 leading-relaxed flex-1">{response}</p>

      {/* Rating buttons */}
      <div className="flex items-center gap-2 pt-1 border-t border-black/5">
        <span className="text-xs text-gray-400">Helpful?</span>
        <button
          onClick={() => handleRate(1)}
          disabled={rated !== null}
          title="Helpful"
          className={`p-1.5 rounded-lg transition-all ${
            rated === 1
              ? 'text-green-600 bg-green-100'
              : rated !== null
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
          }`}
        >
          <ThumbsUp size={14} />
        </button>
        <button
          onClick={() => handleRate(-1)}
          disabled={rated !== null}
          title="Not helpful"
          className={`p-1.5 rounded-lg transition-all ${
            rated === -1
              ? 'text-red-500 bg-red-100'
              : rated !== null
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <ThumbsDown size={14} />
        </button>
      </div>
    </div>
  );
}