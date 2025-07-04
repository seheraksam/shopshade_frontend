'use client';

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from 'next/navigation';
import api from 'axios';
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  console.log("Submit triggered", { email, password }); // Veriler doğru mu?
  
  try {
    console.log("Sending request...");
    const res = await api.post("http://localhost:8080/api/login", {
      email,
      password,
    });
    console.log("sdlmskdmsd");
    console.log("Response received:", res);
    if (res.status === 200) {
      console.log("Login successful");
      toast.success("Giriş başarılı");
      router.push("/");
    } else {
      setError("Giriş başarısız. Lütfen tekrar deneyin.");
    }
  } catch (err) {
    console.error("Full error object:", err);
  }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="mb-4 text-center">Login</h3>
        {error && (
          <div className="alert alert-danger text-center py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Şifre</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
