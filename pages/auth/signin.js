import { getProviders, signIn } from 'next-auth/react'

export default function SignIn({ providers }) {
  return (
    <div className="h-screen w-screen flex">
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-24 text-center w-screen">
        <h1 className="text-5xl font-black uppercase text-primary">
          Product Feedback
        </h1>
        <p className="font-xs italic">
          Your personal invoice app. Keep track of your business.
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-secondary rounded-lg text-white"
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
