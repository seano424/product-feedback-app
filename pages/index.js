import Header from '@/components/Header/Header'
import Requests from '@/components/Requests/Requests'
import SidePanel from '@/components/SidePanel/SidePanel'
import Layout from '@/components/Layout/Layout'

export default function Home() {
  return (
    <Layout page="home">
      <Header />
      <SidePanel />
      <Requests />
    </Layout>
  )
}
