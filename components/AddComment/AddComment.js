import { useFormik } from 'formik'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import { db } from '../../firebase'
import styles from './AddComment.module.css'

function AddComment() {
  const router = useRouter()
  const { data: session } = useSession()
  const productId = router.query.id

  const sendComment = async (values) => {
    !session && signIn()
    if (!session) return
    try {
      await addDoc(collection(db, 'productRequests', productId, 'comments'), {
        timestamp: serverTimestamp(),
        name: session.user.name,
        content: values.comment,
        username: session.user.username,
        userimage: session.user.image,
      })
      const commentToAdd = {
        timestamp: serverTimestamp(),
        name: session.user.name,
        content: values.comment,
        username: session.user.username,
        userimage: session.user.image,
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2))
      await sendComment(values)
      resetForm()
    },
  })

  return (
    <div className={styles.container}>
      <h2>Add Comment</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <input
            placeholder="Enter a comment here"
            id="comment"
            name="comment"
            type="comment"
            className="input"
            onChange={formik.handleChange}
            value={formik.values.comment}
          />
          <div className="flex justify-between items-center">
            <p className=" text-dark-100">{`${
              250 - formik.values.comment.length
            } characters left`}</p>
            <button className=" bg-primary button" type="submit">
              Post Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddComment
