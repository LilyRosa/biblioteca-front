import React from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import {
  IoBookOutline,
  IoLogOutOutline,
  IoPricetagOutline,
} from "react-icons/io5";
import "./styles.css";
import { usePathname } from "next/navigation";

export const TopMenu = () => {
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;

  return (
    <header className="glassmorphism-header shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <nav className="max-w-5xl mx-auto flex justify-end items-center p-4 space-x-6">
        <Link href="/admin/main-frame" passHref>
          <Button
            icon={<IoBookOutline className="w-6 h-6" />}
            className={`p-button-rounded glassmorphism-btn ${
              isActive("/admin/main-frame")
                ? "p-button-text-active"
                : "p-button-text"
            }`}
            aria-label="Agregar libro"
            tooltip="Libros"
            tooltipOptions={{ position: "bottom" }}
          />
        </Link>
        <Link href="/admin/add-genre" passHref>
          <Button
            icon={<IoPricetagOutline className="w-6 h-6" />}
            className={`p-button-rounded glassmorphism-btn ${
              isActive("/admin/add-genre")
                ? "p-button-text-active"
                : "p-button-text"
            }`}
            aria-label="Agregar género"
            tooltip="Géneros"
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
