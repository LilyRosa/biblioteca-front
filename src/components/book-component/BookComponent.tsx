import React from "react";
import { Button } from "primereact/button";

export const BookComponent = ({
  onDownload,
  onDelete,
  onDetails,
  onFavorite,
  book,
}) => {
  return (
    <>
      <div className="book-component flex flex-col items-center p-2 border-round surface-card shadow-2 max-w-44">
        {/* Imagen del libro */}
        <img
          src={book.poster || "/images/foto_tigre.png"} // fallback si no hay poster
          alt={`Portada del libro ${book.theme}`}
          className="book-image mb-3 h-32"
          style={{
            objectFit: "cover",
            borderRadius: "6px",
            display: "block",
          }}
        />

        {/* Contenedor de botones */}
        <div
          className="button-group grid gap-2"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            width: "100%",
          }}
        >
          <Button
            icon="pi pi-download"
            rounded
            outlined
            severity="info"
            aria-label="Descargar"
            onClick={onDownload}
            size="small"
            style={{ width: "100%" }}
            tooltip="Descargar"
          />
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            aria-label="Eliminar"
            onClick={onDelete}
            size="small"
            style={{ width: "100%" }}
            tooltip="Eliminar"
          />
          <Button
            icon="pi pi-eye"
            rounded
            outlined
            severity="help"
            aria-label="Detalles"
            onClick={onDetails}
            size="small"
            style={{ width: "100%" }}
            tooltip="Ver detalles"
          />
          <Button
            icon={book.favorite ? "pi pi-heart-fill" : "pi pi-heart"}
            rounded
            outlined
            severity="success"
            aria-label="Descargar"
            onClick={onFavorite}
            size="small"
            style={{ width: "100%" }}
            tooltip={
              book.favorite ? "Quitar de favoritos" : "Añadir a favoritos"
            }
          />
        </div>
      </div>
    </>
  );
};
