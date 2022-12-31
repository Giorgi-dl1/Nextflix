// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBTgRnFtuI6f7x_A_GFWSs8AgkacVatzWY',
  authDomain: 'nextflix-b83af.firebaseapp.com',
  projectId: 'nextflix-b83af',
  storageBucket: 'nextflix-b83af.appspot.com',
  messagingSenderId: '15600409839',
  appId: '1:15600409839:web:6e68db7fd3c9a2a1ca0f1a',
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
