import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from '../firebase'
import { signIn, useSession } from 'next-auth/react'

function AddReply({ replyingTo, commentId, productId, setOpenReply }) {
  const { data: session } = useSession()

  const sendComment = async (values) => {
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
      console.log('Added!', reply, commentId)
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
      await sendComment(values)
      resetForm()
    },
  })

  return (
    <div className="py-4 bg-white rounded-lg mb-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex space-x-8">
          <input
            placeholder={`Enter a reply to @${replyingTo} here`}
            id="reply"
            name="reply"
            type="reply"
            className="bg-light-100 flex-1 pl-4 pt-4 pb-10 active:outline-none focus:outline-none rounded-lg"
            onChange={formik.handleChange}
            value={formik.values.reply}
            // value={`@${replyingTo}`}
          />
          <div>
            <button
              className=" bg-primary text-white px-4 py-2 rounded-lg"
              type="submit"
            >
              Post Reply
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddReply
