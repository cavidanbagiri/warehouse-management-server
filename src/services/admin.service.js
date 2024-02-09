

const { CategoryModels, VariantsModels, VariantsValueModels, ProductModels, ProductVariantModels, ProductImagesModels, ImageModels } = require('../../models/index');

const s3 = require('../storage/storage');

class AdminServiceFetchCategoriesAndVariants {

  static getCategoriesAndVariants = async (req, res, next) => {

    // Fetch All Categories For Alphabetic category_name
    const categories = await CategoryModels.findAll({
      attributes: [
        "id", "category_name"
      ],
      order: ["category_name"]
    });

    // Fetch All Categories For Alphabetic variant_name
    const variants = await VariantsModels.findAll({
      attributes: [
        "id", "variant_name"
      ],
      order: ["variant_name"]
    });

    // Combine Results
    const return_data = {
      categories: [...categories],
      variants: [...variants]
    }

    return return_data;
  }

}

class AdminServiceCreateProduct {

  // Create Product
  static async createProduct(product_data, product_variants, file) {

    // If File is empty
    if(file){

      // 0 - Upload Image
      const uploading_images = await this.#uploadImage(file);
  
      // 1 - Create Product
      const product = await this.#createProductInstance(product_data);
  
      // 2 - Create Variant Value Model
      await this.#createVariantValue(product, product_variants);
  
      // 4 - Create product Image Instance
      await this.#createProductImageInstance(uploading_images, product);
      
      return product;
    }
    else{
      // 1 - Create Product
      const product = await this.#createProductInstance(product_data);
      // 2 - Create Variant Value Model
      await this.#createVariantValue(product, product_variants);
    }

  }

  // Upload Image To Bucket and take location
  static async #uploadImage(file) {
    const upload = await s3.Upload({
      buffer: file.buffer
    },
      '/omarket_images'
    )
    const res = await this.#createImageInstance(upload.Location);
    return res;
  }

  // Create instance Image to models
  static async #createImageInstance(image_destination) {
    const res = await ImageModels.create({
      image_url: image_destination
    })
    return res;
  }

  //  Create Product Instance
  static async #createProductInstance(product_data) {
    const product = await ProductModels.create({
      categoryId: product_data.category_id,
      product_name: product_data.product_name,
      description: product_data.description,
      sku: product_data.sku,
      price: product_data.price,
      stock: product_data.stock
    });
    return product;
  }

  // Save All Variants Value to VariantsValueModel
  static async #createVariantValue(product, product_variants) {
    for (let i of product_variants) {
      if(i.variant_id !== ''){
        // Create Variant Value
        const variant_value = await VariantsValueModels.create({
          variantsId: i.variant_id,
          variant_value: i.value
        })
        // Insert product and variant value in the product_variants model
        const product_variant = await ProductVariantModels.create({
          productId: product.id,
          variantsValueId: variant_value.id
        })
      }
    }
  }

  // Create ProductImage Instance
  static async #createProductImageInstance(image, product) {
    const res = await ProductImagesModels.create({
      imgId: image.id,
      productId: product.id
    })
    return res;
  }

}

class AdminServiceCreateCategory {
  static createCategory = async (data) => {
    const result = await CategoryModels.create({
      category_name: data.category_name
    })
    return result;
  }
}

class AdminServiceCreateVariant {
  static createVariant = async (data) => {
    const result = await VariantsModels.create({
      variant_name: data.variant_name
    })
    return result;

  }
}

module.exports = {
  AdminServiceFetchCategoriesAndVariants,
  AdminServiceCreateCategory,
  AdminServiceCreateVariant,
  AdminServiceCreateProduct
}