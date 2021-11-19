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
import styles from './ProductForm.module.css'

function ProductForm({
  toEdit,
  success,
  addProductRequest,
  editProductRequest,
}) {
  const [isDeleteButton, setIsDeleteButton] = useState(false)
  const [isCancel, setIsCancel] = useState(false)
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
    <main className={styles.main}>
      <div className={styles.container}>
        <Back />
        {success ? (
          <div className={styles.success}>Success!</div>
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
                  if (!isCancel) {
                    !toEdit && addProductRequest(values)
                    toEdit && editProductRequest(values)
                  } else if (isCancel) {
                    router.back()
                  }
                } else if (isDeleteButton) {
                  removeFeedbackRequest()
                }
                // alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
              }, 400)
            }}
          >
            <Form className={styles.form}>
              <div className={styles.plus}>
                <PlusIcon className="icon" />
              </div>
              <h1 className="text-2xl mt-2">
                {toEdit ? `Edit ${toEdit.title}` : 'Create New Feedback'}
              </h1>
              <div className="my-4">
                <label htmlFor="title">Feedback Title</label>
                <p className={styles.subtitle}>
                  Add a short, descriptive headline
                </p>
                <Field className={styles.field} name="title" type="text" />
                <ErrorMessage
                  component="div"
                  className="text-[red] pl-2 text-sm"
                  name="title"
                />
              </div>

              <div className="my-4">
                <label htmlFor="category">Category</label>
                <p className={styles.subtitle}>
                  Choose a category for your feedback
                </p>

                <Field className={styles.field} as="select" name="category">
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
                <div className="my-4">
                  <label htmlFor="status">Status</label>
                  <p className={styles.subtitle}>Change feature state</p>

                  <Field className={styles.field} as="select" name="status">
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

              <div className="my-4">
                <label htmlFor="description">Feedback Detail</label>
                <p className={styles.subtitle}>
                  Include any specific comments on what should be improved,
                  added, etc.
                </p>
                <Field
                  className={`${styles.field} h-28`}
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
                    className="bg-gradient-2 button"
                  >
                    Delete
                  </button>
                )}
                <div className="flex justify-end w-full space-x-2">
                  <button
                    onClick={() => setIsCancel(true)}
                    className="bg-dark-200 button"
                  >
                    Cancel
                  </button>
                  <button className="bg-primary button" type="submit">
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
