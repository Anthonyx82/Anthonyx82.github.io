import { useState } from "react";
import { supabase } from "../supabase/client";


function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      });
      if (error) throw error;
      setMessage("Email enviado correctament. Revisa tu bandeja de entrada");
      setError(null);
    } catch (error) {
      setMessage(null);
      setError("Error al enviar el email: " + error.message);
    }
  };

  return (
    <div className="row pt-4">
      <div class="h3 m-3 p-2">Introduce tu email para inciar sesion o registrarte</div>
      <div className="col-md-4 offset-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <input
            type="email"
            name="email"
            placeholder="tuemail@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-2"
            required
          />
          <button className="btn btn-primary">Send</button>
        </form>
        {message && <div className="alert alert-success mt-2">{message}</div>}
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
