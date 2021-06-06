const express = require('express')
const app = express()
const port = 5151
const SITE_URL = 'https://www.example.com';

app.get('*', (req, res) => {
    console.log(req.url);

    const queryArray = Object.keys(req.query);
    const query = queryArray.map((item) => {
        return `<input type='hidden' name='${item}' value='${req.query[item]}' />`;
    });
    const method = queryArray.length ? "get" : "post";
    res.send(`
    <body onload="document.forms[0].submit()">
        <p>Yönlendiriliyor</p>
        <form action="${SITE_URL}${req.url}" method="${method}" style="display:none">
            ${query}
            <input type="submit" value="fix" />
        </form>
    </body>
    `);
});

app.listen(port, () => console.log(`Router app listening on port ${port}!`))
