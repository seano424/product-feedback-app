import { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useSession } from 'next-auth/react'
import { db } from '../../firebase'
import { useDispatch } from 'react-redux'
import DeleteModal from '@/components/DeleteModal'
import {
  getDocs,
  doc,
  getDoc,
  collection,
  setDoc,
  serverTimestamp,
} from '@firebase/firestore'
import ProductForm from '@/components/ProductForm'

function Edit({ product }) {
  const { data: session } = useSession()

  const toEdit = JSON.parse(product)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch()

  const editProductRequest = async (values) => {
    if (loading) return
    if (!session) signIn()
    if (!session) return
    setLoading(true)
    const productId = router.query.id
    try {
      const productRequest = {
        timestamp: serverTimestamp(),
        ...values,
        uid: session.user.uid,
      }
      console.log('edit form', values, session, productRequest)
      setLoading(false)
      setSuccess(true)
      await setDoc(doc(db, 'productRequests', productId), {
        ...productRequest,
      })

      setTimeout(() => {
        setSuccess(false)
        router.push('/')
      }, 1400)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <DeleteModal page="edit" />
      <ProductForm
        toEdit={toEdit}
        success={success}
        editProductRequest={editProductRequest}
      />
    </>
  )
}

export default Edit

export async function getStaticPaths() {
  // Return a list of possible value for id
  const snapshot = await getDocs(collection(db, 'productRequests'))
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the product using params.id
  const docRef = doc(db, 'productRequests', params.id)
  const docSnap = await getDoc(docRef)
  return {
    props: {
      id: docSnap.id,
      product: JSON.stringify(docSnap.data()),
    },
  }
}
