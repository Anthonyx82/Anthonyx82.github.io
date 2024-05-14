import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm() {
    const [taskName, setTaskName] = useState("");
    const [image, setImage] = useState(null);
    const { createTask, adding } = useTasks();

    const handleSubmit = async (e) => {
        e.preventDefault();
        createTask(taskName, image);
        setTaskName("");
        setImage(null);
    }

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <input
                type="text"
                name="taskName"
                placeholder="Añade una tarea"
                onChange={(e) => setTaskName(e.target.value)}
                value={taskName}
                className="form-control mb-2"
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="form-control mb-2"
            />
            <div className="ms-auto">
                <button disabled={adding} className="btn btn-primary btn-sm">
                    {adding ? "Guardando..." : "Guardar"}
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
