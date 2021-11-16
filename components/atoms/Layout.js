import Head from 'next/head'

function Layout({ children, page }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Product Feedback App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col xl:text-xl items-center w-full flex-1 bg-light-100 ">
        {page === 'home' && (
          <div className="sm:max-w-2xl relative md:max-w-7xl xl:max-w-7xl flex flex-col xl:flex-row xl:gap-10 sm:px-8">
            {children}
          </div>
        )}
        {page !== 'home' && (
          <div className="flex flex-col sm:max-w-xl md:max-w-5xl sm:px-8 m-4">
            {children}
          </div>
        )}
      </main>
    </div>
  )
}

export default Layout
