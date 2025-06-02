import React, { useEffect, useState } from "react";
import ModalFrame from "../modal-frame/ModalFrame";
import BookTable from "../book-component/BookTable"; // Asegúrate de importar correctamente
import {
  getAllBook,
  getAllExceptUserBooks,
} from "@/api/books/service/book.service";
import {
  getAllBooksUser,
  updateUserBooks,
} from "@/api/users/service/user.service";

export const AddBookModal = ({
  show,
  onClose,
  dialogMode,
  book,
  onAddBook,
}) => {
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      setLoading(true);
      getAllExceptUserBooks()
        .then((data) => setBooks(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      getAllBooksUser()
        .then((userData) => setUserBooks(userData.books || []))
        .catch(console.error);
    }
  }, [show]);

  const handleAddBook = async (book) => {
    try {
      // Verificar si el libro ya está en la lista
      if (userBooks.find((b) => b.id === book.id_book)) {
        alert("Este libro ya está en tu lista.");
        return;
      }

      // Crear nueva lista con el libro agregado
      const newBookIds = [...userBooks.map((b) => b.id), book.id_book];

      // Actualizar en backend
      const updatedUser = await updateUserBooks(newBookIds);

      // Actualizar estado local
      setUserBooks(updatedUser.books);
      onAddBook();

      alert(`Libro "${book.theme}" añadido a tu lista.`);
    } catch (error) {
      console.error("Error al añadir libro:", error);
      alert("No se pudo añadir el libro. Intenta de nuevo.");
    }
  };

  const body = (
    <div>
      <BookTable books={books} loading={loading} onAddBook={handleAddBook} />
    </div>
  );
  const onSave = () => {
    // Aquí puedes manejar el guardado de datos si lo necesitas
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
