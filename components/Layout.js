import Head from 'next/head'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
function Layout({ children, page }) {
  const { data: session } = useSession()
  return (
    <>
      {session ? (
        <button
          className="hidden mx-10 xl:mx-24 py-2 text-dark-200 sm:inline-flex"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      ) : (
        <button
          className="hidden mx-10 xl:mx-24 py-2 text-dark-200 sm:inline-flex"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      )}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Head>
          <title>Product Feedback App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col xl:text-xl items-center w-full flex-1 bg-light-100 ">
          {page === 'home' && (
            <div className="flex flex-col  xl:flex-row xl:gap-10 relative sm:max-w-2xl md:max-w-7xl xl:max-w-7xl sm:px-8">
              {children}
            </div>
          )}
          {page !== 'home' && (
            <div className="flex flex-col w-full sm:max-w-xl md:max-w-5xl px-8 m-4">
              {children}
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default Layout
