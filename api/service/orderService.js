const Order = require("../models/Order");
const genericService = require("./DBService")
const orderService = genericService(Order)
const getIncome = async (productId) => {
    try {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
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
      console.log(income.sort((a,b) => a._id - b._id));
      return {
        body: income.sort((a,b) => a._id - b._id),
        err: false
      }
    } catch (err) {
      console.log(err);
      return {
        body: err,
        err: true
      }
    }
}
const getAllTimeSalesPerProduct = async (productId) => {
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
        return {
            body: income,
            err: false
          }
      } catch (err) {
        console.log(err);
        return {
            body: err,
            err: true
        }
    }
}
const getAllTimeSales = async () => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
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
    return {
        body: data,
        err: false
      }
    } catch (err) {
        console.log(err);
        return {
            body: err,
            err: true
        }
    }
}
const getFiveNewOrders = async () => {
    try {
        const orders = await Order.find().sort({ _id: -1 }).limit(5)
        return {
            body: orders,
            err: false
          }
      } catch (err) {
        console.log(err);
        return {
            body: err,
            err: true
        }
      }
  }
  
module.exports = { ...orderService, getIncome, getAllTimeSalesPerProduct, getAllTimeSales, getFiveNewOrders }
