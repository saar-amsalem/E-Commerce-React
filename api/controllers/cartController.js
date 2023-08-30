const cartService = require("../service/cartService");

const createCart = async (cartToCreate) => { 
    const savedCart = await cartService.create(cartToCreate)
    return {
        body: savedCart.body,
        status: savedCart.err ? 500 : 200,
        err: savedCart.err,
        ...(savedCart.err ? { message: "Could not Create Cart" } : {})
      }
}

const updateCart = async(userId,cartToUpdate) => {
    
    const updatedCart = await cartService.updateByParam(
        {key: "userId", val: userId},
        cartToUpdate
    );
    return {
        body: updatedCart.body,
        status: updatedCart.err ? 500 : 200,
        err: updatedCart.err,
        ...(updatedCart.err ? { message: "Could not Update Cart" } : {})
    }
}

const deleteCart = async(userId) => {
    const deleteResponse = await cartService.removeByParam({key: "userId", val: userId})
    return {
        body: deleteResponse.body,
        status: deleteResponse.err ? 500 : 200,
        err: deleteResponse.err,
        ...(deleteResponse.err ? { message: "Could not Delete Cart" } : {})
    }
}

const getCart = async (userId) => {
   const cart = await cartService.getByParam({key: "userId", val: userId})
   if (!cart.body) {
    return await createCart({ userId: userId, products: [] })
   }
   return {
        body: cart.body,
        status: cart.err ? 500 : 200,
        err: cart.err,
        ...(cart.err ? { message: "No Cart Found !" } : {})
    }
}

const getAllCarts = async() => {
    const carts = await cartService.getAll()
    return {
        body: carts.body,
        status: carts.err ? 500 : 200,
        err: carts.err,
        ...(carts.err ? { message: "No Cart Found !" } : {})
    }
}

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCart,
    getAllCarts
}