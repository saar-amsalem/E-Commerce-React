const productService = require("../service/productService")

const createProduct = async(productToCreate) => {
    const product = await productService.create(productToCreate)
    return {
        body: product.body,
        status: product.err ? 500 : 200,
        err: product.err,
        ...(product.err ? { message: "Could not Create Product" } : {})
    }
}

const updateProduct = async(id,productToUpdate) => {
    const updatedProduct = await productService.update(id,productToUpdate);
    return {
        body: updatedProduct.body,
        status: updatedProduct.err ? 500 : 200,
        err: updatedProduct.err,
        ...(updatedProduct.err ? { message: "Could not Update Product" } : {})
    }
}

const deleteProduct = async (id) => {
    const deleteResponse = await productService.remove(id)
    return {
        body: deleteResponse.body,
        status: deleteResponse.err ? 500 : 200,
        err: deleteResponse.err,
        ...(deleteResponse.err ? { message: "Could not Delete Product !" } : {})
    }
}

const getProduct = async (id) => {
    const product = await productService.getByID(id)
    return {
        body: product.body,
        status: product.err ? 500 : 200,
        err: product.err,
        ...(product.err ? { message: "Could not Find Product !" } : {})
    }
}

const getAllProducts = async () => {
    const products = await productService.getAll()
    return {
        body: products.body,
        status: products.err ? 500 : 200,
        err: products.err,
        ...(products.err ? { message: "No Products Found !" } : {})
    }
}

const getCategories = async () => {
    const categories = await productService.getCategories()
    return {
        body: categories.body,
        status: categories.err ? 500 : 200,
        err: categories.err,
        ...(categories.err ? { message: "No Products Found, No Categories !" } : {})
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    getCategories
}