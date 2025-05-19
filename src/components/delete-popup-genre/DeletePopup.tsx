import React from "react";
import { ConfirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";

export const DeletePopup = ({
  visible,
  target,
  onHide,
  onAccept,
  onReject,
  toastRef,
}) => (
  <>
    <Toast ref={toastRef} />
    <ConfirmPopup
      target={target}
      visible={visible}
      onHide={onHide}
      message="¿Deseas eliminar este género?"
      icon="pi pi-info-circle"
      accept={onAccept}
      reject={onReject}
      acceptClassName="p-button-danger"
      acceptLabel="Sí"
      rejectLabel="No"
    />
  </>
);
