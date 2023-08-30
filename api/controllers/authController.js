const UserService = require("../service/userService")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = async (newUserToRegister) => {
      console.log(newUserToRegister);
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
          body: newUser.body,
          status: newUser.err ? 500 : 200,
          err: newUser.err,
          ...(newUser.err ? { message: "Could not Create User" } : {})
        }
} 

const login = async (userToLogin) => {
    try{
        const user = await UserService.getByParam(
          {key: "username", val: userToLogin.username},
        )
        if(!user.body)
        {
          return {
            body: "Wrong User Name",
            status: 404,
            err: true,
            message: "Wrong Username/Password !"
          }
        }
        const hashedPassword = CryptoJS.AES.decrypt(
            user.body.password,
            process.env.PASS_SEC
        ).toString(CryptoJS.enc.Utf8);
  
        const originalPassword = hashedPassword;

        const inputPassword = userToLogin.password;
        
        if (originalPassword != inputPassword)
        {
          console.log("original :" + originalPassword + " input:" + inputPassword);
          return {
            body: "Wrong Credentials",
            status: 401,
            err: true,
            message: "Wrong Username/Password !"
          }
        }
      
        const accessToken = jwt.sign(
        {
          id: user.body._id,
          isAdmin: user.body.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
        
        return {
            body: {...user.body._doc, accessToken},
            status: 200,
            err: false
        }

    }catch(err){
        console.log(err);
        return {
            body: err,
            status: 500,
            err: true,
            message: "An Unexpected Error Occured, Please Try Again Later !"
        }
    }
}

module.exports = {
    register, 
    login
}