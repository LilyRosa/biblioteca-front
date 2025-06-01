import React from "react";
import ModalFrame from "../modal-frame/ModalFrame";

export const BookModalDetails = ({ show, onClose, book }) => {
  // book debe tener las propiedades: title, author, genre, resume

  const body = (
    <div className="flex flex-col gap-y-4">
      {/* Título */}
      <div className="flex items-center gap-4">
        <label className="font-semibold text-pink-600/90 w-24">Título</label>
        <label
          className="glassmorphism-input bg-gray-100 text-gray-700 p-2 rounded"
          style={{ flex: 1 }}
        >
          {book?.theme || ""}
        </label>
      </div>
      {/* Autor */}
      <div className="flex items-center gap-4">
        <label className="font-semibold text-pink-600/90 w-24">Autor</label>
        <label
          className="glassmorphism-input bg-gray-100 text-gray-700 p-2 rounded"
          style={{ flex: 1 }}
        >
          {book?.author || ""}
        </label>
      </div>
      {/* Género */}
      <div className="flex items-center gap-4">
        <label className="font-semibold text-pink-600/90 w-24">Género</label>
        <label
          className="glassmorphism-input bg-gray-100 text-gray-700 p-2 rounded"
          style={{ flex: 1 }}
        >
          {book?.genre.genre || ""}
        </label>
      </div>
      {/* Sinopsis */}
      <div className="flex items-start gap-4">
        <label className="font-semibold text-pink-600/90 w-24">Sinopsis</label>
        <textarea
          className="glassmorphism-input bg-gray-100 text-gray-700 p-2 rounded resize-none"
          style={{ flex: 1 }}
          value={book?.resume || ""}
          readOnly
          rows={4}
        />
      </div>
    </div>
  );

  return (
    <ModalFrame
      dialogMode="view"
      body={body}
      entity="Libro"
      onClose={onClose}
      show={show}
      onSave={onClose}
    />
  );
};
