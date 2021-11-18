import { useState } from 'react'
import Back from '@/components/Back'
import { Formik, Field, Form, ErrorMessage, setFieldValue } from 'formik'
import { PlusIcon } from '@heroicons/react/solid'
import * as Yup from 'yup'
import { useRouter } from 'next/dist/client/router'
import { useDispatch } from 'react-redux'
import {
  setOpenDestroyModal,
  setDestroyData,
} from '@/redux/features/modal/modalSlice'

function ProductForm({
  toEdit,
  success,
  addProductRequest,
  editProductRequest,
}) {
  const [isDeleteButton, setIsDeleteButton] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const removeFeedbackRequest = async () => {
    dispatch(setOpenDestroyModal())
    dispatch(
      setDestroyData({
        productId: router.query.id,
      })
    )
  }

  return (
    <main className=" bg-light-100 w-full h-full pb-10">
      <div className="max-w-sm md:max-w-2xl mx-auto">
        <Back />
        {success ? (
          <div className="h-screen flex justify-center items-center text-primary text-5xl font-black">
            Success!
          </div>
        ) : (
          <Formik
            initialValues={{
              title: toEdit ? toEdit.title : '',
              category: toEdit ? toEdit.category : 'feature',
              description: toEdit ? toEdit.description : '',
              status: toEdit ? toEdit.status : '',
              isDeleteButton: false,
            }}
            validationSchema={Yup.object({
              title: Yup.string()
                .max(50, 'Must be 50 characters or less')
                .required('Oops required...'),
              description: Yup.string().required("Can't be empty"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                if (!isDeleteButton) {
                  !toEdit && addProductRequest(values)
                  toEdit && editProductRequest(values)
                } else if (isDeleteButton) {
                  removeFeedbackRequest()
                }
                // alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
              }, 400)
            }}
          >
            <Form className="relative bg-white p-8 rounded-lg my-12">
              <div className="bg-gradient-to-tr from-gradient-1 v via-primary to-gradient-2  rounded-full p-5 absolute -top-7 left-7 text-light-100">
                <PlusIcon className="h-4" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold my-6">
                {toEdit ? `Edit ${toEdit.title}` : 'Create New Feedback'}
              </h1>
              <div className="my-12 ">
                <label className="font-bold text-sm md:text-lg" htmlFor="title">
                  Feedback Title
                </label>
                <p className="mb-4 text-dark-100 text-xs md:text-lg max-w-sm">
                  Add a short, descriptive headline
                </p>
                <Field
                  className=" bg-light-100 p-2 active:outline-none focus:outline-none w-full rounded"
                  name="title"
                  type="text"
                />
                <ErrorMessage
                  component="div"
                  className="text-[red] pl-2 text-sm"
                  name="title"
                />
              </div>

              <div className="my-12 ">
                <label
                  className="font-bold text-sm md:text-lg"
                  htmlFor="category"
                >
                  Category
                </label>
                <p className="mb-4 text-dark-100 text-xs md:text-lg max-w-sm">
                  Choose a category for your feedback
                </p>

                <Field
                  className=" bg-light-100 p-2 active:outline-none focus:outline-none w-full rounded"
                  as="select"
                  name="category"
                >
                  <option value="feature">Feature</option>
                  <option value="ui">UI</option>
                  <option value="ux">UX</option>
                  <option value="enhancement">Enhancement</option>
                  <option value="bug">Bug</option>
                </Field>
                <ErrorMessage
                  component="div"
                  className="text-[red] pl-2 text-sm"
                  name="category"
                />
              </div>
              {toEdit && (
                <div className="my-12 ">
                  <label
                    className="font-bold text-sm md:text-lg"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <p className="mb-4 text-dark-100 text-xs md:text-lg max-w-sm">
                    Change feature state
                  </p>

                  <Field
                    className=" bg-light-100 p-2 active:outline-none focus:outline-none w-full rounded"
                    as="select"
                    name="status"
                  >
                    <option value="suggestion">Suggestion</option>
                    <option value="planned">Planned</option>
                    <option value="in-progress">In progress</option>
                    <option value="live">Live</option>
                  </Field>
                  <ErrorMessage
                    component="div"
                    className="text-[red] pl-2 text-sm"
                    name="status"
                  />
                </div>
              )}

              <div className="my-12 ">
                <label
                  className="font-bold text-sm md:text-lg"
                  htmlFor="description"
                >
                  Feedback Detail
                </label>
                <p className="mb-4 text-dark-100 text-xs md:text-lg max-w-sm">
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <Field
                  className=" bg-light-100 p-2 pb-20 active:outline-none focus:outline-none w-full rounded"
                  name="description"
                  type="textfield"
                />
                <ErrorMessage
                  component="div"
                  className="text-[red] pl-2 text-sm"
                  name="description"
                />
              </div>

              <div className="flex items-center justify-between">
                {toEdit && (
                  <button
                    onClick={() => setIsDeleteButton(true)}
                    type="submit"
                    className="px-3 py-2 bg-gradient-2 text-white rounded-lg"
                  >
                    Delete
                  </button>
                )}
                <div className="flex justify-end w-full space-x-2">
                  <button
                    onClick={() => router.back()}
                    className="px-3 py-2 bg-dark-200 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-2 bg-primary text-white rounded-lg"
                    type="submit"
                  >
                    {toEdit ? 'Save changes' : 'Add Feedback'}
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </main>
  )
}

export default ProductForm
