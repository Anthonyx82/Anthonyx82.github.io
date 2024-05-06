import { Link } from "react-router-dom"
import { supabase } from "../supabase/client"

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
            <div class="container">
                <Link class="navbar-brand" to="/">Supabase React</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#!" onClick={async () => await supabase.auth.signOut()}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Navbar