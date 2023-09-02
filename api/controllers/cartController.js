const cartService = require("../service/cartService");

const createCart = async (cartToCreate) => { 
    const savedCart = await cartService.create(cartToCreate)
    return {
        body: savedCart,
        status: 200,
      }
}

const updateCart = async(userId,cartToUpdate) => {
    
    const updatedCart = await cartService.updateByParam(
        {key: "userId", val: userId},
        cartToUpdate
    );
    return {
        body: updatedCart,
        status: 200,
      }
}

const deleteCart = async(userId) => {
    const deleteResponse = await cartService.removeByParam({key: "userId", val: userId})
    return {
        body: deleteResponse,
        status: 200,
    }
}

const getCart = async (userId) => {
    const cart = await cartService.getByParam({key: "userId", val: userId})
    if (!cart) {
        return {
            status: 404
        }
    }
    return {
        body: cart,
        status: 200,
    }
}

const getAllCarts = async() => {
    const carts = await cartService.getAll()
    if (!carts) {
        return {
            status: 404
        }
    }
    return {
        body: carts,
        status: 200,
    }
}

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCart,
    getAllCarts
}