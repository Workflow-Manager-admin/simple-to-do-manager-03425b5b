import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";
import "./theme.css";
import Header from "./components/Header";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";

// PUBLIC_INTERFACE
function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditTask, setModalEditTask] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [theme] = useState("light"); // Only light

  // Set theme for minimal mode (light only).
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Auth Session check
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // Fetch tasks for current user.
  const fetchTasks = useCallback(async () => {
    if (!user) return;
    setFetching(true);
    let query = supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (filterCategory && filterCategory !== "All") {
      query = query.eq("category", filterCategory);
    }
    const { data, error } = await query;
    if (!error) setTasks(data || []);
    setFetching(false);
  }, [user, filterCategory]);

  useEffect(() => {
    if (user) fetchTasks();
    else setTasks([]);
  }, [user, fetchTasks, filterCategory]);

  // CRUD handlers
  const handleAddTask = useCallback(
    async (task) => {
      setLoading(true);
      const { error } = await supabase.from("tasks").insert([
        {
          ...task,
          complete: false,
          user_id: user.id,
        },
      ]);
      setLoading(false);
      setModalOpen(false);
      if (!error) fetchTasks();
    },
    [user, fetchTasks]
  );

  const handleEditTask = useCallback(
    async (updated) => {
      setLoading(true);
      const { error } = await supabase
        .from("tasks")
        .update({
          title: updated.title,
          category: updated.category,
          description: updated.description,
        })
        .eq("id", modalEditTask.id)
        .eq("user_id", user.id);
      setLoading(false);
      setModalEditTask(null);
      if (!error) fetchTasks();
    },
    [user, modalEditTask, fetchTasks]
  );

  const handleDeleteTask = useCallback(
    async (task) => {
      setLoading(true);
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", task.id)
        .eq("user_id", user.id);
      setLoading(false);
      if (!error) fetchTasks();
    },
    [user, fetchTasks]
  );

  const handleToggleComplete = useCallback(
    async (task) => {
      setLoading(true);
      const { error } = await supabase
        .from("tasks")
        .update({ complete: !task.complete })
        .eq("id", task.id)
        .eq("user_id", user.id);
      setLoading(false);
      if (!error) fetchTasks();
    },
    [user, fetchTasks]
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={fetchTasks} />;
  }

  return (
    <div
      className="App"
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
        minHeight: "100vh",
      }}
    >
      <Header onLogout={handleLogout} user={user} />
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "2.5rem 1rem 1.5rem 1rem" }}>
        <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              background: "var(--color-accent)",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              padding: "10px 20px",
              fontWeight: 600,
              fontSize: 15,
              letterSpacing: 0.5,
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(255, 171, 0, 0.07)",
              transition: "background 0.12s",
            }}
            onClick={() => {
              setModalEditTask(null);
              setModalOpen(true);
            }}
          >
            + New Task
          </button>
        </div>
        <TaskList
          tasks={tasks}
          onEdit={(task) => {
            setModalEditTask(task);
            setModalOpen(true);
          }}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          onCategoryFilter={setFilterCategory}
          filterCategory={filterCategory}
        />
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setModalEditTask(null);
          }}
        >
          <TaskForm
            onSubmit={modalEditTask ? handleEditTask : handleAddTask}
            onCancel={() => {
              setModalOpen(false);
              setModalEditTask(null);
            }}
            initial={modalEditTask}
          />
          {loading && (
            <div
              style={{
                color: "var(--color-secondary)",
                textAlign: "center",
                fontSize: 13,
                marginTop: 8,
              }}
            >
              Please wait...
            </div>
          )}
        </Modal>
      </main>
      <footer style={{ textAlign: "center", color: "#aaa", fontSize: 12, margin: "2rem 0 1rem 0" }}>
        © {new Date().getFullYear()} Minimal To-Do
      </footer>
    </div>
  );
}

export default App;
