import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (message, variant = "default") => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, message, variant }]);
      setTimeout(() => dismiss(id), 3600);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              className="glass"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => dismiss(t.id)}
              style={{
                pointerEvents: "auto",
                cursor: "pointer",
                minWidth: 260,
                maxWidth: 360,
                padding: "13px 17px",
                borderRadius: 16,
                fontSize: 13.5,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 10,
                borderColor:
                  t.variant === "error"
                    ? "rgba(248,113,113,0.35)"
                    : t.variant === "success"
                    ? "rgba(16,185,129,0.35)"
                    : undefined,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${
                    t.variant === "error"
                      ? "rgba(248,113,113,0.7)"
                      : t.variant === "success"
                      ? "rgba(16,185,129,0.7)"
                      : "rgba(139,92,246,0.7)"
                  }`,
                  background:
                    t.variant === "error" ? "var(--danger)" : t.variant === "success" ? "var(--success)" : "var(--accent-purple)",
                }}
              />
              <span style={{ color: "var(--text)" }}>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
