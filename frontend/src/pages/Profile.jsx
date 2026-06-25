import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "../components/ToastProvider.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { auth } from "../firebase/firebase.js";

function Section({ title, subtitle, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass"
      style={{ borderRadius: 20, padding: "24px 24px", display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div>
        <h2 className="display" style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px", letterSpacing: -0.3 }}>
          {title}
        </h2>
        {subtitle && <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
}

function GlassInput({ label, id, type = "text", value, onChange, placeholder, disabled }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label htmlFor={id} className="mono"
        style={{ fontSize: 11, letterSpacing: 0.5, color: "var(--text-faint)", textTransform: "uppercase" }}>
        {label}
      </label>
      <div style={{
        borderRadius: 14, padding: "1px",
        background: disabled
          ? "rgba(255,255,255,0.04)"
          : focused
          ? "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))"
          : "rgba(255,255,255,0.08)",
        transition: "background 0.25s",
      }}>
        <input
          id={id} type={type} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder} disabled={disabled}
          style={{
            width: "100%",
            background: disabled ? "rgba(255,255,255,0.02)" : "rgba(5,8,22,0.85)",
            border: "none", borderRadius: 13,
            padding: "12px 16px", color: disabled ? "var(--text-faint)" : "var(--text)",
            fontSize: 14, fontFamily: "var(--font-body)", outline: "none",
            cursor: disabled ? "not-allowed" : "text",
          }}
        />
      </div>
    </div>
  );
}

function PrimaryButton({ children, onClick, loading, disabled }) {
  const active = !disabled && !loading;
  return (
    <motion.button
      whileTap={{ scale: active ? 0.97 : 1 }}
      whileHover={{ scale: active ? 1.01 : 1 }}
      onClick={onClick}
      disabled={!active}
      style={{
        alignSelf: "flex-start",
        padding: "11px 22px", borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.22)",
        cursor: active ? "pointer" : "not-allowed",
        fontSize: 13.5, fontWeight: 600, color: "#fff",
        background: active
          ? "linear-gradient(135deg, var(--accent-violet), var(--accent-blue))"
          : "rgba(255,255,255,0.06)",
        boxShadow: active
          ? "inset 0 1px 0 rgba(255,255,255,0.3), 0 8px 24px -8px rgba(124,58,237,0.6)"
          : "none",
        opacity: active ? 1 : 0.5,
        display: "flex", alignItems: "center", gap: 8,
        transition: "background 0.2s, opacity 0.2s",
      }}
    >
      {loading ? (
        <>
          <span style={{
            width: 13, height: 13, borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff",
            animation: "spin 0.7s linear infinite",
          }} />
          Saving…
        </>
      ) : children}
    </motion.button>
  );
}

export function Profile() {
  const { user } = useAuth();
  const toast = useToast();

  // Display name
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [nameLoading, setNameLoading] = useState(false);

  // Password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  const isGoogleUser = user?.providerData?.some((p) => p.providerId === "google.com");

  async function handleSaveName() {
    if (!displayName.trim()) return;
    setNameLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: displayName.trim() });
      toast.push("Display name updated.", "success");
    } catch (e) {
      toast.push("Failed to update name.", "error");
    } finally {
      setNameLoading(false);
    }
  }

  async function handleChangePassword() {
    if (newPassword !== confirmPassword) {
      toast.push("Passwords do not match.", "error");
      return;
    }
    if (newPassword.length < 6) {
      toast.push("Password must be at least 6 characters.", "error");
      return;
    }
    setPwLoading(true);
    try {
      // Re-authenticate first
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      toast.push("Password updated successfully.", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      const msg =
        e.code === "auth/wrong-password" ? "Current password is incorrect." :
        e.code === "auth/too-many-requests" ? "Too many attempts. Try again later." :
        "Failed to update password.";
      toast.push(msg, "error");
    } finally {
      setPwLoading(false);
    }
  }

  const initials = user?.displayName
    ? user.displayName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "?";

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "8px 4px 60px" }}>
      {/* Header */}
      <div style={{ marginBottom: 24, marginTop: 12 }}>
        <span className="mono" style={{ fontSize: 11.5, color: "var(--accent-purple)", letterSpacing: 1, textTransform: "uppercase" }}>
          Account
        </span>
        <h1 className="display" style={{ fontSize: 28, fontWeight: 700, margin: "8px 0 4px", letterSpacing: -0.6 }}>
          Profile settings
        </h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Avatar + identity */}
        <Section title="Identity" subtitle="How you appear in ObjectionAI.">
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, var(--accent-violet), var(--accent-blue))",
              display: "grid", placeItems: "center",
              border: "2px solid rgba(255,255,255,0.22)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 0 28px rgba(124,58,237,0.4)",
              fontSize: 22, fontWeight: 700, color: "#fff",
              fontFamily: "var(--font-display)",
            }}>
              {initials}
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>
                {user?.displayName || "No display name set"}
              </p>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "0 0 4px" }}>{user?.email}</p>
              {isGoogleUser && (
                <span className="mono" style={{
                  fontSize: 10.5, color: "var(--accent-blue)",
                  background: "rgba(59,130,246,0.12)",
                  borderRadius: 6, padding: "2px 8px",
                  letterSpacing: 0.3,
                }}>
                  GOOGLE ACCOUNT
                </span>
              )}
            </div>
          </div>

          <GlassInput
            id="displayName" label="Display name"
            value={displayName} onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
          />
          <GlassInput
            id="email" label="Email address"
            value={user?.email || ""} disabled
            placeholder=""
          />
          <PrimaryButton onClick={handleSaveName} loading={nameLoading} disabled={!displayName.trim()}>
            Save name
          </PrimaryButton>
        </Section>

        {/* Password — only for email/password users */}
        {!isGoogleUser && (
          <Section title="Change password" subtitle="Use a strong password you don't use elsewhere.">
            <GlassInput
              id="currentPw" label="Current password" type="password"
              value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
            <GlassInput
              id="newPw" label="New password" type="password"
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password (min 6 chars)"
            />
            <GlassInput
              id="confirmPw" label="Confirm new password" type="password"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
            />
            <PrimaryButton
              onClick={handleChangePassword}
              loading={pwLoading}
              disabled={!currentPassword || !newPassword || !confirmPassword}
            >
              Update password
            </PrimaryButton>
          </Section>
        )}

        {/* Account meta */}
        <Section title="Account info">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "User ID", value: user?.uid },
              { label: "Account created", value: user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, { dateStyle: "long" })
                  : "—" },
              { label: "Last sign-in", value: user?.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleDateString(undefined, { dateStyle: "long" })
                  : "—" },
            ].map((row) => (
              <div key={row.label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 14px", borderRadius: 12,
                background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)",
              }}>
                <span className="mono" style={{ fontSize: 11.5, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                  {row.label}
                </span>
                <span className="mono" style={{ fontSize: 12, color: "var(--text-secondary)", maxWidth: "60%", textAlign: "right", wordBreak: "break-all" }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}