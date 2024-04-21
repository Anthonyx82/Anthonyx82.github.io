import { useState } from "react";
import { supabase } from "../supabase/client";

function Login() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await supabase.auth.signInWithOtp({
        email: email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="tuemail@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>send</button>
      </form>
    </div>
  );
}

export default Login;
