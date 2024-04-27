import { supabase } from "../supabase/client"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


function Home() {

    const navigate = useNavigate()

    useEffect(() => {
        if (!supabase.auth.getUser()) {
            navigate("/login")
        }
    }, [navigate])

    return (
        <div>
            Home

            <button onClick={() => supabase.auth.signOut()}>
                Logout
            </button>
        </div>
    )
}

export default Home