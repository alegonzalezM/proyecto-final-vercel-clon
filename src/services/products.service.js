import { editProduct } from "../controllers/products.controller.js";
import {doc, getDoc, updateDoc} from 'firebase/firestore'
import {db} from '../data/data.js'
import {
  editarProducto,
  agregarProducto,
  eliminarProducto,
  obtenerProducto,
  obtenerProductos,
} from "../models/products.models.js";

export const getAllProductsService = async () => {
  try {
    const products = await obtenerProductos();
    console.log("SERVICE:", products);
    return products;
  } catch (error) {
    console.error("Error en service:", error);
    throw error;
  }
};

export const getProductByIdService = async (id) => {
  console.log("Service - id:", id);
  try {
    const product = await obtenerProducto(id);
    console.log(product);
    return product;
  } catch (error) {
    throw error;
  }
};

export const createProductService = async (product) => {
  return(
    new Promise (async(res,rej)=> {
      try{
        const newProduct = await agregarProducto(product)
           res(newProduct)
      } catch (error){
      rej(error)}}))
};

export const deleteProductService = async (id) => {
      try{
        await eliminarProducto(id)
        return { message: "Producto eliminado correctamente" };
      } catch(error){
          return { message: "No pudo eliminarse", error };
    }}
  

export const actualizarProductoService = async (id, producto) => {
  try {
    if (!producto || Object.keys(producto).length === 0) {
      throw new Error("El cuerpo está vacío. Nada para actualizar.");
    }
    const docRef = doc(db, "productos", id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap)

    if (!docSnap.exists()) {
      throw new Error("El producto no existe");
    }
    await updateDoc(docRef, producto);

    return {
      success: true,
      message: "Producto actualizado correctamente",
      id,
      data: producto
    };

  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};
