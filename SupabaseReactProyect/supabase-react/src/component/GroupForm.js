import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function GroupForm() {
    const [groupName, setGroupName] = useState("");
    const { createGroup, adding } = useTasks();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!groupName.trim()) {
            alert("Por favor, ingresa un nombre de grupo válido");
            return;
        }
        await createGroup(groupName);
        setGroupName("");
    }

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <input
                type="text"
                name="groupName"
                placeholder="Añade un grupo"
                onChange={(e) => setGroupName(e.target.value)}
                value={groupName}
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

export default GroupForm;
