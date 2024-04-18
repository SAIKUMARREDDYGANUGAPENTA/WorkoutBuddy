const jwt = require('jsonwebtoken')
const user = require('../models/userModel')

const requireAuth = async (req,res,next)=>{
    //verify authentication
    const {authorization} = req.headers 

    if(!authorization){
        return res.status(401).json({error:'Authorization token require'})

    }

    const token = authorization.split(' ')[1]

    try{
       const {_id} = jwt.verify(token,process.env.SECREAT)

       req.user = await  user.findOne({_id}).select('_id')

       next()

    }catch(error){
        console.log(error)
        return res.status(401).json({error:'REquest is not authorized '})
    }

}

module.exports = requireAuth