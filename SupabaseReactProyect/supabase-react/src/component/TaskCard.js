import { useTasks } from "../context/TaskContext"

function TaskCard({ task }) {

    const { deleteTask, updateTask } = useTasks()

    const handleDelete = () => {
        deleteTask(task.id)
    }

    const handleToggleDone = () => {
        updateTask(task.id, { done: !task.done })
    }
    return (
        <div className="card card-body">
            <h1 className="h5">
                {`${task.id}. ${task.name} ${task.done ? "✅" : "❌"}`}
            </h1>
            <div className="ms-auto">
                <button className="btn btn-danger btn-sm me-1" onClick={() => handleDelete()}>
                    Borrar
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => handleToggleDone()}>
                    {`${task.done ? "Pendiente" : "Completado"}`}
                </button>
            </div>
        </div>
    )
}

export default TaskCard