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

}



module.exports = new authControllers()