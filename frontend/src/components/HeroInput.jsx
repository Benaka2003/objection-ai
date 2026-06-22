import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { EXAMPLE_OBJECTIONS, MAX_OBJECTION_CHARS } from "../utils/constants.js";
import { IconBolt } from "./Icons.jsx";

export function HeroInput({ onAnalyse, loading }) {
  const [input, setInput] = useState("");
  const [context, setContext] = useState("general");
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onAnalyse(input);
    }
  };

  const charCount = input.length;
  const canSubmit = input.trim().length > 0 && !loading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass"
      style={{ borderRadius: 24, padding: 24 }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <label className="mono" style={{ fontSize: 11, color: "var(--text-faint)", letterSpacing: 0.5, textTransform: "uppercase" }}>
          Customer objection
        </label>
        <select
          value={context}
          onChange={(e) => setContext(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            fontSize: 12,
            borderRadius: 8,
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          <option value="general">General</option>
          <option value="enterprise">Enterprise deal</option>
          <option value="smb">SMB deal</option>
          <option value="renewal">Renewal call</option>
        </select>
      </div>

      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value.slice(0, MAX_OBJECTION_CHARS))}
        onKeyDown={handleKeyDown}
        placeholder="Paste what the customer said…"
        rows={4}
        style={{
          width: "100%",
          resize: "vertical",
          minHeight: 96,
          background: "rgba(0,0,0,0.18)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.25)",
          borderRadius: 16,
          padding: 16,
          color: "var(--text)",
          fontSize: 14.5,
          lineHeight: 1.6,
          fontFamily: "var(--font-body)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="mono" style={{ fontSize: 11, color: charCount > MAX_OBJECTION_CHARS - 40 ? "var(--danger)" : "var(--text-faint)" }}>
            {charCount}/{MAX_OBJECTION_CHARS}
          </span>
          <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>
            ⌘/Ctrl + Enter to analyse
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: canSubmit ? 1.02 : 1 }}
          onClick={() => onAnalyse(input)}
          disabled={!canSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "11px 22px",
            borderRadius: 14,
            border: canSubmit ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
            cursor: canSubmit ? "pointer" : "not-allowed",
            fontSize: 13.5,
            fontWeight: 600,
            color: "#fff",
            background: canSubmit
              ? "linear-gradient(135deg, var(--accent-violet), var(--accent-blue))"
              : "rgba(255,255,255,0.06)",
            boxShadow: canSubmit
              ? "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -8px 16px rgba(0,0,0,0.15), 0 10px 28px -8px rgba(124,58,237,0.65)"
              : "none",
            opacity: !input.trim() && !loading ? 0.5 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {loading ? (
            <>
              <span
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              Analysing…
            </>
          ) : (
            <>
              <IconBolt width={15} height={15} />
              Analyse objection
            </>
          )}
        </motion.button>
      </div>

      {!loading && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
          {EXAMPLE_OBJECTIONS.map((ex) => (
            <button
              key={ex}
              onClick={() => setInput(ex)}
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border)",
                borderRadius: 999,
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
