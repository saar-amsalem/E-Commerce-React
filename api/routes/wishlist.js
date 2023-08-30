const wishlistController = require("../controllers/wishlistController")

const {
    verifyToken,
    verifyTokenAndAuthorization,
  } = require("./verifyToken");
  
const router = require("express").Router();

//CREATE

router.post("/",verifyToken, async (req,res)=> {
    const response = await wishlistController.createWishList(req.body)
    if (response.err) {
      console.log(response.body);
    }
    res.status(response.status).json(response)
})

//UPDATE 

router.post("/add/:id",verifyTokenAndAuthorization, async (req,res)=> {
  const response = await wishlistController.updateWishlistByUserId(req.params.id, req.body)
    if (response.err) {
      console.log(response.body);
    }
    res.status(response.status).json(response)
})

//DELETE 

router.delete("/delete/:id", async (req,res)=> {
  const response = await wishlistController.deleteFromWishlist(req.params.id, req.body)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
})

//FIND BY USER ID
router.get("/find/:id",verifyTokenAndAuthorization,async (req,res)=> {
  const response = await wishlistController.getWishlistByUserId(req.params.id)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
})

module.exports = router