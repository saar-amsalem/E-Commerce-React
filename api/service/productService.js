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
            body: err,
            err: true
        }
    }
}
module.exports = {...productService, getCategories}
