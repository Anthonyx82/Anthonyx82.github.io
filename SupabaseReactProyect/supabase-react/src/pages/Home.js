import { supabase } from "../supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../component/TaskForm";
import GroupForm from "../component/GroupForm"; // Importa el componente GroupForm
import { useTasks } from "../context/TaskContext";
import TaskList from "../component/TaskList";

function Home() {
  const [showTaskDone, setShowTaskDone] = useState(false);
  const navigate = useNavigate();
  const { tasks } = useTasks();

  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="row pt-4">
      <div className="col-md-4">
        {/* Muestra el formulario de grupos */}
        <GroupForm />
      </div>
      <div className="col-md-4 offset-md-4">
        {/* Muestra el formulario de tareas */}
        <TaskForm />

        <header className="d-flex justify-content-between my-3">
          <span className="h5">
            {showTaskDone ? "Tareas completadas" : "Tareas pendientes"}
          </span>
          <button
            className="btn btn-dark btn-sm"
            onClick={() => setShowTaskDone(!showTaskDone)}
          >
            {showTaskDone ? "Tareas pendientes" : "Tareas completadas"}
          </button>
        </header>

        <TaskList done={showTaskDone} />
      </div>
    </div>
  );
}

export default Home;
