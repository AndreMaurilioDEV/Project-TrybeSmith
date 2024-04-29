import { Router } from 'express';
import productController from '../controllers/product.controller';

const productRouter = Router();

productRouter.post('/products', productController.createProductController);
productRouter.get('/products', productController.listProducts);

export default productRouter;
