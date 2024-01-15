import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Login() {
  const [benutzer, setBenutzer] = useState(null);
  const [passwort, setPasswort] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const login = async () => {
    try {
      await axios.post("http://localhost:3000/api/login", {
        benutzer,
        passwort,
      });
      router.push("/backend");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="card shadow-lg mx-auto mt-5 p-4" style={{ maxWidth: 500 }}>
      {error && <p className="text-danger">Login fehlgeschlagen</p>}
      <h1>Login</h1>
      <Form className="d-flex flex-column mt-4">
        <Form.Group className="mb-3" controlId="benutzer">
          <Form.Control
            type="text"
            placeholder="Benutzer"
            onChange={(e) => setBenutzer(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPasswort(e.target.value)}
          />
        </Form.Group>
        <Button className="shadow-sm" variant="primary" onClick={login}>
          Login
        </Button>
      </Form>
    </div>
  );
}
