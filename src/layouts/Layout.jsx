import styles from "./Layout.module.css";
export function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Crypto App</h1>
        <span className={styles.header__text}>
          <a className={styles.header__link} href="https://botostart.ir">
            Monet
          </a>
          | React.js Full course
        </span>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>Developed By ❤️</p>
      </footer>
    </>
  );
}
