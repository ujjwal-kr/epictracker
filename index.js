const express = require('express');
const app = express();

const {
    default: Axios
} = require('axios');

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.get('/', async (req, res) => {
    console.log(req.socket.remoteAddress)
    console.log(req.ip)
    console.log("==IP ADDR==")
    console.log(req.headers['x-forwarded-for'])
    console.log("========USER AGENT=======")
    console.log(req.headers["user-agent"])

    const ip = req.headers['x-forwarded-for']
    const agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36';

    // const url = "https://api.ip8.com/ip/lookup/223.238.118.110"
    const url = "https://api.ip8.com/ip/lookup/"+ip;

    await Axios.get(url, {
        headers: {
            'user-agent': agent,
        }
    }).then(result => {
        console.log(JSON.stringify(result.data))
        const data = {
            headers: req.headers['user-agent'],
            ip,
            isp: result.data.details.geoip[0].isp.org,
            ispFull: result.data.details.geoip[0].isp.ASNname,
            city: result.data.details.geoip[0].city.name,
            pin: result.data.details.geoip[0].city.zip,
            timezone: result.data.details.geoip[0].city.timezone,
            continent: result.data.details.geoip[0].continent.name,
            country: result.data.details.geoip[0].country.name,
        }
        console.log(data)

        return res.render('./temp', {data})
    }).catch(e => {
        console.log("Something Went Wrong, wonderfully handled exception", e)
    })

});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Example app listening on port ' + port);
});