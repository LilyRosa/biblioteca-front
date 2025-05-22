"use client";

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Link from "next/link";
import "./styles.css";
import { login } from "@/api/auth/service/auth.service";
import { decodeJWT, setToken } from "@/api/common/utils/jwt";

export default function Login() {
  const [user, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function doLogin() {
    try {
      const data = await login({ username: user, password: password });
      console.log(data);
      console.log(decodeJWT(data.accessToken));
      setToken(data.accessToken);
      window.location.href = "/main-frame";
    } catch (error) {
      window.alert(error);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-pink-100 px-4">
      <div className="glassmorphism-panel max-w-md w-full p-10 rounded-3xl border border-white/30 shadow-lg backdrop-blur-md">
        <h1 className="text-4xl mb-8 text-pink-600 font-bold text-center">
          Ingresar
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
          <div className="flex flex-col">
            <label htmlFor="user" className="mb-2 font-semibold text-pink-700">
              Usuario
            </label>
            <InputText
              id="user"
              type="text"
              value={user}
              onChange={(e) => setEmail(e.target.value)}
              className="glassmorphism-input"
              placeholder="Ingresa tu usuario"
              required
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
            type="submit"
            label="Ingresar"
            className="p-button-rounded p-button-pink w-full"
          />
        </form>
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-pink-600"></div>
          <div className="px-4 text-pink-600 font-semibold">o</div>
          <div className="flex-1 border-t border-pink-600"></div>
        </div>
        <Link href="/auth/new-account">
          <Button
            type="submit"
            label="Crear Cuenta"
            className="p-button-rounded p-button-pink w-full"
          />
        </Link>
      </div>
    </div>
  );
}
