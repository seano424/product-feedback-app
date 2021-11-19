import { useFormik } from 'formik'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'
import { db } from '../firebase'

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
    <div className="px-8 py-4 bg-white rounded-lg mb-20">
      <h2 className="text-lg my-4 font-bold text-dark-200">Add Comment</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <input
            placeholder="Enter a comment here"
            id="comment"
            name="comment"
            type="comment"
            className="bg-light-100 rounded-lg pl-4 pt-4 pb-10 mb-4 active:outline-none focus:outline-none"
            onChange={formik.handleChange}
            value={formik.values.comment}
          />
          <div className="flex justify-between items-center">
            <p className=" text-dark-100">{`${
              250 - formik.values.comment.length
            } characters left`}</p>
            <button
              className=" bg-primary text-white px-4 py-2 rounded-lg"
              type="submit"
            >
              Post Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddComment
