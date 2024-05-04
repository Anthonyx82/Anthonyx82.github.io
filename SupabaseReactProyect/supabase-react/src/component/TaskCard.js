import { useTasks } from "../context/TaskContext"

function TaskCard({ task }) {

    const {deleteTask} = useTasks()

    const handleDelete = () => {
        deleteTask(task.id)
    }

    const handleToggleDone = () => {
        alert('Completando')
    }
    return (
        <div>
            <h1>{task.name}</h1>
            <p>{JSON.stringify(task.done)}</p>
            <div>
                <button onClick={() => handleDelete()}>
                    Borrar
                </button>
                <button onClick={() => handleToggleDone()}>
                    Completado
                </button>
            </div>
        </div>
    )
}

export default TaskCard