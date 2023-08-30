
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const cartController = require("../controllers/cartController")
const router = require("express").Router();

//CREATE
router.post("/",verifyToken,async (req, res) => {
    const response = await cartController.createCart(req.body)
    if (response.err) {
      console.log(response.body);
    }
    res.status(response.status).json(response)
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const response = await cartController.updateCart(req.params.id,req.body)
    if (response.err) {
      console.log(response.body);
    }
    res.status(response.status).json(response)
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const response = await cartController.deleteCart(req.params.id)
    if (response.err) {
      console.log(response.body);
    }
    res.status(response.status).json(response)
});

//GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  console.log("cart userId : ", req.params.id);
  const response = await cartController.getCart(req.params.id)
    if (response.err) {
      console.log(response.body);
    }
    res.status(response.status).json(response)
});

// //GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const response = await cartController.getAllCarts()
    if (response.err) {
      console.log(response.body);
    }
    res.status(response.status).json(response)
});

module.exports = router;
