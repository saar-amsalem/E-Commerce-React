const wishlistService = require("../service/wishlistService")

const createWishList = async (wishlistToCreate) => {
    const savedWishlist = await wishlistService.create(wishlistToCreate)
    return {
        body: savedWishlist.body,
        status: savedWishlist.err ? 500 : 200,
        err: savedWishlist.err,
        ...(savedWishlist.err ? { message: "Could not Create Wishlist" } : {})
      }
}

const updateWishlistByUserId = async(id ,wishListToUpdate) => {
    
    const updatedWishlist = await wishlistService.addToWishList(id, wishListToUpdate)
    return {
        body: updatedWishlist.body,
        status: updatedWishlist.err ? 500 : 200,
        err: updatedWishlist.err,
        ...(updatedWishlist.err ? { message: "Could not Update Wishlist" } : {})
    }
}

const deleteFromWishlist = async(id, product) => {
    const deleteResponse = await wishlistService.removeFromWishList(id, product)
    return {
        body: deleteResponse.body,
        status: deleteResponse.err ? 500 : 200,
        err: deleteResponse.err,
        ...(deleteResponse.err ? { message: "Could not Delete Wishlist" } : {})
    }
}

const getWishlistByUserId = async (userId) => {
   let wishlist = await wishlistService.getByParam({key: "userId", val: userId})
   if (!wishlist.body) {
    wishlist = await wishlistService.create({ userId: userId, products: [] })
   }
   return {
        body: wishlist.body,
        status: wishlist.err ? 500 : 200,
        err: wishlist.err,
        ...(wishlist.err ? { message: "An Unexpected Error Ocuured !" } : {})
    }
}

module.exports = {
    createWishList,
    updateWishlistByUserId,
    deleteFromWishlist,
    getWishlistByUserId
}