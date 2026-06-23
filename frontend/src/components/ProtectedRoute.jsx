import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import { IconBolt } from "./Icons.jsx";

function AuthLoadingScreen() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.08)",
          borderTopColor: "var(--accent-purple)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 0 18px rgba(139,92,246,0.5)",
          }}
        >
          <IconBolt color="#fff" width={13} height={13} />
        </div>
        <span
          className="display"
          style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.2, color: "var(--text)" }}
        >
          ObjectionAI
        </span>
      </div>
    </div>
  );
}

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <AuthLoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
