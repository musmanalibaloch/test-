const userService = require('../service/user.service')

const register = async (req,res,next) =>{
    try {
        await userService.registerUser(req.body.email,req.body.name,req.body.password);
        res.send({message:'user registeration successful'})
    } catch (error) {
        next(error)
    }
}

  
 const login = async (req, res, next) => {
    try{
       const user =  await userService.loginUser(req.body.email,req.body.password);
       res.send({message:"User logged in successfully", user})
    }catch(error){
        next(error)
    }
  };

  module.exports={
    register,
    login
  }
  