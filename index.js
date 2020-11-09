const express = require('express');
const { env } = require('process');
const app = express();
const path = require('path')

app.get('/', (req, res) => {
    console.log(req.socket.remoteAddress)
    console.log(req.socket.localAddress)
    console.log(req.socket.localPort)
    console.log(req.headers['x-forwarded-for'])
    res.sendFile(path.join(__dirname, 'temp.html'))
});

app.listen(3888 || process.env.PORT, () => {
    console.log('Example app listening on port 3888!');
});