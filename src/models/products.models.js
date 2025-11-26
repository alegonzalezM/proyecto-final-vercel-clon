import { db } from "../data/data.js";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

export async function obtenerProductos() {
    try {
      const querySnapshot = await getDocs(collection(db, "productos")); //obtiene * documentos de la coleccion productos
      // console.log("Snap completa: ", querySnapshot);
      const productos = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        productos.push({ ...doc.data(), id: doc.id });
      });
     return productos;
    } catch (error) {
    console.error("Error en obtenerProductos:", error);
    throw error;
  }
};
// obtenerProductos();

export async function obtenerProducto(id) {
    try {
      const docRef = doc(db, "productos", id); 
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log( "Snap data: ", docSnap);
        // console.log("Document ID: ", docSnap.id);
        // console.log("Document data:", docSnap.data());
          return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log("Producto no encontrado o inexistente");
        return null;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

// obtenerProducto(id);


export function agregarProducto(producto) {
  return new Promise(async (res, rej) => {
    try {
    const docRef = doc(db, "productos", producto.id);
    await setDoc(docRef, producto);
      //en vez de setDoc uso addDoc p'q firebase asigne id automatica/ es:  addDoc(collection) → ID automático o setDoc(doc(id)) → ID q elijo yo
      console.log("Id ", docRef.id, "Producto", docRef);
      res({ ...producto, id: docRef.id });
    } catch (error) {
      console.log(error);
      rej(error);
    }
  });
}

// export function actualizarProducto(id, producto) {
//   return new Promise(async (res, rej) => {
//     try {
//       await updateDoc(doc(db, "productos",  id ) ,{     //actualiza solo los campos q se modifiquen
//         ...producto //desestructurado xq sino el prod nuevo lo agrega como 1 clave del original en vez de modificarlo
//       })
//       console.log("Producto actualizado");
//       res({}); //resolucion vacia xq no necesito devolver nada, producto vacio p' q no se rompa
//     } catch (error) {
//       console.log(error);
//       rej(error);
//     }
//   });
// }

export function eliminarProducto(id) {
  return new Promise(async (res, rej) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      console.log("producto eliminado");
      res(); //tampoco devuelve nada xq borra
    } catch (error) {
      console.log("No se pudo eliminar ", error);
      rej(error);
    }
  });
}

//  eliminarProducto("qPNEUS7ycVsT1lkAEbhY" );

export async function editarProducto(id, datos) {
  try {
    const docRef = doc(db, "productos", id);
    await updateDoc(docRef, {...datos});

    console.log("Producto actualizado correctamente");
    return { id, ...datos };

  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
}

// actualizarProducto("NmZ04YxJqHGeNXBQVXjH")
