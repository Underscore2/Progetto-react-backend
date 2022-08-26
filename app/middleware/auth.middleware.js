const { Sequelize } = require("sequelize");
const db = require('../models')
const user = db.user;

exports.userExist=(req,res,next)=>{
    console.log(req.body)
        user.findOne({
            where:{
                email: req.body.email
            }
        }).then(data=>
            {
                if(data){ next()}
                else{res.status(400).send({message:"AUTH1.1 - Failed"})};
            }
            ).catch(err=>console.log(err))
    
    
    }
exports.matchPassword=(req,res,next)=>{
        user.findOne({
                where:{
                    email:req.body.email,
                    password:req.body.password
                }
            }).then(data=>{if(data){next()}
            else{{res.status(400).send({message:"AUTH1.2 - Failed"})}}})
        .catch(err=>{res.status(400), console.log(err)})
        
    
    }



