import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm() {
    const [taskName, setTaskName] = useState("")
    const { createTask, adding } = useTasks()

    const handleSubmit = async (e) => {
        e.preventDefault()
        createTask(taskName)
    }

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <input type="text"
                name="taskName"
                placeholder="añade una tarea"
                onChange={(e) => setTaskName(e.target.value)} 
                value={taskName}
                className="form-control mb-2"/>
            <div className="ms-auto">
                <button disabled={adding} className="btn btn-primary btn-sm">
                    {adding ? "Guardando..." : "Guardar"}
                </button>
            </div>
        </form>
    )
}

export default TaskForm