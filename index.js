const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json({ limit: "50mb", type: 'application/json' });
app.use(jsonParser)

app.post("/download", async (req, res) => {

    console.log("BODY >>", req.body)

    // let { url } = req.query.url
    let v_id = req.query.url.split('v=')[1]
    const info = await ytdl.getInfo(v_id);
    // require('fs').writeFileSync('formats.json', JSON.stringify(info.formats))
    let yt_info = info.formats.find(_format => {
        if (_format.qualityLabel === "720p" && _format.audioBitrate !== null && _format.qualityLabel !== null) {
            return _format
        }
    })
    return res.send({ url: yt_info.url })
    // const v_id = req.query.url.split('v=')[1];

    // const info = await ytdl.getInfo(req.query.url);
    // let links = info.formats.sort((a, b) => {
    //     return a.mimeType < b.mimeType;
    // })
});


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});