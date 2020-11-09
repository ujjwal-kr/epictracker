const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3888, () => {
    console.log('Example app listening on port 3888!');
});

//Run app, then load http://localhost:3888 in a browser to see the output.