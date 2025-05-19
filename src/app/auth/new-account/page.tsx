"use client";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import Link from "next/link";
import { useState } from "react";
import "./styles.css";

export default function NewAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-pink-100 px-4">
      <div className="glassmorphism-panel w-full p-8 rounded-3xl shadow-lg border border-pink-300">
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
              className="mb-2 text-pink-700 font-semibold"
            >
              Contraseña
            </label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              placeholder="Tu contraseña"
              toggleMask
              className="glassmorphism-input"
            />
          </div>

          <Button
            label="Crear Cuenta"
            className="p-button-rounded p-button-pink w-full"
            onClick={() => {
              // Aquí la lógica para crear cuenta
              alert("Cuenta creada con éxito!");
            }}
          />

          <div className="flex items-center my-6 text-pink-600 font-semibold">
            <div className="flex-1 border-t border-pink-300"></div>
            <div className="px-3">o</div>
            <div className="flex-1 border-t border-pink-300"></div>
          </div>

          <Link href="/main-frame">
            <Button
              type="submit"
              label="Ingresar"
              className="p-button-rounded p-button-pink w-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
