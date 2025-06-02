"use client";

import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import "./styles.css";
import { BookComponent } from "../book-component/BookComponent";
import { BookModal } from "./BookModal";
import { BookModalDetails } from "../book-panel-admin/BookModalDetails";
import { DeletePopup } from "../delete-popup-book/DeletePopup";
import {
  getAllBooksUser,
  toggleFavoriteBook,
  updateUserBooks,
} from "@/api/users/service/user.service";
import { Button } from "primereact/button";
import { AddBookModal } from "./AddBookModal";

export const BookPanel = () => {
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [popup, setPopup] = useState(false);
  const [popupTarget, setPopupTarget] = useState(null);
  const [books, setBooks] = useState([]);
  const [typeModal, setTypeModal] = useState("create");

  useEffect(() => {
    getAllBooksUser()
      .then((data) => {
        setBooks(data.books || []);
      })
      .catch((error) => console.error("Error al cargar libros:", error));
  }, []);

  const toast = useRef(null);

  const showPopup = (event, book) => {
    setPopup(true);
    setPopupTarget(event.currentTarget); // Guarda el botón que disparó el popup
    setSelectedBook(book);
  };

  const refresh = async () => {
    await getAllBooksUser()
      .then((data) => {
        setBooks(data.books || []);
      })
      .catch((error) => console.error("Error al cargar libros:", error));
  };

  const handleAcceptDelete = async () => {
    const newBookIds = books
      .map((x) => x.id)
      .filter((x) => x !== selectedBook.id);
    await updateUserBooks(newBookIds);
    setPopup(false);
    await refresh();
  };

  const handleRejectDelete = () => {
    setPopup(false);
  };

  const handleFavoriteToggle = async (book) => {
    try {
      const newFavorite = !book.favorite;
      await toggleFavoriteBook(book.id, newFavorite);
      // Actualizar estado local para reflejar el cambio
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === book.id ? { ...b, favorite: newFavorite } : b
        )
      );
      // Opcional: mostrar toast o mensaje de éxito
    } catch (error) {
      console.error("Error al actualizar favorito:", error);
      // Opcional: mostrar mensaje de error
    }
  };

  const showCreate = () => {
    setShowModal(true);
    setTypeModal("create");
    setSelectedBook(null);
  };

  const showDetails = (book) => {
    setShowModalDetails(true);
    setSelectedBook(book);
  };

  const showEdit = (book) => {
    setShowModal(true);
    setSelectedBook(book);
  };

  const handleAddBook = async () => {
    await refresh();
  };

  return (
    <>
      <section className="glassmorphism-panel p-6 rounded-3xl shadow-lg max-w-5xl mx-auto">
        <div className="flex align-items-center">
          <div className="flex gap-4 align-items-center ml-auto">
            <Button
              type="button"
              label="Agregar Libro"
              outlined
              onClick={() => showCreate()}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {books
            .filter((book) =>
              book.theme.toLowerCase().includes(titleFilter.toLowerCase())
            )
            .filter((book) =>
              book.author.toLowerCase().includes(authorFilter.toLowerCase())
            )
            .filter((book) =>
              book.genre.genre.toLowerCase().includes(genreFilter.toLowerCase())
            )
            .map((book) => (
              <BookComponent
                key={book.id}
                book={book}
                onDelete={(e) => showPopup(e, book)}
                onDetails={() => showDetails(book)}
                onFavorite={() => handleFavoriteToggle(book)}
                onEdit={() => showEdit(book)}
              />
            ))}
        </div>

        <AddBookModal
          onAddBook={handleAddBook}
          dialogMode={"view"}
          onClose={() => setShowModal(false)}
          show={showModal}
          book={selectedBook}
        />

        <BookModalDetails
          onClose={() => setShowModalDetails(false)}
          show={showModalDetails}
          book={selectedBook}
        />

        <DeletePopup
          visible={popup}
          target={popupTarget}
          onHide={() => setPopup(false)}
          onAccept={handleAcceptDelete}
          onReject={handleRejectDelete}
          toastRef={toast}
        />
      </section>
    </>
  );
};
