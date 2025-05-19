import React, { useState } from "react";
import ModalFrame from "../modal-frame/ModalFrame";
import { InputText } from "primereact/inputtext";

export const BookModalDetails = ({ show, onClose, book }) => {
  const [genre, setGenre] = useState("");
  const [theme, setTheme] = useState("");
  const [author, setAuthor] = useState("");
  const [resume, setResume] = useState("");

  const body = (
    <div className="flex flex-col gap-y-4">
      {[
        { label: "Título", value: theme, setter: setTheme },
        { label: "Autor", value: author, setter: setAuthor },
        { label: "Género", value: genre, setter: setGenre },
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
      <label htmlFor="" className="font-semibold text-pink-600/90 w-24">
        Sinopsis
      </label>
      <InputText
        type="text"
        className="glassmorphism-input"
        required
        style={{ flex: 1 }}
      />
    </div>
  );

  const onSave = () => {
    // Aquí puedes manejar el guardado de datos
  };

  return (
    <ModalFrame
      dialogMode="view"
      body={body}
      entity="Libro"
      onClose={onClose}
      onSave={onSave}
      show={show}
    />
  );
};
