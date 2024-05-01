import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'

import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { TaskContextProvider } from "./context/TaskContext";

import { supabase } from "./supabase/client";

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login")
      } else if (session) {
        navigate("/")
      }
    })
  }, []
  )

  return (
    <div className="App">
      <TaskContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskContextProvider>
    </div>
  );
}

export default App;
