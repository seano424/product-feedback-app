import { useFormik } from 'formik'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from '../../firebase'
import { signIn, useSession } from 'next-auth/react'
import styles from './AddReply.module.css'

function AddReply({ replyingTo, commentId, productId, setOpenReply }) {
  const { data: session } = useSession()

  const sendReply = async (values) => {
    !session && signIn()
    if (!session) return
    try {
      await addDoc(
        collection(
          db,
          'productRequests',
          productId,
          'comments',
          commentId,
          'replies'
        ),
        {
          timestamp: serverTimestamp(),
          content: values.reply,
          name: session.user.name,
          replyingTo,
          username: session.user.username,
          userimage: session.user.image,
        }
      )
      setOpenReply(false)
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      reply: '',
    },
    onSubmit: async (values, { resetForm }) => {
      await sendReply(values)
      resetForm()
    },
  })

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex space-x-8">
          <input
            placeholder={`Reply @${replyingTo} here`}
            id="reply"
            name="reply"
            type="reply"
            className="input"
            onChange={formik.handleChange}
            value={formik.values.reply}
            // value={`@${replyingTo}`}
          />
          <div>
            <button className=" bg-primary button" type="submit">
              Post Reply
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddReply
