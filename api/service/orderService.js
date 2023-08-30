const Order = require("../models/Order");
const genericService = require("./DBService")
const orderService = genericService(Order)
module.exports = orderService
