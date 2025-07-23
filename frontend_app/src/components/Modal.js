import React from "react";

/**
 * Minimal modal dialog root.
 * @param {Object} props
 * @param {boolean} props.open - If true, modal is shown.
 * @param {Function} props.onClose - Closes modal.
 * @param {React.ReactNode} props.children - Modal content.
 */
// PUBLIC_INTERFACE
export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1030,
        background: "rgba(0,0,0,0.13)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        style={{
          minWidth: 340,
          maxWidth: "97vw",
          maxHeight: "95vh",
          background: "#fff",
          padding: "2rem 1.5rem",
          borderRadius: 9,
          boxShadow: "0 8px 36px 0 rgba(0,0,0,.09)",
          outline: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}
