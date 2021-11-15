import Header from '@/components/organisms/Header'
import Suggestions from '@/components/organisms/Suggestions'
import Modal from '@/components/atoms/Modal'
import Layout from '@/components/atoms/Layout'

export default function Home() {
  return (
    <Layout>
      <Header />
      <Modal />
      <Suggestions />
    </Layout>
  )
}
