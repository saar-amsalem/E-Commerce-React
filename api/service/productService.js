const Product = require("../models/Product");
const genericService = require("./DBService")
const productService = genericService(Product)
const getCategories = async () => {
    try {
        const categories = await Product.distinct('categories');
        return {
            body: categories,
            err: false
        }
    } catch (error) {
        return {
            body: error,
            err: true
        }
    }
}

const getRecommendedProducts = async (category) => {
    try {
        const recommended = await Product.find({ categories: category })
        return {
            body: recommended.slice(0,3),
            err: false
        }
    } catch (error) {
        return {
            body: error,
            err: true
        }
    }
}
module.exports = {...productService, getCategories, getRecommendedProducts}
