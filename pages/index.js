import Head from 'next/head';
import styles from '../styles/index.module.scss';

import MainPage from '../components/mainPage/mainPage';

export default function Home() {
  return (
    <div id="container" className={styles.container}>
      <Head>
        <title>Benedikt Hofirek</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Caveat&family=Roboto&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      </Head>

      <main>
        <MainPage />
      </main>
    </div>
  )
}
