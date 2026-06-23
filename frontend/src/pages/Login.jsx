import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import { IconBolt } from "../components/Icons.jsx";

function FirebaseErrorMessage(code) {
  const map = {
    "auth/invalid-credential": "Invalid email or password.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/popup-closed-by-user": "Sign-in popup was closed. Please try again.",
    "auth/cancelled-popup-request": "Sign-in was cancelled.",
    "auth/popup-blocked": "Popup was blocked by your browser. Please allow popups for this site.",
    "auth/account-exists-with-different-credential":
      "An account already exists with the same email. Try signing in with email and password.",
  };
  return map[code] || "Something went wrong. Please try again.";
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GlassInput({ label, id, type = "text", value, onChange, placeholder, autoComplete }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label
        htmlFor={id}
        className="mono"
        style={{ fontSize: 11, letterSpacing: 0.5, color: "var(--text-faint)", textTransform: "uppercase" }}
      >
        {label}
      </label>
      <div
        style={{
          borderRadius: 14,
          padding: "1px",
          background: focused
            ? "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))"
            : "rgba(255,255,255,0.08)",
          transition: "background 0.25s",
        }}
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          style={{
            width: "100%",
            background: "rgba(5,8,22,0.85)",
            border: "none",
            borderRadius: 13,
            padding: "13px 16px",
            color: "var(--text)",
            fontSize: 14.5,
            fontFamily: "var(--font-body)",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}

function Divider({ label = "or" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
      <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)", letterSpacing: 0.5 }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}

export function Login() {
  const { login, loginWithGoogle } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setError("");
    setLoading(true);
    try {
      await login(email.trim(), password);
      toast.push("Welcome back!", "success");
      navigate("/", { replace: true });
    } catch (err) {
      const msg = FirebaseErrorMessage(err.code);
      setError(msg);
      toast.push(msg, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.push("Signed in with Google!", "success");
      navigate("/", { replace: true });
    } catch (err) {
      const msg = FirebaseErrorMessage(err.code);
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
        setError(msg);
        toast.push(msg, "error");
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  const anyLoading = loading || googleLoading;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      {/* ambient orbs */}
      <div style={{
        position: "fixed", top: "10%", left: "20%", width: 400, height: 400,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.22), transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "15%", right: "15%", width: 320, height: 320,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 32 }}
        >
          <div style={{
            width: 38, height: 38, borderRadius: 13,
            background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
            display: "grid", placeItems: "center",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 0 28px rgba(139,92,246,0.55)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}>
            <IconBolt color="#fff" width={18} height={18} />
          </div>
          <span className="display" style={{ fontWeight: 700, fontSize: 20, letterSpacing: -0.4 }}>
            ObjectionAI
          </span>
        </motion.div>

        {/* Card */}
        <motion.div
          className="glass"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          style={{ borderRadius: 24, padding: "32px 28px", display: "flex", flexDirection: "column", gap: 22 }}
        >
          <div>
            <h1 className="display" style={{ fontWeight: 700, fontSize: 24, letterSpacing: -0.5, margin: "0 0 6px" }}>
              Welcome back
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
              Sign in to your workspace to continue.
            </p>
          </div>

          {/* ── Google button ─────────────────────────────────────── */}
          <motion.button
            onClick={handleGoogle}
            disabled={anyLoading}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: anyLoading ? 1 : 1.01 }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "12px 20px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.14)",
              background: googleLoading
                ? "rgba(255,255,255,0.03)"
                : "rgba(255,255,255,0.06)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
              cursor: anyLoading ? "not-allowed" : "pointer",
              color: "var(--text)",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              transition: "background 0.2s, border-color 0.2s",
              opacity: anyLoading ? 0.65 : 1,
            }}
            onMouseEnter={(e) => {
              if (!anyLoading) {
                e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
            }}
          >
            {googleLoading ? (
              <>
                <span style={{
                  width: 16, height: 16, borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "var(--accent-purple)",
                  animation: "spin 0.7s linear infinite", flexShrink: 0,
                }} />
                Connecting to Google…
              </>
            ) : (
              <>
                <GoogleIcon />
                Continue with Google
              </>
            )}
          </motion.button>

          <Divider label="or sign in with email" />

          {/* ── Email / password form ─────────────────────────────── */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <GlassInput
              id="email" label="Email" type="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com" autoComplete="email"
            />
            <GlassInput
              id="password" label="Password" type="password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" autoComplete="current-password"
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "10px 14px", borderRadius: 10,
                  background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.28)",
                  fontSize: 13, color: "var(--danger)", lineHeight: 1.5,
                }}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={anyLoading || !email.trim() || !password}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: anyLoading ? 1 : 1.01 }}
              style={{
                marginTop: 2,
                padding: "13px 20px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.22)",
                cursor: anyLoading || !email.trim() || !password ? "not-allowed" : "pointer",
                fontSize: 14.5, fontWeight: 600, color: "#fff",
                background: anyLoading || !email.trim() || !password
                  ? "rgba(255,255,255,0.06)"
                  : "linear-gradient(135deg, var(--accent-violet), var(--accent-blue))",
                boxShadow: anyLoading || !email.trim() || !password
                  ? "none"
                  : "inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 28px -8px rgba(124,58,237,0.65)",
                opacity: !email.trim() || !password ? 0.5 : 1,
                transition: "background 0.2s, opacity 0.2s, box-shadow 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 14, height: 14, borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </motion.button>
          </form>

          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 13.5, color: "var(--text-secondary)" }}>Don't have an account? </span>
            <Link to="/signup" style={{ fontSize: 13.5, fontWeight: 600, color: "var(--accent-purple)", textDecoration: "none" }}>
              Create one
            </Link>
          </div>
        </motion.div>

        <p className="mono" style={{
          textAlign: "center", marginTop: 20, fontSize: 11,
          color: "var(--text-faint)", letterSpacing: 0.3,
        }}>
          SECURED BY FIREBASE AUTHENTICATION
        </p>
      </motion.div>
    </div>
  );
}
