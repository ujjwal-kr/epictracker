const express = require('express');
const app = express();
const path = require('path')

app.get('/', (req, res) => {
    console.log("==IP ADDR==")
    console.log(req.socket.remoteAddress)
    console.log(req.ip)
    console.log(req.headers['x-forwarded-for'])
    console.log("========USER AGENT=======")
    console.warn(req.headers["user-agent"])
    // res.sendFile(path.join(__dirname, 'temp.html'))
    res.send("hey")
});

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port 3888!');
});