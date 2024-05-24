import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

function TaskListByGroup({done, group, onClose }) {
    const { tasks, getTasks, loading } = useTasks();

    useEffect(() => {
        console.log(group.id)
        getTasksByGroup(done, group.id);
    }, [done, group]);

    function getTasksByGroup(done, groupId) {
        getTasks(done, groupId);
    }

    return (
        <div>
            <button className="btn btn-dark btn-sm" onClick={onClose}>Volver a la lista de grupos</button>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaskListByGroup;
