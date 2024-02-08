
const { 
  AdminServiceFetchCategoriesAndVariants,
  AdminServiceCreateCategory,
  AdminServiceCreateVariant,
  AdminServiceCreateProduct} = require( '../services/admin.service');

const tryCatch = require('../utils/tryCatch');

class AdminController {

  // Fetch Categories and Variants
  static getCategoriesAndVariants = async  (req, res, next) => {
    tryCatch(
      await AdminServiceFetchCategoriesAndVariants.getCategoriesAndVariants()
      .then((respond)=>{
        return res.send(respond);
      })
      .catch((err)=>{
        next(err)
      })
    )
  }

  // Create Product
  static createProduct = async (req, res, next) => {
    let product_data = JSON.parse(req.body.product_data)
    let product_variants = JSON.parse(req.body.product_variants)
    const file = req.file;
    
    // console.log('data : ', product_data, ' ', product_variants);
    
    tryCatch(
      await AdminServiceCreateProduct.createProduct(product_data, product_variants, file)
      .then((respond)=>{
        return res.send(respond);
      })
      .catch((err)=>{
        next(err)
      })
    )
  }

  //Create Categories 
  static createCategory = async (req, res, next) => {
    const data = req.body;
    tryCatch(
      await AdminServiceCreateCategory.createCategory(data)
      .then((respond)=>{
        return res.status(200).send(respond);
      })
      .catch((err)=>{
        next(err)
      })
    )

  }

  //Create Categories 
  static createVariant = async (req, res, next) => {
    const data = req.body;
    tryCatch(
      await AdminServiceCreateVariant.createVariant(data)
      .then((respond)=>{
        return res.send(respond);
      })
      .catch((err)=>{
        next(err)
      })
    )

  }

}

module.exports = AdminController;