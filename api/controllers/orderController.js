const orderService = require("../service/orderService")

const createOrder = async(orderToCreate) => {
  const order = await orderService.create(orderToCreate)
  return {
        body: order.body,
        status: order.err ? 500 : 200,
        err: order.err,
        ...(order.err ? { message: "Could Not Create Order !" } : {})
    }
}

const updatedOrder = async (id,orderToUpdate) => {
  const order = await orderService.update(id, orderToUpdate)
  console.log(order);
  return {
        body: order.body,
        status: order.err ? 500 : 200,
        err: order.err,
        ...(order.err ? { message: "Could Not Update Order !" } : {})
    }
}

const updatedOrderById = async (id, orderToUpdate) => {
  const order = await orderService.update(id, orderToUpdate)
  console.log(order);
  return {
        body: order.body,
        status: order.err ? 500 : 200,
        err: order.err,
        ...(order.err ? { message: "Could Not Update Order !" } : {})
    }
}

const deleteOrder = async (id) => {
  const deleteResponse = await orderService.remove(id)
  return {
        body: deleteResponse.body,
        status: deleteResponse.err ? 500 : 200,
        err: deleteResponse.err,
        ...(deleteResponse.err ? { message: "Could Not Delete Order !" } : {})
      }
}

const getOrderByUserId = async (userId) => {
  const order = await orderService.getByParam({key: "userId", val: userId})
  
  return {
       body: order.body,
       status: order.err ? 500 : 200,
       err: order.err,
       ...(order.err ? { message: "No Orders Found For This User !" } : {})
   }
}

const getOrderByOrderId = async (id) => {
  const order = await orderService.getByID(id)
  return {
       body: order.body,
       status: order.err ? 500 : 200,
       err: order.err,
       ...(order.err ? { message: "No Order Found With this id !" } : {})
   }
}

const getAllOrders = async () => {
  const orders = await orderService.getAll()
  return {
       body: orders.body,
       status: orders.err ? 500 : 200,
       err: orders.err,
       ...(orders.err ? { message: "No Orders Found !" } : {})
   }
}

const getIncome = async (productId) => {
  const income = await orderService.getIncome(productId)
  return {
       body: income.body,
       status: income.err ? 500 : 200,
       err: income.err,
       ...(income.err ? { message: "No Orders Found !" } : {})
   }
}

const getAllTimeSalesPerProduct = async (productId) => {
  const income = await orderService.getAllTimeSalesPerProduct(productId)
  return {
       body: income.body,
       status: income.err ? 500 : 200,
       err: income.err,
       ...(income.err ? { message: "No Orders Found !" } : {})
   }
}

const getAllTimeSales = async () => {
  const income = await orderService.getAllTimeSales()
  return {
       body: income.body,
       status: income.err ? 500 : 200,
       err: income.err,
       ...(income.err ? { message: "No Orders Found !" } : {})
   }
}

const getFiveNewOrders = async () => {
  const orders = await orderService.getFiveNewOrders()
  return {
       body: orders.body,
       status: orders.err ? 500 : 200,
       err: orders.err,
       ...(orders.err ? { message: "No Orders Found !" } : {})
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