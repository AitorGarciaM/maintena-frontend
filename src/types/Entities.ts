import type { EquipmentFormData, EquipmentStatus } from "./modal";

export type Equipment = {
  id: number;
  internalId: string;
  serialNumber: string;
  name: string;
  model: string;
  manufacturer: string;
  installationDate: string;
  location: string;
  status: EquipmentStatus;
  retired: boolean;
}

export const toEquipmentFormData = (equipment: Equipment): EquipmentFormData => ({
  internalId: equipment.internalId,
  serialNumber: equipment.serialNumber,
  name: equipment.name,
  model: equipment.model,
  manufacturer: equipment.manufacturer,
  installationDate: equipment.installationDate,
  location: equipment.location,
  status: equipment.status,
  retired: equipment.retired,
});