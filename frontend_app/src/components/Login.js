import React, { useState } from "react";
import { supabase } from "../supabaseClient";

/**
 * Login component provides email/password authentication UI using Supabase.
 * @param {Object} props
 * @param {Function} props.onLogin - Callback after successful login.
 */
// PUBLIC_INTERFACE
export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("signIn"); // or 'signUp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      if (authMode === "signIn") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onLogin();
      }
      if (authMode === "signUp") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setNotice("Sign-up successful! Please check your email for confirmation.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "var(--color-bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "60vh",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <form
        onSubmit={handleAuth}
        style={{
          width: 320,
          maxWidth: "90vw",
          background: "var(--color-bg-light)",
          border: "1px solid #ececec",
          borderRadius: 8,
          padding: 32,
          boxShadow: "0 2px 14px rgba(0,0,0,.04)",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 24, color: "var(--color-primary)", marginBottom: 22 }}>
          {authMode === "signIn" ? "Sign In" : "Create Account"}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email" style={{ fontSize: 14, color: "var(--color-secondary)", fontWeight: 500 }}>
            Email
          </label>
          <input
            autoFocus
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 4,
              border: "1px solid #ddd",
              marginTop: 5,
              fontSize: 16,
            }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password" style={{ fontSize: 14, color: "var(--color-secondary)", fontWeight: 500 }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 4,
              border: "1px solid #ddd",
              marginTop: 5,
              fontSize: 16,
            }}
          />
        </div>
        {error ? (
          <div style={{ color: "red", fontSize: 13, margin: "8px 0 0 0" }}>{error}</div>
        ) : null}
        {notice ? (
          <div style={{ color: "green", fontSize: 13, margin: "8px 0 0 0" }}>{notice}</div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: "var(--color-primary)",
            color: "#fff",
            padding: "10px 0",
            border: "none",
            borderRadius: 4,
            fontWeight: 600,
            letterSpacing: 1,
            fontSize: 16,
            marginTop: 10,
            marginBottom: 2,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.2s",
          }}
        >
          {loading ? "Please wait..." : authMode === "signIn" ? "Sign In" : "Sign Up"}
        </button>
        <div
          style={{
            marginTop: 10,
            fontSize: 13,
            color: "var(--color-secondary)",
            textAlign: "center",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => setAuthMode(authMode === "signIn" ? "signUp" : "signIn")}
        >
          {authMode === "signIn"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </div>
      </form>
    </div>
  );
}
