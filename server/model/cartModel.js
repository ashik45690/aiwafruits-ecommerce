import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    
    userId:{
        type:String,
        ref:'UserData',
        required:true
    },
    items:[
     {
         productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        
        quantity:{
            type:Number,
            default:1
        },
     },
    ],
},

{
    timestamps:true
})

const Cart = new mongoose.model('carts', cartSchema)

export default Cart