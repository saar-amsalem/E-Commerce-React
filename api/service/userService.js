const User = require("../models/User");
const genericService = require("./DBService")
const userService = genericService(User)
const getStats = async () => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return {
        body: data,
        err: false
    }
  } catch (err) {
    return {
        body: err,
        err: true
    }
  }
}
module.exports = {...userService, getStats}
