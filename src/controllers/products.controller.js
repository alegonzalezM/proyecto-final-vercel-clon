import * as productsService from "../services/products.service.js";
import { actualizarProductoService } from "../services/products.service.js"; 


export const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProductsService();

    if (!products) {
      return res.status(400).json({ message: "Error al obtener productos" });
    }

    console.log("en controllers");
    return res.status(200).json(products);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};


export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Controller - id recibido:", id);

    if (id) {
      const product = await productsService.getProductByIdService(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } else {
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProduct = async (req, res) => {
  try{
    const product = req.body;
    const newProduct = await productsService.createProductService(product);
    res.status(200).json(newProduct);
} catch(error) {
   res.sendStatus(500)
}}

export const deleteProduct = async (req, res) => {
  try{
    const id = req.params.id;
    if(id){
      await productsService.deleteProductService(id)
      res.status(200).json({ message: "Producto eliminado" });
    } else {
        res.status(400).json(error)
    }
   } catch(error){
        res.sendStatus(500)
  }}

  export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = req.body;

    const resultado = await actualizarProductoService(id, producto);

    res.status(200).json(resultado);

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// export const editProduct = async (req, res) => {
//   try{
//     const id= req.params.id;
//     const product = req.body;
//     if(!id){
//      return  res.status(400).json({message:"El ID es requerido"})
//     }
//      if (!product || (Object.keys(product).length === 0)) {
//       return res.status(400).json({ message: "Debe enviar datos para actualizar" });
//     }
//     if(id&&product){
//       const newProduct= await productsService.actualizarProductoService(id, product);
//       res.status(200).json(newProduct);
//     } else {
//       res.status(400).json({message:"No se pudo modificar"})
//     }} catch(error){
//     res.sendStatus(500)
//   }}