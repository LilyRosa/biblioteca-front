// import React from "react";
import React, { useEffect, useRef, useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { BookModal } from "./BookModal";
import "./styles.css";
import { DeletePopup } from "../delete-popup-book/DeletePopup";
import { BookModalDetails } from "./BookModalDetails";
import {
  addBook,
  deleteBook,
  getAllBook,
  updateBook,
} from "@/api/books/service/book.service";
import { getAllGenre } from "../../api/genres/service/genre.service";
import CreateBookInputDto from "../../api/books/interface/input/create-book.input.dto";
import UpdateBookInputDto from "../../api/books/interface/input/update-book.input.dto";

export const BookPanel = () => {
  const [globalFilterValue, setGlobalFilterValue] = React.useState("");
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const genres = ["misterio", "suspenso", "drama", "terror", "romance"];
  const [showModal, setShowModal] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [typeModal, setTypeModal] = useState("create");
  const [selectedBook, setSelectedBook] = useState(null);
  const [popup, setPopup] = useState(false);
  const [popupTarget, setPopupTarget] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const data = await getAllBook();
        // Si tu backend retorna { books: [...] } usa setBooks(data.books)
        setBooks(data);
      } catch (error) {
        console.error("Error al cargar los libros:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await getAllBook();
      // Si tu backend retorna { books: [...] } usa setBooks(data.books)
      setBooks(data);
    } catch (error) {
      console.error("Error al cargar los libros:", error);
    } finally {
      setLoading(false);
    }
  };

  const toast = useRef(null);

  const showPopup = (event, book) => {
    setPopup(true);
    setPopupTarget(event.currentTarget); // Guarda el botón que disparó el popup
    setSelectedBook(book);
  };

  const handleAcceptDelete = async () => {
    if (!selectedBook) return;
    setLoading(true);
    try {
      console.log("ID a eliminar:", selectedBook.id_book);
      await deleteBook(selectedBook.id_book);
      setPopup(false);
      await loadBooks();
    } catch (error) {
      console.error("Error al eliminar el género:", error);
      // Aquí puedes mostrar un toast o alerta de error si quieres
    } finally {
      setLoading(false);
    }
  };

  const handleRejectDelete = () => {
    setPopup(false);
  };

  const saveBook = async (bookData) => {
    try {
      if (typeModal === "create") {
        const newBook = await addBook(bookData);
        setBooks([...books, newBook]);
      } else if (typeModal === "edit") {
        const { id, ...rest } = bookData;
        const updatedBook = await updateBook(rest, id);
        setLoading(true);
        getAllBook().then((x) => {
          setBooks(x);
          setLoading(false);
        });
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error guardando libro:", error);
    }
  };

  const getSeverity = (status) => {
    switch (status) {
      case "misterio":
        return "danger";

      case "suspenso":
        return "success";

      case "drama":
        return "info";

      case "terror":
        return "warning";

      case "romance":
        return null;
    }
  };

  const clearFilter = () => {
    initFilters();
  };
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "country.name": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },

      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue("");
  };

  const renderHeader = () => {
    return (
      <div className="flex align-items-center">
        {/* Botón Clear a la izquierda */}
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />

        {/* Contenedor para botón Agregar + Input a la derecha */}
        <div className="flex gap-4 align-items-center ml-auto">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </IconField>
          <Button
            type="button"
            label="Agregar Libro"
            outlined
            onClick={() => showCreate()}
          />
        </div>
      </div>
    );
  };

  const themeBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{rowData.theme}</span>
      </div>
    );
  };

  const authorBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{rowData.author}</span>
      </div>
    );
  };

  const filterClearTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-times"
        onClick={options.filterClearCallback}
        severity="secondary"
      ></Button>
    );
  };

  const filterApplyTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-check"
        onClick={options.filterApplyCallback}
        severity="success"
      ></Button>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div
        className="flex gap-2 justify-content-center"
        key={new Date().getUTCDate().toString()}
      >
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          severity="info"
          aria-label="Editar"
          onClick={() => showEdit(rowData)}
          tooltip="Editar"
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          aria-label="Eliminar"
          onClick={(e) => showPopup(e, rowData)}
          tooltip="Eliminar"
        />
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          severity="success"
          aria-label="Detalles"
          onClick={() => showDetails(rowData)}
          tooltip="Ver detalles"
        />
      </div>
    );
  };

  const showDetails = (book) => {
    setShowModalDetails(true);
    setSelectedBook(book);
  };

  const showCreate = () => {
    setShowModal(true);
    setTypeModal("create");
    setSelectedBook(null);
  };

  const showEdit = (book) => {
    setShowModal(true);
    setTypeModal("edit");
    setSelectedBook(book);
  };

  const filterFooterTemplate = () => {
    return <div className="px-3 pt-0 pb-3 text-center">Filter by Country</div>;
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={genres}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={genreItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const genreItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const genreBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{rowData.genre.genre}</span>
      </div>
    );
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={genres}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={genreItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };

  const header = renderHeader();
  return (
    <section className="glassmorphism-panel p-6 rounded-3xl shadow-lg max-w-5xl mx-auto">
      <div className="glassmorphism-content border border-pink-300 rounded-xl p-6 text-center text-pink-600 font-semibold shadow-sm">
        <DataTable
          value={books}
          paginator
          showGridlines
          rows={10}
          loading={loading}
          dataKey="theme" // Usa el campo único de cada libro, normalmente "id"
          emptyMessage="No se encontraron libros."
          header={header}
        >
          <Column
            field="theme"
            header="Título"
            filter
            filterPlaceholder="Filtrar por título"
            style={{ minWidth: "12rem" }}
            body={themeBodyTemplate}
          />
          <Column
            field="author"
            header="Autor"
            filterField="country.name"
            style={{ minWidth: "12rem" }}
            body={authorBodyTemplate}
            filter
            filterPlaceholder="Filtrar por autor"
            filterClear={filterClearTemplate}
            filterApply={filterApplyTemplate}
            filterFooter={filterFooterTemplate}
          />

          <Column
            field="genre"
            header="Género"
            showFilterMenu={true}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "12rem" }}
            body={genreBodyTemplate}
            filter
            filterElement={statusFilterTemplate}
          />
          <Column
            header="Acciones"
            body={actionBodyTemplate}
            style={{ minWidth: "8rem" }}
            exportable={false}
          />
        </DataTable>
      </div>

      <BookModal
        dialogMode={typeModal}
        onClose={() => setShowModal(false)}
        show={showModal}
        book={selectedBook}
        onSave={saveBook}
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
  );
};
