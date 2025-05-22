"use client";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Link from "next/link";
import { useState } from "react";
import "./styles.css";
import { register } from "@/api/auth/service/auth.service";

export default function NewAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await register({
        username,
        email,
        password,
      });
      setSuccess("¡Cuenta creada con éxito!");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Error al crear la cuenta. Intenta de nuevo."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-pink-100 px-4">
      <div className="glassmorphism-panel max-w-md w-full p-10 rounded-3xl border border-white/30 shadow-lg backdrop-blur-md">
        <h1 className="text-4xl mb-8 text-pink-600 font-bold text-center">
          Nueva Cuenta
        </h1>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-2 text-pink-700 font-semibold"
            >
              Usuario
            </label>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tu usuario"
              className="glassmorphism-input"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-pink-700 font-semibold">
              Correo electrónico
            </label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              className="glassmorphism-input"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 font-semibold text-pink-700"
            >
              Contraseña
            </label>
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glassmorphism-input"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <Button
            label={loading ? "Creando..." : "Crear Cuenta"}
            className="p-button-rounded p-button-pink w-full"
            onClick={handleRegister}
            disabled={loading}
          />

          {error && (
            <div className="text-red-600 text-center font-semibold">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 text-center font-semibold">
              {success}
            </div>
          )}

          <div className="flex items-center my-6 text-pink-600 font-semibold">
            <div className="flex-1 border-t border-pink-300"></div>
            <div className="px-3">o</div>
            <div className="flex-1 border-t border-pink-300"></div>
          </div>

          <Link href="/main-frame">
            <Button
              type="button"
              label="Ingresar"
              className="p-button-rounded p-button-pink w-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
