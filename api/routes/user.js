const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();
const client = require("@mailchimp/mailchimp_marketing");
const userController = require("../controllers/userController")

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const response = await userController.updateUser(req.params.id, req.body)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const response = await userController.deleteUser(req.params.id)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

//GET USER
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  const response = await userController.getUser(req.params.id)
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const response = await userController.getAllUsers()
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const response = await userController.getUserStats()
  if (response.err) {
    console.log(response.body);
  }
  res.status(response.status).json(response)
});

//GET ONLINE USERS 

/*router.get("/online",verifyTokenAndAdmin,()=>{
  return getOnline();
})*/

/*---------------------------------- Admin Mails -------------------------*/
router.post("/email",async (req,res)=> {
  client.setConfig({
    apiKey: "efae8d0c7dd38b1a27af7f2ad560c1ef-us17",
    server: "us17",
  });
  try {
    const response = await client.campaigns.send("999fb8c13d");
  res.status(200).json(response)
  } catch (error) {
    console.log(error);
  }
  
})

module.exports = router;
