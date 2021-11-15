import Card from '@/components/molecules/Card'
import Layout from '@/components/atoms/Layout'
import GoBack from '@/components/atoms/GoBack'
import Comments from '@/components/molecules/Comments'
function Feedback() {
  return (
    <Layout>
      <GoBack button="edit" />
      <Card />
      {/* Comments */}
      <Comments />
    </Layout>
  )
}

export default Feedback
