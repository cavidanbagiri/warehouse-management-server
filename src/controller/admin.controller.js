
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
        console.log('Fetch Categories and Variants Error : ', err);
        next(err)
      })
    )
  }

  // Create Product
  static createProduct = async (req, res, next) => {
    const data = req.body;
    tryCatch(
      await AdminServiceCreateProduct.createProduct(data)
      .then((respond)=>{
        return res.send(respond);
      })
      .catch((err)=>{
        console.log('Create product Error : ', err);
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
        console.log('Create Categories Error : ', err);
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
        console.log('Fetch Categories Error : ', err);
        next(err)
      })
    )

  }

}

module.exports = AdminController;