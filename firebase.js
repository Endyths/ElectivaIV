// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkScQSnRYfRkZ5ckvItBfXSs2d5t5ovgc",
  authDomain: "electivaiv-eae63.firebaseapp.com",
  projectId: "electivaiv-eae63",
  storageBucket: "electivaiv-eae63.appspot.com",
  messagingSenderId: "934179824741",
  appId: "1:934179824741:web:4e159276d9a7c6fe41528c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();


export const saveTask = (title, description) =>
  addDoc(collection(db, "tarea"), { title, description });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tarea"), callback);


export const deleteTask = (id) => deleteDoc(doc(db, "tarea", id));

export const getTask = (id) => getDoc(doc(db, "tarea", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tarea", id), newFields);

export const getTasks = () => getDocs(collection(db, "tarea"));