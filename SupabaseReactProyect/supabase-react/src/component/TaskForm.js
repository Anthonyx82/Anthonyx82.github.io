import { useState } from "react";
import { supabase } from "../supabase/client";

function TaskForm() {
    const [taskName, setTaskName] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const user = supabase.auth.getUser()
            const result = await supabase.from("tasks").insert({
                name: taskName,
                userid: (await user).data.user.id,
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="taskName"
                    placeholder="añade una tarea"
                    onChange={(e) => setTaskName(e.target.value)} />
                <button>
                    Guardar
                </button>
            </form>
        </div>
    )
}

export default TaskForm