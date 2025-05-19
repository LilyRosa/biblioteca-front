import React from "react";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button } from "primereact/button";
import "./styles.css";

interface Props {
  page: string;
}

export const NavBack = ({ page }: Props) => {
  return (
    <header className="glassmorphism-header shadow-lg">
      <nav className="max-w-5xl mx-auto flex justify-start items-center p-4 space-x-6">
        <Link href={page} passHref>
          <Button
            icon={<IoArrowBackOutline className="w-6 h-6 text-pink-600" />}
            className="glassmorphism-btn p-button-text p-button-rounded"
            aria-label="Volver"
          />
        </Link>
      </nav>
    </header>
  );
};
