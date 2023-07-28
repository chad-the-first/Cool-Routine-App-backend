import "dotenv/config";
import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Habibi Come to Dubai');
} );

export default app;