import Card from '@/components/molecules/Card'
import Layout from '@/components/atoms/Layout'
import Back from '@/components/atoms/Back'
import Comments from '@/components/molecules/Comments'
import AddComment from '@/components/molecules/AddComment'
import { getAllProductIds, getProductData } from '@/lib/products'

function Feedback({ product }) {
  return (
    <Layout>
      <Back button="edit" />
      <Card {...product} />
      <Comments comments={product.comments} />
      <AddComment />
    </Layout>
  )
}

export default Feedback

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllProductIds()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id

  const productData = getProductData(params.id)
  return {
    props: {
      product: productData,
    },
  }
}
