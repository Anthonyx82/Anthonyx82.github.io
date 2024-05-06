import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";

export const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) throw new Error('UseTasks must be used within a TaskContextProvider')
    return context
}

export const TaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false)

    const getTasks = async (done = false) => {
        setLoading(true)
        const user = supabase.auth.getUser()
        const { error, data } = await supabase
            .from("tasks")
            .select()
            .eq("userid", (await user).data.user.id)
            .eq("done", done)
            .order("id", { ascending: true });

        if (error) throw error

        setTasks(data)
        setLoading(false)
    }

    const createTask = async (taskName) => {
        setAdding(true)
        try {
            const user = supabase.auth.getUser();
            const { error, data } = await supabase.from("tasks").insert({
                name: taskName,
                userid: (await user).data.user.id,
            }).select()

            if (error) throw error;

            setTasks([...tasks, ...data])

        } catch (error) {
            console.log(error)
        } finally {
            setAdding(false)
        }

    }

    const deleteTask = async (id) => {
        const user = supabase.auth.getUser()

        const { data, error } = await supabase.from("tasks")
            .delete()
            .eq("userid", (await user).data.user.id)
            .eq("id", id)
            .select()

        if (error) throw error

        setTasks(
            tasks.filter(task => task.id != id)
        )

    }

    const updateTask = async (id, updateFields) => {
        const user = supabase.auth.getUser()

        const { error, data } = await supabase
            .from("tasks")
            .update(updateFields)
            .eq("userid", (await user).data.user.id)
            .eq("id", id)
            .select()

        if (error) throw error

        setTasks(
            tasks.filter(task => task.id != id)
        )
    }

    return <TaskContext.Provider value={{ tasks, getTasks, createTask, adding, loading, deleteTask, updateTask }}>
        {children}
    </TaskContext.Provider>
}
