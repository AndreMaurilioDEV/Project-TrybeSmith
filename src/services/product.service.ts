import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';
import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';

async function validationsProductName(product: Product) : Promise<ServiceResponse<Product>> {
  if (!product.name) {
    return { status: 'INVALID_DATA', data: { message: '"name" is required' } };
  }
    
  if (typeof product.name !== 'string') {
    return { status: 'UNPROCESSABLE_ENTITY', data: { message: '"name" must be a string' } };
  }

  if (typeof product.name !== 'string' || product.name.length <= 3) {
    return { status: 'UNPROCESSABLE_ENTITY',
      data: { 
        message: '"name" length must be at least 3 characters long' }, 
    };
  }

  return { status: 'SUCCESSFUL', data: product };
}

async function validationsProductPrice(product: Product) : Promise<ServiceResponse<Product>> {
  if (!product.price) {
    return { status: 'INVALID_DATA', data: { message: '"price" is required' } };
  }
    
  if (typeof product.price !== 'string') {
    return { status: 'UNPROCESSABLE_ENTITY', data: { message: '"price" must be a string' } };
  }

  if (typeof product.price !== 'string' || product.price.length < 3) {
    return { status: 'UNPROCESSABLE_ENTITY',
      data: { 
        message: '"price" length must be at least 3 characters long' }, 
    };
  }

  return { status: 'SUCCESSFUL', data: product };
}

async function validationsUserId(product: Product) : Promise<ServiceResponse<Product>> {
  if (!product.userId) {
    return { status: 'INVALID_DATA', data: { message: '"userId" is required' } };
  }
    
  if (typeof product.userId !== 'number') {
    return { status: 'UNPROCESSABLE_ENTITY',
      data: { 
        message: '"userId" must be a number' }, 
    };
  }
    
  const findUser = await ProductModel.findOne({ where: { userId: product.userId } });
  if (!findUser) {
    return { status: 'UNPROCESSABLE_ENTITY', data: { message: '"userId" not found' } };
  }

  return { status: 'SUCCESSFUL', data: product };
}

async function createProduct(product: Product) : Promise<ServiceResponse<Product>> {
  const nameValidation = await validationsProductName(product);
  const priceValidation = await validationsProductPrice(product);
  const userIdValidation = await validationsUserId(product);
  if (priceValidation.status !== 'SUCCESSFUL') {
    return priceValidation;
  }
  if (nameValidation.status !== 'SUCCESSFUL') {
    return nameValidation;
  }
  if (userIdValidation.status !== 'SUCCESSFUL') {
    return userIdValidation;
  }
  const newProduct = await ProductModel.create(product);
  const responseService: ServiceResponse<Product> = { 
    status: 'SUCCESSFUL', data: newProduct.dataValues,
  };
  return responseService;
}

async function listProducts() : Promise<ProductSequelizeModel[]> {
  const products = await ProductModel.findAll();
  return products;
}

export default {
  createProduct,
  listProducts,
};
