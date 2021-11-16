// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics'
import firebase from 'firebase/app'

import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCHvYHa9kF1nItMxGeTwZeZMBU8qIZP-8o',
  authDomain: 'product-feedback-293e0.firebaseapp.com',
  projectId: 'product-feedback-293e0',
  storageBucket: 'product-feedback-293e0.appspot.com',
  messagingSenderId: '435685848389',
  appId: '1:435685848389:web:b2e1824ec4df5dd7bdba2c',
  measurementId: 'G-4E37T8WLQ4',
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
