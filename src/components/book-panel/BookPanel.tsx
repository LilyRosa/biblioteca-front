"use client";

import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import "./styles.css";
import { BookComponent } from "../book-component/BookComponent";
import { BookModal } from "./BookModal";
import { BookModalDetails } from "../book-panel-admin/BookModalDetails";
import { DeletePopup } from "../delete-popup-book/DeletePopup";

export const BookPanel = () => {
  const [titleFilter, setTitleFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [popup, setPopup] = useState(false);
  const [popupTarget, setPopupTarget] = useState(null);

  const toast = useRef(null);

  const showPopup = (event, book) => {
    setPopup(true);
    setPopupTarget(event.currentTarget); // Guarda el botón que disparó el popup
    setSelectedBook(book);
  };

  const handleAcceptDelete = () => {
    // Aquí la lógica para eliminar el libro seleccionado
    setPopup(false);
  };

  const handleRejectDelete = () => {
    setPopup(false);
  };

  const showDetails = (book) => {
    setShowModalDetails(true);
    setSelectedBook(book);
  };

  const showEdit = (book) => {
    setShowModal(true);
    setSelectedBook(book);
  };

  return (
    <>
      <section className="glassmorphism-panel p-6 rounded-3xl shadow-lg max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <InputText
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            placeholder="Filtrar por título"
            className="glassmorphism-input flex-1"
          />
          <InputText
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            placeholder="Filtrar por autor"
            className="glassmorphism-input flex-1"
          />
          <InputText
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            placeholder="Filtrar por género"
            className="glassmorphism-input flex-1"
          />
        </div>
        <div className="glassmorphism-content border border-pink-300 rounded-xl p-6 text-center text-pink-600 font-semibold shadow-sm">
          <BookComponent
            onDelete={showPopup}
            onDetails={showDetails}
            onFavorite={() => {}}
            onEdit={showEdit}
          />
        </div>

        <BookModal
          dialogMode={"edit"}
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
