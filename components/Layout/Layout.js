import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './Layout.module.css'

function Layout({ children, page }) {
  const { data: session } = useSession()
  return (
    <>
      {session ? (
        <button className={styles.login} onClick={signOut}>
          Sign out
        </button>
      ) : (
        <button className={styles.login} onClick={signIn}>
          Sign in
        </button>
      )}
      <div className={styles.container}>
        <Head>
          <title>Product Feedback App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {page === 'home' && <div className={styles.home}>{children}</div>}
          {page !== 'home' && <div className={styles.wrapper}>{children}</div>}
        </main>
      </div>
    </>
  )
}

export default Layout
