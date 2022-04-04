import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Admin from "../components/Admin"
import Public from "../components/Public"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Firebase Demo</title>
        <meta
          name="description"
          content="A simple demo to show the magic of firebase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          src="/images/Firebase_Logo.png"
          width="200"
          height="75"
          alt="Firebase Logo"
        />
        <h1 className={styles.title}>
          <a href="https://firebase.google.com/docs/build?authuser=0&hl=en">
            Firebase Demo
          </a>
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Admin</h2>
            <Admin />
          </div>

          <div className={styles.card}>
            <h2>Public</h2>
            <Public />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
