import express from "express";
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import productroute from './routes/productRout.js'
import cartRoute from './routes/cartRoute.js'
import dotenv from 'dotenv'
import Database from "./config/db.js";
import cookie from 'cookie-parser'
import orderRoute from './routes/orderRoute.js'

dotenv.config()

console.log(process.env.CLOUDINARY_NAME);
console.log(process.env.JWT_SECRET);

const app = express();



const port = process.env.PORT || 4040;

app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials:true
  }
))
app.use(cookie())
 app.use(express.json())
 app.use(express.urlencoded({extended:false}))






// mongoDb connection

Database()


 app.use('/',authRoute)
 app.use('/',productroute)
 app.use('/',cartRoute)
 app.use('/',orderRoute)

app.listen(port, () => {
  console.log(`server starting on a port ${port}`);
});
