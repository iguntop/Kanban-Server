const {Usertask,Task} = require("../models")

function Authorization(req,res,next){
    Usertask.findOne({
        where :{
            id:req.params.id,
            UserId:req.currentuserid
        }
    })
    .then(result=>{
        console.log(result);
        if (result != null){
            return next()
        }else{
            return res.status(400).json({
                msg:"UnAuthorized"
            })
        }
    })
    .catch(err=>{
        return res.status(400).json({
            msg:"UnAuthorized"
        })
    })
}
module.exports = Authorization