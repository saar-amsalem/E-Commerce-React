const Product = require("../models/Product");
const genericService = require("./DBService")
const productService = genericService(Product)
const getCategories = async () => {
    return await Product.distinct('categories');
}

const getRecommendedProducts = async (category) => {
    return await Product.find({ categories: category })
}
module.exports = {...productService, getCategories, getRecommendedProducts}
