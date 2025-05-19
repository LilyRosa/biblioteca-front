// Modal.js
import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ModalProps from "./modal-props.interface";

export default function ModalFrame({
  dialogMode,
  body,
  show,
  onClose,
  onSave,
  entity,
}: ModalProps) {
  const footerContent = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => onClose()}
        className="p-button-text"
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        onClick={() => onSave()}
        autoFocus
      />
    </div>
  );

  const headerContent = (
    <div>
      <p>
        {dialogMode === "create"
          ? "Agregar"
          : dialogMode === "edit"
          ? "Editar"
          : "Ver"}{" "}
        {entity}
      </p>
    </div>
  );

  return (
    <Dialog
      header={headerContent}
      visible={show}
      style={{ width: "50vw" }}
      onHide={() => {
        if (!show) return;
        onClose();
      }}
      footer={footerContent}
    >
      {body}
    </Dialog>
  );
}
