import React from "react";
import { Button } from "primereact/button";

export const BookComponent = ({ onEdit, onDelete, onDetails, onFavorite }) => {
  return (
    <>
      <div className="book-component flex flex-col items-center p-2 border-round surface-card shadow-2 max-w-44">
        {/* Imagen del libro */}
        <img
          src="/images/foto_tigre.png"
          alt="Portada del libro"
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
            icon="pi pi-pencil"
            rounded
            outlined
            severity="info"
            aria-label="Editar"
            onClick={onEdit}
            size="small"
            style={{ width: "100%" }}
            tooltip="Editar"
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
            icon="pi pi-heart"
            rounded
            outlined
            severity="success"
            aria-label="Descargar"
            onClick={onFavorite}
            size="small"
            style={{ width: "100%" }}
            tooltip="Añadir a favoritos"
          />
        </div>
      </div>
    </>
  );
};
