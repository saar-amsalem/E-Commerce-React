const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();
const userController = require("../controllers/userController")

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const response = await userController.updateUser(req.params.id, req.body)
  res.status(response.status).json(response)
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const response = await userController.deleteUser(req.params.id)
  res.status(response.status).json(response)
});

//GET USER
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  const response = await userController.getUser(req.params.id)
  res.status(response.status).json(response)
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const response = await userController.getAllUsers()
  res.status(response.status).json(response)
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const response = await userController.getUserStats()
  res.status(response.status).json(response)
});

module.exports = router;
