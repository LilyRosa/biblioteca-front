import React, { useState } from "react";
import ModalFrame from "../modal-frame/ModalFrame";
import { InputText } from "primereact/inputtext";

export const GenreModal = ({ show, onClose, dialogMode, book }) => {
  const [genre, setGenre] = useState("");
  const body = (
    <div className="flex flex-row items-center gap-4">
      <label htmlFor="text" className="font-semibold text-pink-600/90">
        Nuevo Género
      </label>
      <InputText
        id="text"
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="glassmorphism-input"
        required
        style={{ flex: 1 }} // Opcional: para que el input ocupe el espacio restante
      />
    </div>
  );

  const onSave = () => {};

  return (
    <ModalFrame
      body={body}
      dialogMode={dialogMode}
      entity="Género"
      onClose={onClose}
      onSave={onSave}
      show={show}
    />
  );
};
