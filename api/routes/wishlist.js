const Wishlist = require("../models/Wishlist")

const {
    verifyToken,
    verifyTokenAndAuthorization,
  } = require("./verifyToken");
  
const router = require("express").Router();

//CREATE

router.post("/",verifyToken, async (req,res)=> {
    const newWishlist = new Wishlist(req.body);
  try {
    const savedWishlist = await newWishlist.save();
    res.status(200).json(savedWishlist);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

//UPDATE 

router.post("/find/:id",verifyTokenAndAuthorization, async (req,res)=> {
  console.log(req.body);
    try {
        const updated = await Wishlist.findOneAndUpdate( 
            {userId: req.params.id},
            {
              $push: {products: req.body},
            },
            { new: true }
            );
            console.log(updated);
        res.status(200).json(updated)
       
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
    
})

//DELETE 

router.post("/delete/:id", async (req,res)=> {
    try {
      console.log(req.body);
      console.log("in delete");
        const updated = await Wishlist.findOneAndUpdate( 
            {userId: req.params.id},
            {
              $pull: {'products': req.body},
            },
            );
        console.log(updated);    
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
    
})

//FIND BY USER ID


router.get("/find/:id",verifyTokenAndAuthorization,async (req,res)=> {
    try {
       const list = await Wishlist.findOne({userId: req.params.id})
       console.log(list);
       res.status(200).json(list)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})
  

module.exports = router