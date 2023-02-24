// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore, collection,doc,addDoc,getDoc,getDocs,updateDoc,deleteDoc} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfAVECexZWGi8QGkcBIwcsiAbke_L2UVQ",
  authDomain: "react-coder-736f0.firebaseapp.com",
  projectId: "react-coder-736f0",
  storageBucket: "react-coder-736f0.appspot.com",
  messagingSenderId: "724993209475",
  appId: "1:724993209475:web:435c9b87a9feb1743717b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

export const cargarBDD = async () =>{
  const promise = await fetch('./json/productos.json')
  const productos = await promise.json()
  productos.forEach(async (element) => {
      await addDoc(collection(db,"productos"),{
        nombre:element.nombre,
        marca:element.marca,
        modelo:element.modelo,
        idCategoria:element.idCategoria,
        stock:element.stock,
        precio:element.precio,
        img:element.img

      })
  });
}

export const getProductos = async() => {

  const productos = await getDocs(collection(db,"productos"))

  const items = productos.docs.map(prod => {

    return {...prod.data(), id: prod.id}

})

 return items

}

export const getProducto = async(id) =>{
    const producto = await getDoc(doc(db,"productos",id))
    const item = {...producto.data(), id: producto.id}
    return item
}

export const updateProducto = async(id, info) => {
  await updateDoc(doc(db, "productos", id), info)
}

export const deleteProducto = async(id) => {
  await deleteDoc(doc(db, "productos", id))
}

export const createOrdenCompra = async(cliente, productos,precioTotal, fecha) => {
  const ordenCompra = await addDoc(collection(db, "ordenCompra"), {
      datosCliente: cliente,
      productos: productos,
      precioTotal: precioTotal, 
      fecha: fecha
  })
  return ordenCompra
}

export const getOrdenCompra = async(id) => {
  const ordenCompra = await getDoc(doc(db, "ordenCompra", id))
  const oCompra = {...ordenCompra.data(), id: ordenCompra.id}
  return oCompra
}