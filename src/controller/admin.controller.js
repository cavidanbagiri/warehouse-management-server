
const { 
  AdminServiceFetchProduct,
  AdminServiceFetchCategoriesAndVariants,
  AdminServiceCreateCategory,
  AdminServiceCreateVariant,
  AdminServiceCreateProduct} = require( '../services/admin.service');

const tryCatch = require('../utils/tryCatch');

class AdminController {

  // Fetch Products
  static fetchProducts = (req, res, next) => {
    tryCatch(
      AdminServiceFetchProduct.fetchProducts()
      .then((respond)=>{
        return res.status(200).send(respond);
      })
      .catch((err)=>{
        next(new Error("Fech product error : ", err))
      })
    )
  }

  // Fetch Categories and Variants
  static getCategoriesAndVariants = async  (req, res, next) => {
    tryCatch(
      await AdminServiceFetchCategoriesAndVariants.getCategoriesAndVariants()
      .then((respond)=>{
        return res.status(200).send(respond);
      })
      .catch((err)=>{
        next(new Error("Fetch categories and variants error : ", err))
      })
    )
  }

  // Create Product
  static createProduct = async (req, res, next) => {
    let product_data = JSON.parse(req.body.product_data)
    let product_variants = JSON.parse(req.body.product_variants)
    const file = req.file;
    
    tryCatch(
      await AdminServiceCreateProduct.createProduct(product_data, product_variants, file)
      .then((respond)=>{
        return res.status(201).send(respond);
      })
      .catch((err)=>{
        next(new Error("Create product error : ", err))
      })
    )
  }

  //Create Categories 
  static createCategory = async (req, res, next) => {
    const data = req.body;
    tryCatch(
      await AdminServiceCreateCategory.createCategory(data)
      .then((respond)=>{
        return res.status(201).send(respond);
      })
      .catch((err)=>{
        next(new Error("Create category error : ", err))
      })
    )

  }

  //Create Categories 
  static createVariant = async (req, res, next) => {
    const data = req.body;
    tryCatch(
      await AdminServiceCreateVariant.createVariant(data)
      .then((respond)=>{
        return res.status(201).send(respond);
      })
      .catch((err)=>{
        next(new Error("Create Variant error : ", err))
      })
    )

  }

}

module.exports = AdminController;