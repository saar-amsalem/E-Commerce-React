const userService = require("../service/userService")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

const updateUser = async(id,userToUpdate) => {
    if (userToUpdate.hasOwnProperty("password")) {
        userToUpdate.password = CryptoJS.AES.encrypt(
          userToUpdate.password,
          process.env.PASS_SEC
        ).toString();
      }
    
    const user = await userService.update(id, userToUpdate)

    const accessToken = jwt.sign(
        {
          id: user.body._id,
          isAdmin: user.body.isAdmin,
        },
        process.env.JWT_SEC,
            {   expiresIn:"3d"  }
        );
        console.log({...user.body._doc , accessToken });
    return {
        body: {...user.body._doc , accessToken },
        status: user.err ? 500 : 200,
        err: user.err,
        ...(user.err ? { message: "Could Not Update User !" } : {})
    }
}

const deleteUser = async (id) => {
    const delteResponse = await userService.remove(id)
    return {
        body: delteResponse.body,
        status: delteResponse.err ? 500 : 200,
        err: delteResponse.err,
        ...(delteResponse.err ? { message: "Could Not Delete User !" } : {})
    }
}

const getUser = async (id) => {
    const user = await userService.getByID(id)
    return {
        body: user.body,
        status: user.err ? 500 : 200,
        err: user.err,
        ...(user.err ? { message: "Could Not Find User !" } : {})
    }
}

const getAllUsers = async () => {
    const users = await userService.getAll()
    return {
        body: users.body,
        status: users.err ? 500 : 200,
        err: users.err,
        ...(users.err ? { message: "Could Not Find Users !" } : {})
    }
}

const getUserStats = async () => {
    const stats = await userService.getStats()
    return {
        body: stats.body,
        status: stats.err ? 500 : 200,
        err: stats.err,
        ...(stats.err ? { message: "Could Not Find Users Stats !" } : {})
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    getUserStats
}