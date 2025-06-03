import React, { useEffect, useState, useRef } from "react";
import ModalFrame from "../modal-frame/ModalFrame";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { getAllGenre } from "@/api/genres/service/genre.service";
import { GenreOutputDto } from "@/api/books/interface/output/book.output.dto";
import UpdateBookInputDto from "../../api/books/interface/input/update-book.input.dto";

export const BookModal = ({ show, onClose, dialogMode, book, onSave }) => {
  const [genre, setGenre] = useState("");
  const [theme, setTheme] = useState("");
  const [author, setAuthor] = useState("");
  const [resume, setResume] = useState("");
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [bookPdfFile, setBookPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const posterUploadRef = useRef<FileUpload>(null);
  const pdfUploadRef = useRef<FileUpload>(null);
  const [currentPosterUrl, setCurrentPosterUrl] = useState("");
  const [currentBookPdfUrl, setCurrentBookPdfUrl] = useState("");

  // Configuración de archivos
  const acceptedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
  const acceptedPdfTypes = ["application/pdf"];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    if (dialogMode === "edit" && book) {
      setTheme(book.theme || "");
      setAuthor(book.author || "");
      setResume(book.resume || "");
      setCurrentPosterUrl(book.poster || "");
      setCurrentBookPdfUrl(book.bookPdf || "");
      setGenre(book.genre.id_genre || "");
    } else {
      resetForm();
    }
  }, [dialogMode, book, show]);

  const [genres, setGenres] = useState<GenreOutputDto[]>([]);

  useEffect(() => {
    getAllGenre().then((x) => {
      setGenres(x);
      if (book) setGenre(book.genre.id_genre);
    });
  }, [book]);

  const resetForm = () => {
    setTheme("");
    setAuthor("");
    setResume("");
    setCurrentPosterUrl("");
    setCurrentBookPdfUrl("");
    setGenre("");
    setPosterFile(null);
    setBookPdfFile(null);
    posterUploadRef.current?.clear();
    pdfUploadRef.current?.clear();
  };

  const handlePosterUpload = (event) => {
    if (event.files && event.files[0]) {
      const file = event.files[0];

      if (!acceptedImageTypes.includes(file.type)) {
        toast.current?.show({
          severity: "error",
          summary: "Formato inválido",
          detail: "Solo se permiten imágenes JPG, JPEG o PNG.",
          life: 3000,
        });
        posterUploadRef.current?.clear();
        return;
      }

      if (file.size > maxFileSize) {
        toast.current?.show({
          severity: "error",
          summary: "Archivo demasiado grande",
          detail: "La imagen no puede exceder los 5MB.",
          life: 3000,
        });
        posterUploadRef.current?.clear();
        return;
      }

      setPosterFile(file);
    }
  };

  const handlePdfUpload = (event) => {
    if (event.files && event.files[0]) {
      const file = event.files[0];

      if (!acceptedPdfTypes.includes(file.type)) {
        toast.current?.show({
          severity: "error",
          summary: "Formato inválido",
          detail: "Solo se permiten archivos PDF.",
          life: 3000,
        });
        pdfUploadRef.current?.clear();
        return;
      }

      setBookPdfFile(file);
    }
  };

  const handleSave = () => {
    if (dialogMode === "create" && (!posterFile || !bookPdfFile)) {
      toast.current?.show({
        severity: "error",
        summary: "Campos requeridos",
        detail: "Debe subir tanto la portada como el libro PDF",
        life: 3000,
      });
      return;
    }

    const bookData = {
      genre: genre,
      theme: theme,
      author: author,
      resume: resume,
      poster: posterFile,
      bookPdf: bookPdfFile,
      id: dialogMode === "edit" && book?.id_book ? book.id_book : null,
    };

    console.log(bookData);

    onSave(bookData);
  };

  const posterUploadOptions = {
    label: "Seleccionar",
    icon: "pi pi-fw pi-image",
    className: "p-button-outlined p-button-sm",
  };

  const pdfUploadOptions = {
    label: "Seleccionar",
    icon: "pi pi-fw pi-file-pdf",
    className: "p-button-outlined p-button-sm p-button-danger",
  };

  const body = (
    <div className="flex flex-col gap-y-4">
      <Toast ref={toast} position="top-center" />

      {/* Campos de texto */}
      {[
        { label: "Título", value: theme, setter: setTheme },
        { label: "Autor", value: author, setter: setAuthor },
        { label: "Sinopsis", value: resume, setter: setResume },
      ].map(({ label, value, setter }) => (
        <div key={label} className="flex items-center gap-4">
          <label className="font-semibold text-pink-600/90 w-24">{label}</label>
          <InputText
            type="text"
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="flex-1"
            required
          />
        </div>
      ))}

      {/* Upload de portada */}
      <div className="flex items-start gap-4">
        <label className="font-semibold text-pink-600/90 w-24 mt-2">
          Portada
        </label>
        <div className="flex-1">
          <FileUpload
            ref={posterUploadRef}
            name="poster"
            accept="image/*"
            maxFileSize={maxFileSize}
            customUpload
            uploadHandler={handlePosterUpload}
            chooseOptions={posterUploadOptions}
            mode="basic"
            auto
            chooseLabel="Seleccionar portada"
            className="w-full"
            emptyTemplate={
              <div className="p-4 border-round border-2 border-dashed surface-border">
                <i className="pi pi-image text-2xl mb-2"></i>
                <p className="m-0">Arrastre la imagen aquí o haga clic</p>
              </div>
            }
          />
          {currentPosterUrl && !posterFile && (
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-500 mr-2">
                Portada actual:
              </span>
              <a
                href={currentPosterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                <i className="pi pi-external-link mr-1"></i>Ver imagen
              </a>
            </div>
          )}
          {posterFile && (
            <div className="mt-2 flex items-center text-sm text-green-500">
              <i className="pi pi-check-circle mr-2"></i>
              Archivo listo: {posterFile.name}
            </div>
          )}
        </div>
      </div>

      {/* Upload de PDF */}
      <div className="flex items-start gap-4">
        <label className="font-semibold text-pink-600/90 w-24 mt-2">
          Libro PDF
        </label>
        <div className="flex-1">
          <FileUpload
            ref={pdfUploadRef}
            name="bookPdf"
            accept=".pdf"
            maxFileSize={maxFileSize}
            customUpload
            uploadHandler={handlePdfUpload}
            chooseOptions={pdfUploadOptions}
            mode="basic"
            auto
            chooseLabel="Seleccionar PDF"
            className="w-full"
            emptyTemplate={
              <div className="p-4 border-round border-2 border-dashed surface-border">
                <i className="pi pi-file-pdf text-2xl mb-2 text-red-500"></i>
                <p className="m-0">Arrastre el PDF aquí o haga clic</p>
              </div>
            }
          />
          {currentBookPdfUrl && !bookPdfFile && (
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-500 mr-2">Libro actual:</span>
              <a
                href={currentBookPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                <i className="pi pi-external-link mr-1"></i>Ver PDF
              </a>
            </div>
          )}
          {bookPdfFile && (
            <div className="mt-2 flex items-center text-sm text-green-500">
              <i className="pi pi-check-circle mr-2"></i>
              Archivo listo: {bookPdfFile.name}
            </div>
          )}
        </div>
      </div>

      {/* Selector de género */}
      <div className="flex items-center gap-4">
        <label className="font-semibold text-pink-600/90 w-24">Género</label>
        <Dropdown
          value={genre}
          options={genres || []}
          optionLabel="genre"
          optionValue="id_genre"
          onChange={(e) => setGenre(e.value)}
          placeholder="Selecciona un género"
          className="flex-1"
          required
        />
      </div>
    </div>
  );

  return (
    <ModalFrame
      body={body}
      dialogMode={dialogMode}
      entity="Libro"
      onClose={() => {
        resetForm();
        onClose();
      }}
      onSave={handleSave}
      show={show}
    />
  );
};
