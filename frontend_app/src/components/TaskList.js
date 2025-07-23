import React from "react";

/**
 * TaskList component: displays list of tasks, allows marking completion, edit/delete.
 * @param {Object} props
 * @param {Array} props.tasks - List of tasks to display.
 * @param {Function} props.onEdit - Callback to edit a task.
 * @param {Function} props.onDelete - Callback to delete a task.
 * @param {Function} props.onToggleComplete - Callback to mark complete/incomplete.
 * @param {Function} props.onCategoryFilter - Set category filter.
 * @param {string} props.filterCategory - Current filter value.
 */
// PUBLIC_INTERFACE
export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
  onCategoryFilter,
  filterCategory
}) {
  // Collect unique categories
  const categories = ["All", ...Array.from(new Set(tasks.map((t) => t.category).filter(Boolean)))];

  return (
    <div style={{ margin: "2rem auto", width: "100%", maxWidth: 580 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <span style={{ fontWeight: 700, color: "var(--color-secondary)" }}>
          Tasks
        </span>
        <div>
          <select
            value={filterCategory || "All"}
            aria-label="Filter by category"
            style={{
              fontSize: 15,
              padding: "4px 10px",
              borderRadius: 4,
              border: "1px solid #ddd",
              background: "var(--color-bg-light)",
              marginRight: 10,
            }}
            onChange={(e) => onCategoryFilter(e.target.value)}
          >
            {categories.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {tasks.length === 0 ? (
          <div style={{ color: "#888", padding: 24, textAlign: "center", fontSize: 16 }}>
            No tasks found.
          </div>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              style={{
                background: task.complete
                  ? "var(--color-complete-bg)"
                  : "#fff",
                border: "1px solid #ececec",
                borderRadius: 7,
                padding: "0.7rem 0.9rem",
                display: "flex",
                alignItems: "center",
                marginBottom: 10,
                opacity: task.complete ? 0.65 : 1,
                boxShadow: "0 1px 6px rgba(30,37,43,.04)",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={task.complete}
                style={{ marginRight: 19, accentColor: "var(--color-accent)" }}
                onChange={() => onToggleComplete(task)}
                aria-label={`Mark ${task.title} ${task.complete ? "incomplete" : "complete"}`}
              />
              <div style={{ flex: 1, textAlign: "left" }}>
                <div
                  style={{
                    fontWeight: 600,
                    color: task.complete ? "#a0a0a0" : "#222",
                    fontSize: 17,
                    textDecoration: task.complete ? "line-through" : "none",
                  }}
                  aria-label={`Task title: ${task.title}`}
                >
                  {task.title}
                </div>
                {task.category && (
                  <div style={{ fontSize: 13, color: "var(--color-primary)" }}>
                    {task.category}
                  </div>
                )}
                {task.description && (
                  <div style={{ fontSize: 14, color: "#666", marginTop: 3 }}>
                    {task.description}
                  </div>
                )}
              </div>
              <button
                aria-label="Edit task"
                title="Edit"
                onClick={() => onEdit(task)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--color-primary)",
                  marginRight: 7,
                  fontSize: 17,
                  cursor: "pointer",
                }}
              >
                ✏️
              </button>
              <button
                aria-label="Delete task"
                title="Delete"
                onClick={() => onDelete(task)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#d32f2f",
                  fontSize: 19,
                  cursor: "pointer",
                  marginLeft: 1,
                }}
              >
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
