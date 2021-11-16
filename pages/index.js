import { useEffect } from 'react'
import Header from '@/components/organisms/Header'
import Suggestions from '@/components/organisms/Suggestions'
import Modal from '@/components/atoms/Modal'
import Layout from '@/components/atoms/Layout'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  console.log(session)
  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
      <Layout page="home">
        <Header />
        <Modal />
        <Suggestions />
      </Layout>
    </div>
  )
}
