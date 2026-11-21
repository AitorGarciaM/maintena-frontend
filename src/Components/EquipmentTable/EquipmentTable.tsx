import styles from "./EquipmentTable.module.scss"

import {EQUIPMENT_STATUS_LABELS, type ModalMode} from "../../types/modal"
import type { Equipment } from "../../types/Entities";

interface EquipmentTableProps {
  readonly onOpen: (modalMode:ModalMode, id:number) => void,
  readonly equipments:Equipment[],
  readonly showRetired:boolean,
}

export default function EquipmentTable({
  equipments,
  onOpen,
  showRetired
}: EquipmentTableProps) {
  return(
    <div className={styles.tableWraper}>
      <table className={styles.frame}>
        <thead>
          <tr className={styles.row}>
            <th>ID</th>
            <th>N.º Serie</th>
            <th>Nombre</th>
            <th>Modelo</th>
            <th>Fabricante</th>
            <th>Instalación</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            equipments.filter((equipment) => showRetired || !equipment.retired).map((equipment) => (
              <tr key={equipment.id} className={styles.row}>
                <td>{equipment.internalId}</td>
                <td>{equipment.serialNumber}</td>
                <td>{equipment.name}</td>
                <td>{equipment.model}</td>
                <td>{equipment.manufacturer}</td>
                <td>{equipment.installationDate}</td>
                <td>{equipment.location}</td>
                <td>{EQUIPMENT_STATUS_LABELS[equipment.status]}</td>
                <td>
                  <button className={styles.editBtn} onClick={() => {onOpen("edit", equipment.id)}}>
                    <i className="fa fa-edit" />
                  </button>
                </td>
              </tr>
            ))

            
          }
        </tbody>
      </table>
    </div>
  )
}