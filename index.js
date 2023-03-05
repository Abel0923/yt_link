const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
const bodyParser = require('body-parser');
const cors = require("cors");

var jsonParser = bodyParser.json({ limit: "50mb", type: 'application/json' });
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(jsonParser)

app.get("/download", async (req, res) => {

    try {
        let v_id = req.query.url.split('v=')[1]
        const info = await ytdl.getInfo(v_id);
        // require('fs').writeFileSync('infos.json', JSON.stringify(info))
        let yt_info = info.formats.find(_format => {
            if (_format.qualityLabel === "720p" && _format.audioBitrate !== null && _format.qualityLabel !== null) {
                return _format
            }
        })
        return res.send({ url: yt_info.url, title: info.videoDetails.title })
    } catch (_err) {
        return res.status(500).json("NO VIDEO FOUND!")
    }


});


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});