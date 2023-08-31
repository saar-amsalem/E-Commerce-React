const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();
const orderController = require("../controllers/orderController")

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const response = await orderController.createOrder(req.body)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const response = await orderController.updatedOrder(req.params.id,req.body)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});


//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const response = await orderController.deleteOrder(req.params.id)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  const response = await orderController.getOrderByUserId(req.params.userId)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

router.get("/findorder/:orderId", verifyTokenAndAuthorization, async (req, res) => {
  const response = await orderController.getOrderByOrderId(req.params.orderId)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const response = await orderController.getAllOrders()
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});


// GET MONTHLY INCOME per product

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const response = await orderController.getIncome(req.query.pid)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

//get all time sales per product

router.get("/alltimePerProduct", verifyTokenAndAdmin, async (req, res) => {
  const response = await orderController.getAllTimeSalesPerProduct(req.query.pid)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

//get stats for graph
router.get("/alltime", verifyTokenAndAdmin, async (req, res) => {
  const response = await orderController.getAllTimeSales()
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const response = await orderController.getFiveNewOrders(req.query.pid)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

module.exports = router;
