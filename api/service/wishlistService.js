const Wishlist = require("../models/Wishlist");
const genericService = require("./DBService")
const wishlistService = genericService(Wishlist)

const addToWishList = async (userId,product) => {
    return await Wishlist.findOneAndUpdate( 
            {userId: userId},
            {
              $push: {products: product},
            },
            { new: true }
            );
        
}

const removeFromWishList = async (userId, product) => {
    return await Wishlist.findOneAndUpdate( 
              {userId: userId},
              {
                $pull: {'products': product},
              },
              );
        
}

module.exports = {...wishlistService, addToWishList, removeFromWishList}
