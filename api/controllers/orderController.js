const orderService = require("../service/orderService")

const createOrder = async(orderToCreate) => {
  const order = await orderService.create(orderToCreate)
  return {
        body: order,
        status: 200
    }
}

const updatedOrder = async (userId,orderToUpdate) => {
  const order = await orderService.updateByParam({ key: "userId", val: userId }, orderToUpdate)
  console.log(order);
  return {
        body: order,
        status: 200,
    }
}

const updatedOrderById = async (id, orderToUpdate) => {
  const order = await orderService.update(id, orderToUpdate)
  return {
        body: order,
        status: 200,
    }
}

const deleteOrder = async (id) => {
  const deleteResponse = await orderService.remove(id)
  return {
        body: deleteResponse,
        status: 200,
      }
}

const getOrderByUserId = async (userId) => {
  const order = await orderService.getManyByParam({key: "userId", val: userId})
  if (!order) {
    return {
      status: 404
    }
  }
  return {
       body: order,
       status: 200,
   }
}

const getOrderByOrderId = async (id) => {
  const order = await orderService.getByID(id)
  if (!order) {
    return {
      status: 404
    }
  }
  return {
       body: order,
       status: 200,
   }
}

const getAllOrders = async () => {
  const orders = await orderService.getAll()
  if (!orders) {
    return {
      status: 404
    }
  }
  return {
       body: orders,
       status: 200,
   }
}

const getIncome = async (productId) => {
  const income = await orderService.getIncome(productId)
  return {
       body: income.sort((a,b) => a._id - b._id),
       status: 200,
   }
}

const getAllTimeSalesPerProduct = async (productId) => {
  const income = await orderService.getAllTimeSalesPerProduct(productId)
  return {
    body: income.sort((a,b) => a._id - b._id),
    status: 200,
}
}

const getAllTimeSales = async () => {
  const income = await orderService.getAllTimeSales()
  return {
    body: income,
    status: 200,
}
}

const getFiveNewOrders = async () => {
  const orders = await orderService.getFiveNewOrders()
  return {
    body: orders.slice(0,5),
    status: 200,
}
}

module.exports = {
    createOrder,
    updatedOrder,
    deleteOrder,
    getOrderByOrderId,
    getOrderByUserId,
    getAllOrders,
    getIncome,
    getAllTimeSalesPerProduct,
    getAllTimeSales,
    getFiveNewOrders,
    updatedOrderById
}