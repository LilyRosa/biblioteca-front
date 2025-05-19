import React from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { IoBookOutline, IoBulbOutline, IoHeartOutline } from "react-icons/io5";
import "./styles.css";

export const TopMenu = () => {
  return (
    <header className="glassmorphism-header shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <nav className="max-w-5xl mx-auto flex justify-end items-center p-4 space-x-6">
        <Link href="/favorite" passHref>
          <Button
            icon={<IoHeartOutline className="w-6 h-6" />}
            className="p-button-rounded p-button-text glassmorphism-btn"
            aria-label="Favoritos"
          />
        </Link>
        <Link href="/suggestion" passHref>
          <Button
            icon={<IoBulbOutline className="w-6 h-6" />}
            className="p-button-rounded p-button-text glassmorphism-btn"
            aria-label="Sugerencias"
          />
        </Link>
        <Link href="/main-frame" passHref>
          <Button
            icon={<IoBookOutline className="w-6 h-6" />}
            className="p-button-rounded p-button-text glassmorphism-btn"
            aria-label="Agregar libro"
          />
        </Link>
      </nav>
    </header>
  );
};
