import React, { useEffect, useState } from "react";
import ModalFrame from "../modal-frame/ModalFrame";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { getAllGenre } from "@/api/genres/service/genre.service";
import { GenreOutputDto } from "@/api/books/interface/output/book.output.dto";

export const BookModal = ({ show, onClose, dialogMode, book, onSave }) => {
  const [genre, setGenre] = useState("");
  const [theme, setTheme] = useState("");
  const [author, setAuthor] = useState("");
  const [resume, setResume] = useState("");
  const [poster, setPoster] = useState("");
  const [bookPdf, setBookPdf] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dialogMode === "edit" && book) {
      setTheme(book.theme || "");
      setAuthor(book.author || "");
      setResume(book.resume || "");
      setPoster(book.poster || "");
      setBookPdf(book.bookPdf || "");
      setGenre(book.genre.id_genre || "");
    } else {
    }
  }, [dialogMode, genre, show]);

  const [genres, setGenres] = useState<GenreOutputDto[]>([]);

  useEffect(() => {
    getAllGenre().then((x) => {
      setGenres(x);
      if (book) setGenre(book.genre.id_genre);
    });
  }, [book]);

  const body = (
    <div className="flex flex-col gap-y-4">
      {[
        { label: "Título", value: theme, setter: setTheme },
        { label: "Autor", value: author, setter: setAuthor },
        { label: "Sinopsis", value: resume, setter: setResume },
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

      <div className="flex items-center gap-4">
        <label htmlFor="genero" className="font-semibold text-pink-600/90 w-24">
          Género
        </label>
        <Dropdown
          value={genre}
          options={genres || []}
          optionLabel="genre"
          optionValue="id_genre"
          onChange={(e) => {
            setGenre(e.value);
          }}
          placeholder="Selecciona un género"
          className="glassmorphism-input"
          style={{ flex: 1 }}
          required
        />
      </div>
    </div>
  );

  useEffect(() => {
    if (book) {
      setGenre(book.genre?.id || "");
      setTheme(book.theme || "");
      setAuthor(book.author || "");
      setResume(book.resume || "");
      setPoster(book.poster || "");
      setBookPdf(book.bookPdf || "");
    } else {
      setGenre("");
      setTheme("");
      setAuthor("");
      setResume("");
      setPoster("");
      setBookPdf("");
    }
  }, [book, show]);

  const handleSave = () => {
    const bookData = {
      genre: Number(genre),
      theme,
      author,
      resume,
      poster,
      bookPdf,
      id: book?.id_book,
    };
    onSave(bookData);
  };

  return (
    <ModalFrame
      body={body}
      dialogMode={dialogMode}
      entity="Libro"
      onClose={onClose}
      onSave={handleSave}
      show={show}
    />
  );
};
