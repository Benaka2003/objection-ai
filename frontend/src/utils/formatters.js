/**
 * Converts a timestamp into a short relative-time string ("5m ago"),
 * falling back to a locale date for anything older than a day.
 */
export function timeAgo(ts) {
  if (!ts) return "";

  let date;

  if (ts._seconds) {
    date = new Date(ts._seconds * 1000);
  } else if (ts.seconds) {
    date = new Date(ts.seconds * 1000);
  } else {
    date = new Date(ts);
  }

  if (isNaN(date.getTime())) return "";

  const diff = (Date.now() - date.getTime()) / 1000;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

/**
 * Normalizes a confidence value (0-1 or 0-100) into a whole percentage,
 * or null if not a usable number.
 */
export function formatConfidence(confidence) {
  if (typeof confidence !== "number") return null;
  return Math.round(confidence <= 1 ? confidence * 100 : confidence);
}
