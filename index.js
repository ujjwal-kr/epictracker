const express = require('express');
const app = express();

const cheerio = require('cheerio');
const {
    default: Axios
} = require('axios');

app.set('view engine', 'ejs');
app.get('/', async (req, res) => {
    console.log(req.socket.remoteAddress)
    console.log(req.ip)
    console.log("==IP ADDR==")
    console.log(req.headers['x-forwarded-for'])
    console.log("========USER AGENT=======")
    console.log(req.headers["user-agent"])

    const ip = req.headers['x-forwarded-for']
    const agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36';

    const url = 'https://whatismyipaddress.com/ip/' + ip

    await Axios.get(url, {
        headers: {
            'user-agent': agent
        }
    }).then(result => {
        const $ = cheerio.load(result.data)
        const continent = $('#section_left_3rd > table > tbody > tr:nth-child(1) > td').text()
        const country = $('#section_left_3rd > table > tbody > tr:nth-child(2) > td').text()
        const state = $('#section_left_3rd > table > tbody > tr:nth-child(3) > td').text()
        const city = $('#section_left_3rd > table > tbody > tr:nth-child(4) > td').text()
        const pin = $('#section_left_3rd > table > tbody > tr:nth-child(7) > td').text()
        const isp = $('#section_left_3rd > form:nth-child(8) > table > tbody > tr:nth-child(5) > td').text()
        console.log(continent + '\n', country + '\n', state + '\n', city + '\n', pin+'\n', isp)

        const data = {
            header: req.headers["user-agent"],
            ip: req.headers['x-forwarded-for'],
            continent,
            country,
            state,
            city,
            pin,
            isp
        }

        return res.render('./temp', {
            data
        })
    }).catch(e => {
        console.log("Something Went Wrong, wonderfully handled exception", e)
    })

});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});

// #section_left_3rd > table > tbody > tr:nth-child(7) > td