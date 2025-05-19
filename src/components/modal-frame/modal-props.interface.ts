export default interface ModalProps {
  dialogMode: "create" | "edit" | "view";
  body: any;
  show: boolean;
  onClose: any;
  onSave: any;
  entity: string;
}
