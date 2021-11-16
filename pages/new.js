import Layout from '@/components/atoms/Layout'
import Back from '@/components/atoms/Back'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { PlusIcon } from '@heroicons/react/solid'
import * as Yup from 'yup'

function New() {
  return (
    <main className=" bg-light-100 w-full h-full pb-10">
      <div className="max-w-sm md:max-w-2xl mx-auto">
        <Back />
        <Formik
          initialValues={{ title: '', category: '', description: '' }}
          validationSchema={Yup.object({
            title: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            category: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            description: Yup.string().required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          <Form className="relative bg-white p-4 rounded-lg my-12 ">
            <div className="bg-gradient-to-tr from-gradient-1 v via-primary to-gradient-2  rounded-full p-5 absolute -top-7 left-7 text-light-100">
              <PlusIcon className="h-4" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold my-6">
              Create New Feedback
            </h1>
            <div className="my-4">
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
              {/* <ErrorMessage name="title" /> */}
            </div>

            <div className="my-4">
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
                name="category"
                type="text"
              />
              {/* <ErrorMessage name="category" /> */}
            </div>

            <div className="my-4">
              <label
                className="font-bold text-sm md:text-lg"
                htmlFor="description"
              >
                Feedback Detail
              </label>
              <p className="mb-4 text-dark-100 text-xs md:text-lg max-w-sm">
                Include any specific comments on what should be improved, added,
                etc.
              </p>
              <Field
                className=" bg-light-100 p-2 pb-20 active:outline-none focus:outline-none w-full rounded"
                name="description"
                type="textfield"
              />
              {/* <ErrorMessage name="description" /> */}
            </div>

            <div className="flex flex-col sm:flex-row justify-end sm:space-x-4 space-y-4 sm:space-y-0 mt-6 mb-2">
              <button className="px-3 py-2 bg-dark-200 text-white rounded-lg">
                Cancel
              </button>
              <button
                className="px-3 py-2 bg-primary text-white rounded-lg"
                type="submit"
              >
                Add Feedback
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  )
}

export default New
