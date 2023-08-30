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
    console.log(response.err);
  }
  res.status(response.status).json(response)
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const response = await orderController.updatedOrder(req.params.id,req.body)
  if (response.err) {
    console.log(response.err);
  }
  res.status(response.status).json(response)
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const response = await orderController.deleteOrder(req.params.id)
  if (response.err) {
    console.log(response.err);
  }
  res.status(response.status).json(response)
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/findorder/:orderId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.findOne({_id: req.params.orderId });
    console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    console.log("in server");
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET MONTHLY INCOME per product

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all time sales per product

router.get("/alltime", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;


  try {
    const income = await Order.aggregate([
      {
        $match: {
            products: { $elemMatch: { productId } },
        },
      },
      {
        $project: {
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: req.query.pid,
          total: { $sum: "$sales" },
        },
      },
    ]);
    console.log(income);
    res.status(200).json(income);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get stats for graph
router.get("/graph", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount"
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 }).limit(5)
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
