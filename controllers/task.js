const {Task,Usertask,User} = require("../models")
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
    static updateStatusForwared(req,res){
        let id = req.params.id
        let status 
        if(req.params.status =='Backlog'){
           status = 'Todo'
        }else if(req.params.status =='Todo'){
            status = 'Done'
        }else if(req.params.status =='Done'){
            status = 'Completed'
        }
        console.log(id,status);
        
        Task.update({status:status},{
            where:{
                id:id
            }
        })
        .then(result=>{
            res.status(200).json({
                msg:'Update status success',
                data:result

            })
        })
        .catch(err=>{
            res.status(400).json({
                msg:'Update status failed',
                data:err
            })
        })
    }
    static updateStatusBackward(req,res){
        let id = req.params.id
        let status 
        if(req.params.status =='Todo'){
           status = 'Backlog'
        }else if(req.params.status =='Done'){
            status = 'Todo'
        }else if(req.params.status =='Completed'){
            status = 'Done'
        }
        console.log(id,status);
        
        Task.update({status:status},{
            where:{
                id:id
            }
        })
        .then(result=>{
            res.status(200).json({
                msg:'Update status success',
                data:result

            })
        })
        .catch(err=>{
            res.status(400).json({
                msg:'Update status failed',
                data:err
            })
        })
        
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
        Task.findAll({
            include:[{
                model:User
            }]
        })
        .then(result=>{
            return res.status(200).json({
                msg:"find All success",
                data:result
            })
        })
        .catch(err=>{
            return res.status(400).json({
                msg:"find All fail",
                data:err
            })
        })

    }
    static checkmember(req,res){
        User.findAll({
            include:[{
                model:Usertask,
                where:{
                    TaskId:req.params.id
                }
            }]
        })
        .then(result=>{
            return res.status(200).json({
                msg:"find User member success",
                data:result
            })
        })
        .catch(err=>{
            return res.status(400).json({
                msg:"find User member fail",
                data:err
            })
        })
    }

}
module.exports = Controller
