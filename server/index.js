
import express from 'express'
import collectionObj from './db/dbModel_1.js';

const app=express();
const port=8000;
app.use(express.json())

//payment gateway
import dotenv from 'dotenv'
import Cors from 'cors'
app.use(Cors());

//Routes
import paymentRoutes from './payment/payment.js'
app.use('/api/payment',paymentRoutes)





//create new User || sign up
app.post('/SignUp',async (req,res)=>{
    const userData=req.body  
    const obj={}

    obj.name=userData.name
    obj.email=userData.email
    obj.mobile=userData.m_number
    obj.password=userData.password

     const s=await createNewUser(obj)
    
    res.send(s)
 
})

const createNewUser=async (c1)=>{

    try {
        const flag=await collectionObj.findOne({email:c1.email});
        
        if(flag==null){
          const obj=  await collectionObj.create(c1);
          await obj.save();
          
          const userData=await collectionObj.findOne(c1);
         return userData
        }
        else{
           return 'email already present'
        }
    } catch (error) {
        return 'error occured at server side'
    }
 
}


// sign in 

app.post('/SignIn',async (req,res)=>{
    const data=req.body

    const s= await signInUser(data)
    res.send(s)
})

const signInUser= async (data)=>{

    try {        
        const flag=await collectionObj.findOne(data);
        
        if(flag==null){
            return 'invalid user'
        }
        else{
         return flag
        }

    } catch (error) {
        return 'error occured at server side'
    }
}


// update Add to cart list //Add to cart button

app.put('/products',async (req,res)=>{
    const putReq=req.body
    const userData=putReq.user
    const cartListArray=putReq.addProduct

    const s= await updateCartList(userData,cartListArray)
   
    res.send(s)
})

const updateCartList= async (userData,cartListArray)=>{
    try{
        await collectionObj.findOneAndUpdate({_id:userData._id,email:userData.email},{cart_info:cartListArray},
            {
            new: true
          })
         const updatedUser= await collectionObj.findOne({_id:userData._id,email:userData.email})        
         return updatedUser
    }catch(error){
        return 'error occured at server side'
    }
}


// update Add to cart list //carts delete button

app.put('/carts',async (req,res)=>{
    const putReq=req.body
    const userData=putReq.user
    const cartListArray=putReq.addProduct

    const s= await updateCartList(userData,cartListArray)   
    res.send(s)
})














app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}/`)
})