import Head from 'next/head'

function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Product Feedback App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col xl:text-xl items-center w-full flex-1 bg-light-100 ">
        <div className="sm:max-w-xl relative md:max-w-3xl xl:max-w-7xl flex flex-col xl:flex-row xl:gap-10 ">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
