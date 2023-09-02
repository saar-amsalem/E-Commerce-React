const wishlistService = require("../service/wishlistService")

const createWishList = async (wishlistToCreate) => {
    const savedWishlist = await wishlistService.create(wishlistToCreate)
    return {
        body: savedWishlist,
        status: 200,
      }
}

const updateWishlistByUserId = async(id ,wishListToUpdate) => {
    
    const updatedWishlist = await wishlistService.addToWishList(id, wishListToUpdate)
    return {
        body: updatedWishlist,
        status: 200,
      }
}

const deleteFromWishlist = async(id, product) => {
    const deleteResponse = await wishlistService.removeFromWishList(id, product)
    return {
        body: deleteResponse,
        status: 200,
    }
}

const getWishlistByUserId = async (userId) => {
   const wishlist = await wishlistService.getByParam({key: "userId", val: userId})
   if (!wishlist) {
    return {
        status: 404
    }
   }
   return {
        body: wishlist,
        status: 200,
    }
}

module.exports = {
    createWishList,
    updateWishlistByUserId,
    deleteFromWishlist,
    getWishlistByUserId
}