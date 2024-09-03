'use client'
import { useAuth } from '@clerk/nextjs'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { doc, getDoc } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAxmnW1yTm4FXOkGYhf_3CQWwq1I0bJEU4",
    authDomain: "debatex-1efa6.firebaseapp.com",
    databaseURL: 'https://debatex-1efa6-default-rtdb.firebaseio.com/',
    projectId: "debatex-1efa6",
    storageBucket: "debatex-1efa6.appspot.com",
    messagingSenderId: "296221860840",
    appId: "1:296221860840:web:b50d3de7bc9ece720dba5d"
  };

// Connect to your Firebase app
export const app = initializeApp(firebaseConfig)
// Connect to your Firestore database
export const db = getFirestore(app)
// Connect to Firebase auth
export const auth = getAuth(app)

// Remove this if you do not have Firestore set up
// for your Firebase app
// const getFirestoreData = async () => {
//   const docRef = doc(db, 'example', 'example-document')
//   const docSnap = await getDoc(docRef)
//   if (docSnap.exists()) {
//     console.log('Document data:', docSnap.data())
//   } else {
//     // docSnap.data() will be undefined in this case
//     console.log('No such document!')
//   }
// }

// export default function FirebaseUI() {
//   const { getToken, userId } = useAuth()

//   // Handle if the user is not signed in
//   // You could display content, or redirect them to a sign-in page
//   if (!userId) {
//     return <p>You need to sign in with Clerk to access this page.</p>
//   }

//   const signIntoFirebaseWithClerk = async () => {
//     const token = await getToken({ template: 'integration_firebase' })

//     const userCredentials = await signInWithCustomToken(auth, token || '')
//     // The userCredentials.user object can call the methods of
//     // the Firebase platform as an authenticated user.
//     console.log('User:', userCredentials.user)
//   }

//   return (
//     <main style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
//       <button onClick={signIntoFirebaseWithClerk}>Sign in</button>

//       {/* Remove this button if you do not have Firestore set up */}
//       <button onClick={getFirestoreData}>Get document</button>
//     </main>
//   )
// }