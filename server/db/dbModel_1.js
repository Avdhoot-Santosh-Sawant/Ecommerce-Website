
import mongoose from 'mongoose'
const dburl='mongodb://localhost:27017/justPoultryThings'

mongoose.connect(dburl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},(error)=>{
    if(error){
        console.log('dbmodel --> ',error)
    }
    else{
        console.log('Successfully connected to ',dburl)
    }
})

const cartSchema=new mongoose.Schema({
    id:{
        type:Number
    },
    qun:{
        type:Number
    }
})

const schema=new mongoose.Schema({
    'name':{
        type:String,
        required:true
    },
    'email':{
        type:String,
        required:true
    },
    'mobile':{
        type:String,
        required:true
        
    },
    'password':{
        type:String,
        required:true
    },
    'cart_info':{
        type:Array(cartSchema),
        default:[]
    }
})



const collectionObj=mongoose.model('userData',schema)


export default collectionObj;