import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
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

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAkScQSnRYfRkZ5ckvItBfXSs2d5t5ovgc",
  authDomain: "electivaiv-eae63.firebaseapp.com",
  projectId: "electivaiv-eae63",
  storageBucket: "electivaiv-eae63.appspot.com",
  messagingSenderId: "934179824741",
  appId: "1:934179824741:web:4e159276d9a7c6fe41528c"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// Tareas
export const saveTask = (title, description) =>
  addDoc(collection(db, "tarea"), { title, description });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tarea"), callback);

export const deleteTask = (id) => deleteDoc(doc(db, "tarea", id));

export const getTask = (id) => getDoc(doc(db, "tarea", id));

export const updateTask = (id, newFields) => updateDoc(doc(db, "tarea", id), newFields);

export const getTasks = () => getDocs(collection(db, "tarea"));

// Pendientes
export const savePendiente = (title, description) =>
  addDoc(collection(db, "pendientes"), { title, description });

export const onGetPendientes = (callback) =>
  onSnapshot(collection(db, "pendientes"), callback);

export const deletePendiente = (id) => deleteDoc(doc(db, "pendientes", id));

export const getPendiente = (id) => getDoc(doc(db, "pendientes", id));

export const updatePendiente = (id, newFields) => updateDoc(doc(db, "pendientes", id), newFields);

export const getPendientes = () => getDocs(collection(db, "pendientes"));

// Eventos
export const saveEvento = (title, description) =>
  addDoc(collection(db, "eventos"), { title, description });

export const onGetEventos = (callback) =>
  onSnapshot(collection(db, "eventos"), callback);

export const deleteEvento = (id) => deleteDoc(doc(db, "eventos", id));

export const getEvento = (id) => getDoc(doc(db, "eventos", id));

export const updateEvento = (id, newFields) => updateDoc(doc(db, "eventos", id), newFields);

export const getEventos = () => getDocs(collection(db, "eventos"));
