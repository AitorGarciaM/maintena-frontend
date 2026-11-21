export type ModalMode = "add" | "edit";

export type EquipmentStatus =
  |  "OPERATIVE"
  |  "UNDER_MAINTENANCE"
  |  "OUT_OF_SERVICE";

export const EQUIPMENT_STATUS_LABELS: Record<EquipmentStatus, string> = {
  OPERATIVE: "Operativo",
  UNDER_MAINTENANCE: "En mantenimiento",
  OUT_OF_SERVICE: "fuera de servicio"
}

export interface EquipmentFormData {
  internalId: string;
  serialNumber: string;
  name: string;
  model: string;
  manufacturer: string;
  installationDate : string;
  location: string;
  status: EquipmentStatus;
  retired: boolean;
}