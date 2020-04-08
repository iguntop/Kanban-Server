const {Task} = require("../models")
const {Usertask} = require("../models")
class Controller {
    static create(req,res){
        let Data ={
            title: req.body.title,
            description:  req.body.description
        }

        Task.create(Data)
        .then(result=>{
            let dataDetail={
                UserId : req.currentuserid,
                TaskId : result.id
            }
            
            Usertask.create(dataDetail)
        })
        .catch(err=>{
           return res.status(400).json({
                msg:"Task add fail",
                data:err
            })
        })

        .then(succes=>{
            return res.status(200).json({
                msg:"Taks add success"
            })
        })
        .catch(err=>{
            return res.status(400).json({
                msg:"Task add fail",
                data:err
            })
        })

    }
    static update(req,res){
        
    }
    static delete(req,res){

        Usertask.destroy({
            where:{
                TaskId:req.params.id
            }
        })
        .then(result=>{
            Task.destroy({
                where:{
                    id:req.params.id
                }
            })
            
        })
        .catch(err=>{
            return res.status(400).json({
                msg:"Delete Usertask fail",
                data:err
            })
        })

        .then(result=>{
            return res.status(200).json({
                msg:"Delete Task Success"
            })
        })
        .catch(err=>{
            return res.status(400).json({
                msg:"Delete Task fail",
                data:err
            })
        })
    }
    static viewall(req,res){
        
    }
    

}
module.exports = Controller
