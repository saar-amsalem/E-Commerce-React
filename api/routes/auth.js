const router = require("express").Router();
const authController = require("../controllers/authController")

//REGISTER
router.post("/register", async (req, res) => {
  console.log(req.body);
  const response = await authController.register(req.body)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

//LOGIN
router.post('/login', async (req, res) => {
    const response = await authController.login(req.body)
    if (response.err) {
      console.log(response.body);
    }
    res.status(response.status).json(response)
});

module.exports = router;