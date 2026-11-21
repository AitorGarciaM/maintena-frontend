import SideBar from "./Components/SideBar/SideBar"

import styles from "./App.module.scss"
import EquipmentTable from "./Components/EquipmentTable/EquipmentTable"
import EquipmentModal from "./Components/EquipmentModal/EquipmentModal"
import { useState } from "react"

import {type EquipmentFormData, type ModalMode} from "./types/modal"
import { toEquipmentFormData, type Equipment } from "./types/Entities"

const initialData: Equipment[] = [
  {
    id: 1,
    internalId: "EQ-001",
    serialNumber: "HSF-2024-001",
    name: "Centro de mecanizado CNC",
    model: "VF-2",
    manufacturer: "Haas",
    installationDate: "2024-03-12",
    location: "Línea 1",
    status: "OPERATIVE",
    retired: false
  },
  {
    id: 2,
    internalId: "EQ-002",
    serialNumber: "SN12345678",
    name: "Bomba de Agua Principal",
    model: "X-200",
    manufacturer: "Industrial Tech",
    installationDate: "2026-01-14",
    location: "Línea 2",
    status: "OPERATIVE",
    retired: false,
  }
];

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

function App() {
  const [equipments, setEquipments] = useState<Equipment[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showRetired, setShowRetired] = useState(false);
  const [currentModalMode, setCurrentModalMode] = useState<ModalMode>("add");
  const [selectedData, setSelectedData] = useState<EquipmentFormData>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);

  const allEquipmentCount = equipments.length;
  const operativeEquipmentCount = equipments.filter((equipment) => equipment.status === "OPERATIVE").length;
  const underMaintenanceEquipmentCount = equipments.filter((equipment) => equipment.status === "UNDER_MAINTENANCE").length;
  const outOfServiceEquipmentCount = equipments.filter((equipment) => equipment.status === "OUT_OF_SERVICE").length

  const handleOpenModal = (modalMode : ModalMode, id: number | null) => {
    if(modalMode === "edit" && id != null && id >= 1) {
      const found = equipments.find((item) => item.id === id);

      if(found)
      {
        const formData = toEquipmentFormData(found)
        setSelectedData(formData);
        setEditingId(id);
      }
      else {
        setSelectedData(EMPTY_FORM);
        setEditingId(null);
      }
    }

    setIsModalOpen(true);
    setCurrentModalMode(modalMode);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setSelectedData(EMPTY_FORM)
  }

  const handleSubmitEquipment = (formData: EquipmentFormData) => {
    if(currentModalMode === "add") {
      const nextId = equipments.length > 0 ? Math.max(...equipments.map((item) => item.id)) + 1 : 1;

      const newEquipment: Equipment = {
        ...formData,
        id:nextId,
      }

      setEquipments((prev) => [...prev, newEquipment]);
    } else if(currentModalMode === "edit") {
      setEquipments((prev) => prev.map((item) => item.id === editingId? {...item, ...formData, id:editingId}:item))
    }

    setEditingId(null)
    setIsModalOpen(false);
  }

  return (
    <div className={styles.appLayout}>
      <SideBar/>
      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
            <h1>Equipamiento</h1>
            <div className={styles.menu}>
            <button className={styles.addBtn} onClick={() => {handleOpenModal("add", null)}}>
              <i className="fa fa-plus" />
            </button>
            <button className={styles.addBtn}>
              <i className="fa fa-gear" />
            </button>
            <button className={styles.addBtn}>
              <i className="fa fa-user" />
            </button>
          </div>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <a href="/#">todas</a> ({allEquipmentCount}) | <a href="/#">Operativas</a> ({operativeEquipmentCount}) |{" "}
            <a href="/#">En mantenimiento </a> ({underMaintenanceEquipmentCount})|{" "}
            <a href="/#">Fuera de servicio</a> ({outOfServiceEquipmentCount})
          </div>

          <label className={styles.retiredCheckbox}>
            <input type="checkbox" checked={showRetired} id="retiredFilter" onChange={() => setShowRetired(!showRetired)}/>
            <span> Retirados</span>
          </label>
        </div>

        <EquipmentTable
          showRetired={showRetired}
          equipments={equipments}
          onOpen={handleOpenModal}
        />
        
        {isModalOpen && (
          <EquipmentModal
            key={`${currentModalMode}-${selectedData?.internalId || "new"}`}
            mode={currentModalMode}
            initialData={selectedData}
            onClose={handleCloseModal}
            onSubmit={handleSubmitEquipment}
          />
        )}

        
      </main>
      
    </div>
  )
}

export default App
