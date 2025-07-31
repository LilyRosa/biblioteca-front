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
  userBooks,
}) => {
  const [books, setBooks] = useState([]);
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

  const handleAddBook = async (book) => {
    try {
      // Verificar si el libro ya está en la lista
      // Crear nueva lista con el libro agregado
      const newBookIds = [...userBooks.map((b) => b.id), book.id_book];

      // Actualizar en backend
      const updatedUser = await updateUserBooks(newBookIds);
      console.log(updatedUser);
      // Actualizar estado local
      const booksData = await getAllExceptUserBooks();

      setBooks(booksData);
      onAddBook();
      onClose();

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
