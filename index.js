import express from 'express';
import cors from 'cors';
const app = express();
import pkg from 'pg';
const {Pool} = pkg;
import { config } from 'dotenv';
config();
const PORT = process.env.PORT || 3009;

app.use(express.json());
app.use(cors());

//Conectar a la base de datos
const isDevServer = false;

export let pool;

if(isDevServer) {
    pool = new Pool({
        connectionString: process.env.EXTERNAL_DATABASE,
        ssl: true
    });
} else {
    pool = new Pool({
        connectionString: process.env.INTERNAL_DATABASE
    });
};

app.get('/', (req,res)=>res.send('Server online'));

app.get('/test-database', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT CURRENT_DATE');
        const currentDate = result.rows[0].current_date;
        client.release();
        res.json({ currentDate });
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal Server Error', error });
    }
});

app.listen(PORT, ()=>console.log('Server on port ', PORT));