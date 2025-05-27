// src/components/genre-panel/GenreModal.tsx
import React, { useState, useEffect } from "react";
import ModalFrame from "../modal-frame/ModalFrame";
import { InputText } from "primereact/inputtext";
import { addGenre, updateGenre } from "@/api/genres/service/genre.service";
import { updateBook } from "@/api/books/service/book.service";
import UpdateGenreInputDto from "../../api/genres/interface/input/update-genre.input.dto";

export const GenreModal = ({
  show,
  onClose,
  dialogMode,
  genre,
  onGenreSaved,
}) => {
  const [localGenre, setLocalGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dialogMode === "edit" && genre) {
      setLocalGenre(genre.genre || "");
    } else {
      setLocalGenre("");
    }
  }, [dialogMode, genre, show]);

  const onSave = async () => {
    if (!localGenre.trim()) {
      setError("El nombre del género es obligatorio.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (dialogMode === "edit") {
        await updateGenre({ genre: localGenre }, genre.id_genre);
      } else {
        await addGenre({ genre: localGenre.trim() });
      }
      setLoading(false);
      onClose();
      onGenreSaved(); // Llama a la función para recargar los géneros
    } catch (err: any) {
      setLoading(false);
      setError(
        err?.response?.data?.message ||
          "Error al guardar el género. Intenta de nuevo."
      );
    }
  };

  return (
    <ModalFrame
      body={
        <>
          <div className="flex flex-row items-center gap-4">
            <label htmlFor="text" className="font-semibold text-pink-600/90">
              Nuevo Género
            </label>
            <InputText
              id="text"
              type="text"
              value={localGenre}
              onChange={(e) => setLocalGenre(e.target.value)}
              className="glassmorphism-input"
              required
              style={{ flex: 1 }}
            />
          </div>
          {error && (
            <div className="text-red-600 mt-2 font-semibold text-center">
              {error}
            </div>
          )}
        </>
      }
      dialogMode={dialogMode}
      entity="Género"
      onClose={onClose}
      onSave={onSave}
      show={show}
    />
  );
};
