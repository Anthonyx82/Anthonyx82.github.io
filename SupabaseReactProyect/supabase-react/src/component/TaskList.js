import { useTasks } from "../context/TaskContext"
import { useEffect } from "react"
import TaskCard from "./TaskCard"

function TaskList() {

    const { tasks, getTasks, loading } = useTasks()

    useEffect(() => {
        getTasks()
    }, [])

    function renderTasks() {
        if (loading) {
            return <p>Cargando...</p>
        } else if (tasks.length === 0) {
            return <p>No hay tareas</p>
        } else {
            return (
                <div>
                    {
                        tasks.map((task) => (
                            <TaskCard task={task} key={task.id} />
                        ))
                    }
                </div>
            )
        }
    }

    return (
        <div>
            {renderTasks()}
        </div>
    )
}

export default TaskList