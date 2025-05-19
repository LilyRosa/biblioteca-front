// import React from "react";
import React, { useRef, useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { GenreModal } from "./GenreModal";
import "./styles.css";
import { DeletePopup } from "../delete-popup-genre/DeletePopup";

export const GenrePanel = () => {
  const [globalFilterValue, setGlobalFilterValue] = React.useState("");
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const statuses = ["misterio", "suspenso", "drama", "terror", "romance"];
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState("create");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [popup, setPopup] = useState(false);
  const [popupTarget, setPopupTarget] = useState(null);

  const toast = useRef(null);

  const showPopup = (event, genre) => {
    setPopup(true);
    setPopupTarget(event.currentTarget); // Guarda el botón que disparó el popup
    setSelectedGenre(genre);
  };

  const handleAcceptDelete = () => {
    // Aquí la lógica para eliminar el libro seleccionado
    setPopup(false);
  };

  const handleRejectDelete = () => {
    setPopup(false);
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
            label="Agregar Género"
            outlined
            onClick={() => showCreate()}
          />
        </div>
      </div>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{rowData.country.name}</span>
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
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          aria-label="Eliminar"
          onClick={(e) => showPopup(e, rowData)}
        />
      </div>
    );
  };

  const showCreate = () => {
    setShowModal(true);
    setTypeModal("create");
    setSelectedGenre(null);
  };

  const showEdit = (genre) => {
    setShowModal(true);
    setTypeModal("edit");
    setSelectedGenre(genre);
  };

  const filterFooterTemplate = () => {
    return <div className="px-3 pt-0 pb-3 text-center">Filter by Country</div>;
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
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
          value={[
            { name: "Pepito", country: { name: "Cuba" }, status: "misterio" },
          ]}
          paginator
          showGridlines
          rows={10}
          loading={loading}
          dataKey="name"
          filters={filters}
          globalFilterFields={["theme", "author", "genre"]}
          header={header}
          emptyMessage="No fueron encontrados libros."
          onFilter={(e) => setFilters(e.filters)}
        >
          <Column
            field="genre"
            header="Género"
            filter
            filterPlaceholder="Filtrar por género"
            style={{ minWidth: "12rem" }}
          />

          <Column
            header="Acciones"
            body={actionBodyTemplate}
            style={{ minWidth: "8rem" }}
            exportable={false}
          />
        </DataTable>
      </div>

      <GenreModal
        dialogMode={typeModal}
        onClose={() => setShowModal(false)}
        show={showModal}
        book={selectedGenre}
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
