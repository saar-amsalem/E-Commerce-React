const router = require("express").Router();
const authController = require("../controllers/authController")

//REGISTER
router.post("/register", async (req, res) => {
  const response = await authController.register(req.body)
  res.status(response.status).json(response)
});

//LOGIN
router.post('/login', async (req, res) => {
  const response = await authController.login(req.body)
  res.status(response.status).json(response)
});

module.exports = router;