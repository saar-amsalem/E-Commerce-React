const UserService = require("../service/userService")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = async (newUserToRegister) => {
  try {
      const encrypted = CryptoJS.AES.encrypt(
        newUserToRegister.password,
        process.env.PASS_SEC
      ).toString();
      
      const newUser = await UserService.create(
        {
          username: newUserToRegister.username,
          email: newUserToRegister.email,
          password: encrypted
        }
      )
      return {
          body: newUser,
          status: 200,
        }
    } catch (error) {
      if(error.code === 11000) {
        console.log(error);
        return {
          body: {
            duplicatedField: Object.keys(error.keyValue)[0],
            duplicatedValue: error.keyValue[Object.keys(error.keyValue)[0]]
          },
          status: 409,
        }
      }
      throw error
  }
}      

const login = async (userToLogin) => {
    const user = await UserService.getByParam(
      {key: "username", val: userToLogin.username},
    )
    if(!user)
    {
      return {
        status: 401,
      }
    }
    const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    const originalPassword = hashedPassword;

    const inputPassword = userToLogin.password;
    
    if (originalPassword != inputPassword)
    {
      return {
        status: 401,
      }
    }
  
    const accessToken = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
        {expiresIn:"3d"}
    );
    
    return {
        body: {...user._doc, accessToken},
        status: 200,
      }
}

module.exports = {
    register, 
    login
}