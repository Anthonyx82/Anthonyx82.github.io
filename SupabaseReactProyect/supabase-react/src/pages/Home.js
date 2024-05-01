import { supabase } from "../supabase/client"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import TaskForm from "../component/TaskForm"
import { useTasks } from "../context/TaskContext"
import TaskList from "../component/TaskList"


function Home() {

    const navigate = useNavigate()
    const {tasks} = useTasks()

    useEffect(() => {
        if (!supabase.auth.getUser()) {
            navigate("/login")
        }
    }, [navigate])

    return (
        <div>
            Home

            <button onClick={() => supabase.auth.signOut()}>Logout</button>

            <TaskForm />
            <TaskList />
        </div>
    )
}

export default Home