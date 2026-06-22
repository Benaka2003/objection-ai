import { ResponseCard } from "./ResponseCard.jsx";

export function ResponseGrid({ responses }) {
  if (!responses || responses.length === 0) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16,
        marginTop: 16,
      }}
    >
      {responses.map((item, i) => (
        <ResponseCard key={item.style + i} item={item} index={i} />
      ))}
    </div>
  );
}
