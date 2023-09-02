const productService = require("../service/productService")

const createProduct = async(productToCreate) => {
    const product = await productService.create(productToCreate)
    return {
        body: product,
        status: 200,
    }
}

const updateProduct = async(id,productToUpdate) => {
    const updatedProduct = await productService.update(id,productToUpdate);
    return {
        body: updatedProduct,
        status: 200,
    }
}

const deleteProduct = async (id) => {
    const deleteResponse = await productService.remove(id)
    return {
        body: deleteResponse,
        status: 200,
    }
}

const getProduct = async (id) => {
    try {
        const product = await productService.getByID(id)
        if (!product) {
            return {
                status: 404
            }
        }
        return {
            body: product,
            status: 200,
        }
    } catch (error) {
        if(error.name === "CastError") {
            return {
                status: 400
            }
        }
    }
}

const getAllProducts = async () => {
    const products = await productService.getAll()
    if (!products) {
        return {
            status: 404
        }
    }
    return {
        body: products,
        status: 200,
    }
}

const getCategories = async () => {
    const categories = await productService.getCategories()
    if (!categories) {
        return {
            status: 404
        }
    }
    return {
        body: categories,
        status: 200,
    }
}

const getRecommendedProducts = async (category) => {
    const recommended = await productService.getRecommendedProducts(category)
    if (!recommended) {
        return {
            status: 404
        }
    }
    return {
        body: recommended.slice(0,3),
        status: 200,
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    getCategories,
    getRecommendedProducts
}