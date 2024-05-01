import { useTasks } from "../context/TaskContext"
import { useEffect } from "react"

function TaskList() {

    const { tasks, getTasks } = useTasks()

    useEffect(() => {
        getTasks()
    }, [])
    return (
        <div>
            {
                tasks.map(task =>(
                    <div key={task.id}>
                        <h1>{task.name}</h1>
                        <p>{JSON.stringify(task.done)}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default TaskList