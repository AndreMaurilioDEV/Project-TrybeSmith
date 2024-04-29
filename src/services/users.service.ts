import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';

type ListType = {
  username: string,
  productIds: number[]
};

async function listUsers() : Promise<ListType[]> {
  const users = await UserModel.findAll({
    include: [{
      model: ProductModel,
      as: 'productIds',
      attributes: ['id'],
      required: true,
    }],
  });
  const transformedUsers = users.map((user) => {
    const teste = user.dataValues.productIds;
    const numbers = Array.isArray(teste) ? teste.map((id) => id) : []; 
    const productIds: number[] = numbers.map((idUser) => idUser.id);
    return {
      username: user.dataValues.username,
      productIds,
    };
  });
  return transformedUsers;
}

export default {
  listUsers,
};
