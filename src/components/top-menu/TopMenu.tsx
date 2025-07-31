"use client";

import React from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import {
  IoBookOutline,
  IoBulbOutline,
  IoHeartOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import "./styles.css";

import { usePathname } from "next/navigation";

export const TopMenu = () => {
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;

  return (
    <header className="glassmorphism-header shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <nav className="max-w-5xl mx-auto flex justify-end items-center p-4 space-x-6">
        <Link href="/main-frame" passHref>
          <Button
            icon={<IoBookOutline className="w-6 h-6" />}
            className={`p-button-rounded glassmorphism-btn ${
              isActive("/main-frame") ? "p-button-text-active" : "p-button-text"
            }`}
            aria-label="Agregar libro"
            tooltip="Libros"
            tooltipOptions={{ position: "bottom" }}
          />
        </Link>
        <Link href="/favorite" passHref>
          <Button
            icon={<IoHeartOutline className="w-6 h-6" />}
            className={`p-button-rounded glassmorphism-btn ${
              isActive("/favorite") ? "p-button-text-active" : "p-button-text"
            }`}
            aria-label="Favoritos"
            tooltip="Favoritos"
            tooltipOptions={{ position: "bottom" }}
          />
        </Link>
        <Link href="/suggestion" passHref>
          <Button
            icon={<IoBulbOutline className="w-6 h-6" />}
            className={`p-button-rounded glassmorphism-btn ${
              isActive("/suggestion") ? "p-button-text-active" : "p-button-text"
            }`}
            aria-label="Sugerencias"
            tooltip="Sugerencias"
            tooltipOptions={{ position: "bottom" }}
          />
        </Link>

        <Link href="/auth/login" passHref>
          <Button
            icon={<IoLogOutOutline className="w-6 h-6" />}
            className="p-button-rounded logout"
            aria-label="Cerrar Sesión"
            tooltip="Cerrar Sesión"
            tooltipOptions={{ position: "bottom" }}
          />
        </Link>
      </nav>
    </header>
  );
};
