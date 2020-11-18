const express = require('express');
const app = express();

const cheerio = require('cheerio');
const { default: Axios } = require('axios');

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

    const agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36';

    const url = 'https://whatismyipaddress.com/ip/' + '223.238.100.186'
    Axios.get(url, {headers: {'user-agent': agent}}).then(res => {
        console.log(res)
    }).catch(e => {
        console.log("Something Went Wrong, wonderfully handled exception", e)
    })

    res.render('./temp', {data})

});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Example app listening on port '+port);
});
