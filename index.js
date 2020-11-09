const express = require('express');
const app = express();
const path = require('path')

app.get('/', (req, res) => {
    console.log(req.socket.remoteAddress)
    console.log(req.ip)
    console.log("==IP ADDR==")
    console.log(req.headers['x-forwarded-for'])
    console.log("========USER AGENT=======")
    console.log(req.headers["user-agent"])
    res.sendFile(path.join(__dirname, 'temp.html'))
});

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port 3888!');
});