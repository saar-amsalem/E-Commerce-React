const Cart = require("../models/Cart");
const genericService = require("./DBService")
const cartService = genericService(Cart)
module.exports = cartService
