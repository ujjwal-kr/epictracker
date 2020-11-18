const express = require('express');
const app = express();
const path = require('path')

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    console.log(req.socket.remoteAddress)
    console.log(req.ip)
    console.log("==IP ADDR==")
    console.log(req.headers['x-forwarded-for'])
    console.log("========USER AGENT=======")
    console.log(req.headers["user-agent"])

    const data = {
        header: req.headers["user-agent"],
        ip: req.headers['x-forwarded-for'],
    }
    res.render('./temp', {data})
    // res.sendFile(path.join(__dirname, 'temp.html'))
});
const port = process.env.PORT | 3000;
app.listen(port, () => {
    console.log('Example app listening on port '+port);
});
