import { db } from '../../firebase'
import { getDocs, collection } from '@firebase/firestore'
import Card from '@/components/Card/Card'
import Layout from '@/components/Layout/Layout'
import Back from '@/components/Back'
import Comments from '@/components/Comments/Comments'

import DeleteModal from '@/components/DeleteModal/DeleteModal'
import useFetchFeedback from 'hooks/useFetchFeedback'

function Feedback({ id }) {
  const { loading } = useFetchFeedback()

  return (
    <Layout>
      {!loading && (
        <>
          <Back button="edit" />
          <DeleteModal page="messages" />
          <Card id={id} />
          <Comments id={id} />
        </>
      )}
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
  return {
    props: {
      id: params.id,
    },
  }
}
