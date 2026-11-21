import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  return (
    <aside className={styles.wraper}>
      <input type="text" placeholder="Search" className={styles.searchbar} />
      <i className="fa-solid fa-magnifying-glass"></i>
    </aside>
  )
}