

const { CategoryModel, VariantsModel } = require('../../models/index');

class AdminServiceFetchCategoriesAndVariants {

  static getCategoriesAndVariants = async  (req, res, next) => {
    const categories = await CategoryModel.findAll();
    const variants = await VariantsModel.findAll();
    return categories;
  }

}


class AdminServiceCreateCategory{
  static createCategory = async (data) => {
    const result = await CategoryModel.create({
      category_name: data.category_name
    })
    return result;
  }
}

class AdminServiceCreateVariant{
  static createVariant = async (data) => {
    const result = await VariantsModel.create({
      variant_name: data.variant_name
    })
    return result;

  }
}

module.exports = {
  AdminServiceFetchCategoriesAndVariants,
  AdminServiceCreateCategory,
  AdminServiceCreateVariant
}