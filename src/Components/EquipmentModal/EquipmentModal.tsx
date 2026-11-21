import { useEffect, useState } from "react";

import Toggle from "../Toggle/Toggle";
import { EQUIPMENT_STATUS_LABELS } from "../../types/modal";
import type {EquipmentFormData, EquipmentStatus, ModalMode} from "../../types/modal"
import styles from "./EquipmentModal.module.scss";

interface EquipmentModalProps {
  readonly mode?: ModalMode;
  readonly initialData?: EquipmentFormData | null;
  readonly onClose: () => void;
  readonly onSubmit?: (data: EquipmentFormData, mode: ModalMode) => void;
}

const EMPTY_FORM: EquipmentFormData = {
  internalId: "",
  serialNumber: "",
  name:  "",
  model: "",
  manufacturer: "",
  installationDate: "",
  location: "",
  status: "OPERATIVE",
  retired: false,
};

export default function EquipmentModal({
  mode = "add",
  initialData = null,
  onClose,
  onSubmit,
}: EquipmentModalProps) {
  const [formData, setFormData] = useState<EquipmentFormData>(initialData ?? EMPTY_FORM);

  const isEdit = mode === "edit";
  const title = isEdit ? "Editar Equipo" : "Añadir Equipo";
  const submitlabel = mode === "edit" ? "Editar" : "Añadir";

  // Close Modal with ESC Key.
  useEffect(() => {

    const handleKeydown = (event : KeyboardEvent) => {
      if(event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const handleChange = <K extends keyof EquipmentFormData>(
    field: K,
    value: EquipmentFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]:value,
    }));
  };

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(formData, mode);
    onClose();
  }

  const handleToggleActivation = (checked: boolean) => {
    handleChange("retired", checked)
  }

  return(
    <dialog className={styles.modal}>
      <h1 id="equipment-modal-title">
        {title}
      </h1>

      <form onSubmit={handleFormSubmit}>
        <div className={styles.row}>
          <label className={styles.rowContent}>
          <span>ID Interna:</span>
            <input type="text" value={formData.internalId} onChange={(e) => handleChange("internalId", e.target.value)} />
          </label>
          <label className={styles.rowContent}>
          <span>N.º Serie:</span>
            <input type="text" value={formData.serialNumber} onChange={(e) => handleChange("serialNumber", e.target.value)} />
          </label>
        </div>
        <div className={styles.row}>
          <label className={styles.rowContent}>
            <span>Nombre:</span>
            <input type="text" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
          </label>
          <label className={styles.rowContent}>
            <span>Modelo:</span>
            <input type="text" value={formData.model} onChange={(e) => handleChange("model", e.target.value)} />
          </label>
        </div>
        <div className={styles.row}>
          <label className={styles.rowContent}>
            <span>Fabricante:</span>
            <input type="text" value={formData.manufacturer} onChange={(e) => handleChange("manufacturer", e.target.value)}/>
          </label>
          <label className={styles.rowContent}>
            <span>Fecha de instalación:</span>
            <input type="date" value={formData.installationDate} onChange={(e) => handleChange("installationDate", e.target.value)}/>
          </label>
        </div>
        <div className={styles.row}>
          <label className={styles.rowContent}>
            <span>Ubicación:</span>
            <input type="text" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} />
          </label>
          <label className={styles.rowContent}>
            <span>Estado:</span>
            <select id="status" className={styles.select} value={formData.status} onChange={(e) => handleChange("status", e.target.value as EquipmentStatus)}>
              {(Object.keys(EQUIPMENT_STATUS_LABELS) as EquipmentStatus[]).map(
                  (statusKey) => (
                    <option key={statusKey} value={statusKey}>
                      {EQUIPMENT_STATUS_LABELS[statusKey]}
                    </option>
                  )
                )}
            </select>
          </label>
        </div>
        <div className={styles.row}>
          <div className={styles.toggleWraper}>
            <Toggle checked={formData.retired} onChange={handleToggleActivation} />
            <span>{formData.retired ? "Retirado" : "No Retirado"}</span>
          </div>
        </div>
        <div className={styles.btnsRow}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className={styles.acceptBtn}>
            {submitlabel}
          </button>
        </div>
      </form>
    </dialog>
  )
}