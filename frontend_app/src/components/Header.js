import React from "react";

/**
 * Header component displays the logo/title and navigation.
 * @param {Object} props
 * @param {function} props.onLogout - Logs out the user.
 * @param {Object} props.user - The current authenticated user.
 */
// PUBLIC_INTERFACE
export default function Header({ onLogout, user }) {
  return (
    <header
      style={{
        background: "var(--color-bg-light)",
        padding: "1.25rem 2rem 1.25rem 2rem",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #eee",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 22, color: "var(--color-primary)" }}>
        📝 Minimal To-Do
      </div>
      <nav>
        {user ? (
          <span style={{ fontSize: 14, marginRight: 14, color: "var(--color-secondary)" }}>
            {user.email}
          </span>
        ) : null}
        {user && (
          <button
            onClick={onLogout}
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "0.5rem 1rem",
              fontWeight: 500,
              cursor: "pointer",
              marginLeft: 8,
              fontSize: 14,
            }}
            aria-label="Logout"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
