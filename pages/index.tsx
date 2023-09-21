import Head from 'next/head';
import styles from '@/pages/index.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Speed application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Home Page</h1>
        <Link href="/moderator">
          <button>Moderator</button>
        </Link>
        <Link href="/analyst">
          <button>Analyst</button>
        </Link>
      </main>

      <footer className={styles.footer}>
        {}
      </footer>
    </div>
  );
}
