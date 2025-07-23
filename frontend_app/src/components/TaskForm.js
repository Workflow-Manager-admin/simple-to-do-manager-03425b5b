import React, { useState } from "react";

/**
 * TaskForm for creation or editing of a to-do.
 * @param {Object} props
 * @param {Function} props.onSubmit - Called with {title, description, category} on submit.
 * @param {Function} props.onCancel - Called on cancel/close.
 * @param {Object} [props.initial] - Initial task values for editing.
 */
// PUBLIC_INTERFACE
export default function TaskForm({ onSubmit, onCancel, initial }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError(null);
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--color-primary)" }}>
        {initial ? "Edit Task" : "New Task"}
      </div>
      <div style={{ marginBottom: 13 }}>
        <label htmlFor="task-title" style={{ fontWeight: 500 }}>Title</label>
        <input
          id="task-title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            marginTop: 4,
            marginBottom: 7,
            fontSize: 15,
          }}
        />
      </div>
      <div style={{ marginBottom: 13 }}>
        <label htmlFor="task-category" style={{ fontWeight: 500 }}>Category</label>
        <input
          id="task-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            marginTop: 4,
            marginBottom: 7,
            fontSize: 15,
          }}
          placeholder="e.g. Work, Home"
        />
      </div>
      <div style={{ marginBottom: 15 }}>
        <label htmlFor="task-desc" style={{ fontWeight: 500 }}>Description</label>
        <textarea
          id="task-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{
            display: "block",
            width: "100%",
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            marginTop: 4,
            fontSize: 15,
          }}
          placeholder="Details"
        />
      </div>
      {error ? <div style={{ color: "red", marginBottom: 6, fontSize: 13 }}>{error}</div> : null}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: "transparent",
            color: "var(--color-secondary)",
            border: "none",
            fontSize: 15,
            fontWeight: 500,
            marginRight: 15,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            background: "var(--color-primary)",
            color: "#fff",
            border: "none",
            padding: "7px 22px",
            borderRadius: 4,
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          {initial ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
}
