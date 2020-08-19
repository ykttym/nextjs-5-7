import s from './Layout.module.css'

export default function Layout({ children }) {
  return (
    <main className={s.container}>
      <header > Header </header>
      <section>{children}</section>
      <footer >Footer</footer>
    </main>
  );
}
