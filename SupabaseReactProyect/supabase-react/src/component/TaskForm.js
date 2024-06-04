import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm() {
    const [taskName, setTaskName] = useState("");
    const [image, setImage] = useState(null);
    const [taskGroup, setTaskGroup] = useState("");
    const [groups, setGroups] = useState([]);

    const { getGroups, createTask, adding } = useTasks();

    useEffect(() => {
        const fetchGroups = async () => {
            const fetchedGroups = await getGroups();
            setGroups(fetchedGroups);
        };

        const timeoutId = setTimeout(fetchGroups, 7000);

        return () => clearTimeout(timeoutId);
    }, [getGroups]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskGroup) {
            alert("Por favor, selecciona un grupo válido");
            return;
        }
        await createTask(taskName, image, taskGroup);
        setTaskName("");
        setImage(null);
        setTaskGroup("");
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
            <select
                id="taskGroup"
                name="taskGroup"
                value={taskGroup}
                onChange={(e) => setTaskGroup(e.target.value)}
                className="form-control mb-2"
            >
                <option value="">Selecciona un grupo</option>
                {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                        {group.name}
                    </option>
                ))}
            </select>
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
