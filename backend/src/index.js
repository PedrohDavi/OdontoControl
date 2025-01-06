import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import './config/db.js'
import router from './routes/produtos.js';

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", router)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
    
})