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
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {   expiresIn:"3d"  }
        );
    return {
        body: {...user._doc , accessToken },
        status: 200,
    }
}

const deleteUser = async (id) => {
    const delteResponse = await userService.remove(id)
    return {
        body: delteResponse,
        status: 200,
    }
}

const getUser = async (id) => {
    const user = await userService.getByID(id)
    if (!user) {
        return {
            status: 404
        }
    }
    return {
        body: user,
        status: 200,
    }
}

const getAllUsers = async () => {
    const users = await userService.getAll()
    if (!users) {
        return {
            status: 404
        }
    }
    return {
        body: users,
        status: 200,
    }
}

const getUserStats = async () => {
    const stats = await userService.getStats()
    if (!stats) {
        return {
            status: 404
        }
    }
    return {
        body: stats,
        status: 200,
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    getUserStats
}