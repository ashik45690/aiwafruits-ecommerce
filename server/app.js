import express from "express";
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import productroute from './routes/productRout.js'
import cartRoute from './routes/cartRoute.js'
import dotenv from 'dotenv'
import Database from "./config/db.js";
import cookie from 'cookie-parser'
import orderRoute from './routes/orderRoute.js'
import geminroutes from './routes/geminiRoute.js'
import axios from 'axios'
dotenv.config()

console.log(process.env.CLOUDINARY_NAME);
console.log(process.env.JWT_SECRET);

const app = express();



const port = process.env.PORT || 4040;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://aiwafruits-ecommerce-kgl3.vercel.app",
    ],
    credentials: true,
  })
);

app.use(cookie())
 app.use(express.json())
 app.use(express.urlencoded({extended:false}))






Database()


 app.use('/',authRoute)
 app.use('/',productroute)
 app.use('/',cartRoute)
 app.use('/',orderRoute)
 app.use('/',geminroutes)

 app.get("/test-whatsapp", async (req, res) => {
  try {
    const resAxios = await axios.post(
      "https://graph.facebook.com/v20.0/1307687399087389/messages",
      {
        messaging_product: "whatsapp",
        to: "917356884862",
        type: "text",
        text: { body: "Testing WhatsApp API direct from backend!" }
      },
      {
        headers: {
          Authorization: "Bearer EAGKw3hdWHEABSJXoD1Sz09PcZBdFQhuIzBty0Y6mWC0LbprdB6DWB0mOwIlymNooAnZAWZBogmKfrrObhPZCjNZBxGf8ksj7LKP1QRuaf95eO6nOZAPKGKPV39jCdFjjmPeEjvNnsYATVtLtQo9INO3mEg8SE0UbAwOCZCKZARYN7WOhEQM6n1qWqNSOp29k3g8FaJiRWpEr9lF7OB7nVZBPc0jZCRb8ObvMr06l05dQjR3tBxZBiP1IxdTNIu5h4UVsy930JoCg8XNZBn1ltOxfsW4GrAZDZD",
          "Content-Type": "application/json"
        }
      }
    );
    res.json({ success: true, data: resAxios.data });
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.listen(port, () => {
  console.log(`server starting on a port ${port}`);
});
