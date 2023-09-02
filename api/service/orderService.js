const Order = require("../models/Order");
const genericService = require("./DBService")
const orderService = genericService(Order)
const getIncome = async (productId) => {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
        return await Order.aggregate([
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
}
const getAllTimeSalesPerProduct = async (productId) => {
      return await Order.aggregate([
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
              _id: productId,
              total: { $sum: "$sales" },
            },
          },
        ]);
}
const getAllTimeSales = async () => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    return await Order.aggregate([
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
}
const getFiveNewOrders = async () => {
    return await Order.find().sort({ _id: -1 }).limit(5)   
  }
  
module.exports = { ...orderService, getIncome, getAllTimeSalesPerProduct, getAllTimeSales, getFiveNewOrders }
