import { Request, Response } from 'express';
import productService from '../services/product.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function createProductController(req: Request, res: Response): Promise<Response> {
  const { name, price, userId } = req.body;
  const newProduct = await productService.createProduct({ name, price, userId }); 
  if (newProduct.status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(newProduct.status)).json(newProduct.data);
  }
  return res.status(201).json(newProduct.data);
}

async function listProducts(_req: Request, res: Response): Promise<Response> {
  try {
    const products = await productService.listProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({ message: 'Nenhum produto encontrado' });
  }
}

export default {
  createProductController,
  listProducts,
};