const {verify} = require("../helpers/jwt")
const {User} = require("../models")

function Authentication(req,res,next){
    try{
        let veri = verify(req.headers.token)
    
        if (veri){

            User.findOne({
                where:{
                    username:veri.username
                }
            })
            .then(result=>{
                req.currentuserid = result.id
                return next()
            })
            .catch(err=>{
                res.status(400).json({
                    msg:"Invalid user"
                })
            })

            
        }else{
            res.status(400).json({
                msg:"Invalid user"
            })
            
        }
    }catch{
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }
    
}

module.exports = Authentication