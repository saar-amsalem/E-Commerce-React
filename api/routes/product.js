const {
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();
const productController = require("../controllers/productController")
//CREATE

router.post("/",verifyTokenAndAdmin, async (req, res) => {
  const response = await productController.createProduct(req.body)
  res.status(response.status).json(response)
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    const response = await productController.updateProduct(req.params.id, req.body)
    res.status(response.status).json(response)
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const response = await productController.deleteProduct(req.params.id)
    res.status(response.status).json(response)
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  const response = await productController.getProduct(req.params.id)
    res.status(response.status).json(response)
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const response = await productController.getAllProducts()
    res.status(response.status).json(response)
});

router.get("/categories", async (req,res) => {
  const response = await productController.getCategories()
    res.status(response.status).json(response)
})

router.get("/recommended/:category", async (req,res) => {
  const response = await productController.getRecommendedProducts(req.params.category)
    res.status(response.status).json(response)
})

module.exports = router;
