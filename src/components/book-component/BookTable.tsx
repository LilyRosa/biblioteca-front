// BookTable.js
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function BookTable({ books, loading, onAddBook }) {
  const actionBodyTemplate = (rowData) => {
    return (
      <div
        className="flex gap-2 justify-content-center"
        key={new Date().getUTCDate().toString()}
      >
        <Button
          icon="pi pi-plus"
          rounded
          outlined
          severity="success"
          aria-label="Añadir"
          onClick={() => onAddBook(rowData)}
          tooltip="Añadir a mi lista de libros"
        />
      </div>
    );
  };

  return (
    <DataTable
      value={books}
      paginator
      showGridlines
      rows={10}
      loading={loading}
      dataKey="theme"
      emptyMessage="No se encontraron libros."
    >
      <Column field="theme" header="Título" style={{ minWidth: "12rem" }} />
      <Column field="author" header="Autor" style={{ minWidth: "12rem" }} />
      <Column
        field="genre.genre"
        header="Género"
        style={{ minWidth: "12rem" }}
      />
      <Column
        header="Acciones"
        body={actionBodyTemplate}
        style={{ minWidth: "8rem" }}
        exportable={false}
      />
      {/* Puedes agregar más columnas según necesites */}
    </DataTable>
  );
}
