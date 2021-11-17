import React from 'react'
import { useFormik } from 'formik'

function AddComment() {
  const formik = useFormik({
    initialValues: {
      reply: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <div className="py-4 bg-white rounded-lg mb-20">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex space-x-8">
          <input
            placeholder="Enter a reply here"
            id="reply"
            name="reply"
            type="reply"
            className="bg-light-100 flex-1 pl-4 pt-4 pb-10 active:outline-none focus:outline-none rounded-lg"
            onChange={formik.handleChange}
            value={formik.values.reply}
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

export default AddComment
