import React from 'react'
import { useFormik } from 'formik'

function AddComment() {
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
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
            className="bg-light-100 pl-4 pt-4 pb-10 mb-4 active:outline-none focus:outline-none"
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
