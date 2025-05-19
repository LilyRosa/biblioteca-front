import React, { useState } from "react";
import ModalFrame from "../modal-frame/ModalFrame";
import { InputText } from "primereact/inputtext";

export const BookModal = ({ show, onClose, dialogMode, book }) => {
  const [genre, setGenre] = useState("");
  const [theme, setTheme] = useState("");
  const [author, setAuthor] = useState("");
  const [resume, setResume] = useState("");
  const [poster, setPoster] = useState("");
  const [bookPdf, setBookPdf] = useState("");

  const body = (
    <div className="flex flex-col gap-y-4">
      {[
        { label: "Título", value: theme, setter: setTheme },
        { label: "Autor", value: author, setter: setAuthor },
        { label: "Sinopsis", value: resume, setter: setResume },
        { label: "Género", value: genre, setter: setGenre },
        { label: "Portada", value: poster, setter: setPoster },
        { label: "Libro", value: bookPdf, setter: setBookPdf },
      ].map(({ label, value, setter }) => (
        <div key={label} className="flex items-center gap-4">
          <label
            htmlFor={label.toLowerCase()}
            className="font-semibold text-pink-600/90 w-24"
          >
            {label}
          </label>
          <InputText
            id={label.toLowerCase()}
            type="text"
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="glassmorphism-input"
            required
            style={{ flex: 1 }}
          />
        </div>
      ))}
    </div>
  );

  const onSave = () => {
    // Aquí puedes manejar el guardado de datos
  };

  return (
    <ModalFrame
      body={body}
      dialogMode={dialogMode}
      entity="Libro"
      onClose={onClose}
      onSave={onSave}
      show={show}
    />
  );
};
