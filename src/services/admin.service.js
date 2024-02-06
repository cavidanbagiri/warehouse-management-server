

const { CategoryModel, VariantsModel } = require('../../models/index');

class AdminServiceFetchCategoriesAndVariants {

  static getCategoriesAndVariants = async  (req, res, next) => {
    
    // Fetch All Categories For Alphabetic category_name
    const categories = await CategoryModel.findAll({
      attributes:[
        "id", "category_name"
      ],
      order:["category_name"]
    });

    // Fetch All Categories For Alphabetic variant_name
    const variants = await VariantsModel.findAll({
      attributes:[
        "id", "variant_name"
      ],
      order:["variant_name"]
    });

    // Combine Results
    const return_data = {
      categories: [...categories],
      variants: [...variants]
    }
    
    return return_data;
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