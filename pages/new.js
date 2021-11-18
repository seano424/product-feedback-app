import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { signIn, useSession } from 'next-auth/react'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { selectProductReviews } from '@/redux/features/productReview/productReviewSlice'
import ProductForm from '@/components/ProductForm'

function New() {
  const { data: session } = useSession()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const addProductRequest = async (values) => {
    if (loading) return
    if (!session) signIn()
    if (!session) return
    setLoading(true)
    try {
      const productRequest = {
        timestamp: serverTimestamp(),
        ...values,
        uid: session.user.uid,
        status: 'planned',
      }
      console.log('new form', values, session, productRequest)
      setLoading(false)
      setSuccess(true)
      const docRef = await addDoc(collection(db, 'productRequests'), {
        ...productRequest,
      })
      console.log('new doc added with ID', docRef.id)

      setTimeout(() => {
        setSuccess(false)
        router.push('/')
      }, 1400)
    } catch (error) {
      console.log(error)
    }
  }

  return <ProductForm success={success} addProductRequest={addProductRequest} />
}

export default New
