

const { CategoryModels, VariantsModels, VariantsValueModels, ProductModels, ProductVariantModels } = require('../../models/index');

class AdminServiceFetchCategoriesAndVariants {

  static getCategoriesAndVariants = async  (req, res, next) => {
    
    // Fetch All Categories For Alphabetic category_name
    const categories = await CategoryModels.findAll({
      attributes:[
        "id", "category_name"
      ],
      order:["category_name"]
    });

    // Fetch All Categories For Alphabetic variant_name
    const variants = await VariantsModels.findAll({
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

class AdminServiceCreateProduct {
  
  // Create Product
  static async createProduct(data){

    const {product_data, product_variants} = data;
    
    // 1 - Create Product
    const product = await this.#createProductInstance(product_data);

    // 2 - Create Variant Value Model
    await this.#createVariantValue(product, product_variants);

    return product;
  }

  //  Create Product Instance
  static async #createProductInstance(product_data){
    const product = await ProductModels.create({
      categoryId: product_data.category_id,
      product_name: product_data.product_name,
      description: product_data.description,
      sku:product_data.sku,
      price:product_data.price,
      stock:product_data.stock
    });
    return product;
  }

  // Save All Variants Value to VariantsValueModel
  static async #createVariantValue(product, product_variants){
    for(let i of product_variants){
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