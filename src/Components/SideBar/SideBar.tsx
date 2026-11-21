import React from "react"
import styles from './Sidebar.module.scss'
import logo from '../../assets/Maintena_logo.svg'
import SearchBar from "../SearchBar/SearchBar"

function SideBar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <img src={logo} alt="Maintena logo" className={styles.logo} />
      </div>
      <div className={styles.content}>
        <SearchBar />
        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.navList}>
            <li>
              <a className={`${styles.navLink} ${styles.active}`} href="#equipamiento" aria-current="page">Equipamiento</a>
            </li>  
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default SideBar