const AdminModel = require("../models/AdminModel");
const { responseReturn } = require("../utilities/response");
const bcrypt = require('bcrypt');
const { createToken } = require("../utilities/tokenCreate");
const { response } = require("express");

class authControllers{
    admin_login= async(req,res)=>{
        const {email,password}=req.body;
        try{
            const admin = await AdminModel.findOne({
                'email':email
            }).select('+password')

            if(admin){
                const match = await bcrypt.compare(password,admin.password)
                
                if (match){
                    const token = await createToken({
                        id:admin.id,
                        role:admin.role,

                    })
                    
                    res.cookie('accessToken',token,{expires:new Date(Date.now()+7*24*60*60*1000)})
                    responseReturn(res,200,{token,message:"Login Success"})

                }else{
                    responseReturn(res,404,{error:"Password Wrong"})
                }


            }else{
                responseReturn(res,404,{error:'Email not found!'})

            }
        }
        catch(error){
            console.log(error.message)
            responseReturn(res,500,{error:error.message})
        }
        

    }

    getUser = async(req,res)=>{
        const {id,rule} = req;

        try{
            if(role=='admin'){
                const user = await AdminModel.findById(id)
                responseReturn(res,200,{userInfo:user})

            }else{
                console.log('selller info')
            }
        }catch(error){
            console.log(error.message)
        }

    }// end getUser method

}



module.exports = new authControllers()