import { db } from '../../firebase'
import { getDocs, collection, doc, getDoc } from '@firebase/firestore'
import Card from '@/components/Card'
import Layout from '@/components/Layout'
import Back from '@/components/Back'
import Comments from '@/components/Comments'

function Feedback({ product, id }) {
  const item = JSON.parse(product)

  return (
    <Layout>
      <Back button="edit" />
      <Card data={item} id={id} />
      <Comments id={id} />
    </Layout>
  )
}

export default Feedback

export async function getStaticPaths() {
  // Return a list of possible value for id
  const snapshot = await getDocs(collection(db, 'productRequests'))
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const docRef = doc(db, 'productRequests', params.id)
  const docSnap = await getDoc(docRef)
  return {
    props: {
      product: JSON.stringify(docSnap.data() || null),
      id: docSnap.id,
    },
  }
}
