// src/lib/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAxmnW1yTm4FXOkGYhf_3CQWwq1I0bJEU4",
  authDomain: "debatex-1efa6.firebaseapp.com",
  databaseURL: 'https://debatex-1efa6-default-rtdb.firebaseio.com/',
  projectId: "debatex-1efa6",
  storageBucket: "debatex-1efa6.appspot.com",
  messagingSenderId: "296221860840",
  appId: "1:296221860840:web:b50d3de7bc9ece720dba5d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
