import Header from '@/components/Header'
import ProductReviews from '@/components/ProductReviews'
import SidePanel from '@/components/SidePanel'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout page="home">
      <Header />
      <SidePanel />
      <ProductReviews />
    </Layout>
  )
}
