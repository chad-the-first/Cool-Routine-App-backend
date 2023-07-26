import express from 'express'
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Habibi Come to Dubai');
} );

app.listen(port, () => {
    console.log('server running on port: ' + port);
})