import express from 'express';
import cors from 'cors';
const app = express();
import { config } from 'dotenv';
config();
const PORT = process.env.PORT || 3009;

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>res.send('Server online'));

app.listen(PORT, ()=>console.log('Server on port ', PORT));