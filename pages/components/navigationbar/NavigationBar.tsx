import React from "react";
import Link from 'next/link';
import styles from '@/pages/index.module.css';

const NavigationBar = () => (
    <div className="horizontal-color-bar">

    <Link href="/">
        <button className={styles.button}>Home</button>
    </Link>
    <Link href="/moderation">
        <button className={styles.button}>Moderator</button>
    </Link>
    <Link href="/analyst">
        <button className={styles.button}>Analyst</button>
    </Link>
    <Link href="/admin">
        <button className={styles.button}>Admin</button>
    </Link>
  </div>
);

export default NavigationBar;


