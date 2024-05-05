const express = require('express');
var cors = require('cors');
var app = express();
const Base64 = require('base-64');
const KEY = process.env.GITHUB_TOKEN
app.use(cors())

const {
    default: Axios
} = require('axios');

app.get("/headers", async (req, res) => {
    const headers = req.headers;
    return res.json({data: headers['user-agent']})
})

app.get('/weather/:city', async (req, res) => { // Because URL PARAMS ARE COOLER
    const city = req.params.city;
    await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=84f0c05e16abc57b03ca8fa00b59f78e&units=metric`).then(weather => {
        return res.json({
            description: weather.data.weather[0].description,
            temperature: weather.data.main.temp
        })
    }).catch(e => {
        console.log("Cant get weather data lol", e)
        return res.status(404).json({
            message: "NF"
        })
    })
})

app.get('/add-sha/:sha', (req, res) => {
    const encoded = Base64.encode(1)
    Axios.put("https://api.github.com/repos/ujjwal-kr-data/ip-data/contents/" + req.params.sha, {
        message: "Added a document",
        content: encoded
    }, {
        headers: { 'Authorization': "token " + KEY }
    }).then(result => {
        res.json({ visits: 1 })
    }).catch(e => {
        Axios.get("https://api.github.com/repos/ujjwal-kr-data/ip-data/contents/" + req.params.sha, {
            headers: { 'Authorization': "token " + KEY }
        }).then(result => {
            const contentSHA = result.data.sha;
            let visits = Base64.decode(result.data.content)
            let newVisit = Base64.encode(parseInt(visits) + 1)
            Axios.put("https://api.github.com/repos/ujjwal-kr-data/ip-data/contents/" + req.params.sha, {
                message: "UPDATED COUNT",
                sha: contentSHA,
                content: newVisit
            }, { headers: { 'Authorization': "token " + KEY } }).then(done => {
                res.json({ visits: Base64.decode(newVisit) })
            })
                .catch(e => console.log(e))
        })
            .catch(e => { console.log(e) })
    })
})

const port = process.env.PORT || 4000;
    app.listen(port, async () => {
        console.log("Listening on http://localhost:4000")
});
