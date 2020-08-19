import { useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home({ count, setCount }) {
  const [err, setErr] = useState(false);
  if (err) {
    throw new Error("出bug了");
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <h1>
        <Link href="/book">
          <a>to book</a>
        </Link>
      </h1>
      <h1>{count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>click to add !</button>
      <button onClick={() => setErr(true)}>click to throw error !</button>
    </div>
  );
}
