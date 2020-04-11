const {User} = require("../models")
const{generateToken} = require("../helpers/jwt")
const{Decrypt} = require ("../helpers/bcrypt")

class Controller{
    static register(req,res){
        let Data={
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        }

        User.create(Data)
        .then(result=>{
            let payload={
                id:result.id,
                username:result.username
            }
            let token = generateToken(payload)
            res.status(200).json({
                msg:" Success add user",
                id:result.id,
                token:token
            })
        })
        .catch(err=>{
            res.status(400).json({
                msg:"add user fail",
                error:err
            })
        })
    }

    static login(req,res){
        let Data = {
            username:req.body.username,
            password:req.body.password
        }

        User.findOne({
            where:{
                username: Data.username
            }
        })
        .then(result=>{
            console.log(Data.password,result.password);            
            let compare = Decrypt(Data.password,result.password)
            console.log(compare);
            
            if(compare){
                let payload={
                    id:result.id,
                    username:result.username
                }
                
                let token = generateToken(payload)
                res.status(201).json({
                    
                    id:result.id,
                    token:token
                })
                
            }
            else{
                res.status(401).json({
                    msg:"username/password not found"
                })
            }
        })
        .catch(err=>{
            res.status(401).json({
                msg:"username/password not found"
            })
        })

    }
}
module.exports = Controller