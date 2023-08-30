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

const updatedOrder = async (userId,orderToUpdate) => {
  const order = await orderService.updateByParam({key: "userId", val: userId},orderToUpdate)
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

module.exports = {
    createOrder,
    updatedOrder,
    deleteOrder
}