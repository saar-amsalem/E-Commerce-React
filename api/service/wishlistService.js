const Wishlist = require("../models/Wishlist");
const genericService = require("./DBService")
const wishlistService = genericService(Wishlist)

const addToWishList = async (userId,product) => {
    try {
        const updated = await Wishlist.findOneAndUpdate( 
            {userId: userId},
            {
              $push: {products: product},
            },
            { new: true }
            );
        return {
            body: updated,
            err: false
        }
    } catch (error) {
        return {
            body: error,
            err: true
        }
    }
}

const removeFromWishList = async (userId, product) => {
    try {
          const updated = await Wishlist.findOneAndUpdate( 
              {userId: userId},
              {
                $pull: {'products': product},
              },
              );
        return {
            body: updated,
            err: false
        }
      } catch (error) {
        return {
            body: error,
            err: true
        }
      }
}

module.exports = {...wishlistService, addToWishList, removeFromWishList}
