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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="taskName"
                    placeholder="añade una tarea"
                    onChange={(e) => setTaskName(e.target.value)} />
                <button disabled={adding}>
                    {adding ? "Guardando..." : "Guardar"}
                </button>
            </form>
        </div>
    )
}

export default TaskForm