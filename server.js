var express = require('express');
const ytdl = require('ytdl-core');
var ytpl = require('ytpl');
const sendSeekable = require('send-seekable');
const got = require('got');
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const Cryptr = require('cryptr');
var moment = require('moment');
const cryptr = new Cryptr(process.env.CRYPT_KEY);
var useragent = require('express-useragent');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var request = require('request');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

////////////////////////////////////////////////////////////////////////

var browser_version = 'Gecko/90.0';
var time_limit = 5500;

////////////////////////////////////////////////////////////////////////

var app = express();
app.use(sendSeekable);
app.use(useragent.express());



app.get('/stream', function(req, res) {
    try {
        var video_info_url = decodeURIComponent(`https%3A%2F%2Fredirector.googlevideo.com%2Fvideoplayback%3Fapi%3Dyoutubemultidownloader.com%26expire%3D1622937983%26ei%3DH727YKz7Oa2Q-gbdgJCQAw%26ip%3D2a03%253Ab0c0%253A3%253Ae0%253A%253Ae6%253Af001%26id%3Do-AI5LFGQc-1Ud8WloUOGgp6GXYE_tW1r9RmBgoxgaAW1R%26itag%3D22%26source%3Dyoutube%26requiressl%3Dyes%26mh%3DJa%26mm%3D31%252C29%26mn%3Dsn-4g5ednsd%252Csn-4g5e6ns6%26ms%3Dau%252Crdu%26mv%3Dm%26mvi%3D2%26pl%3D48%26initcwndbps%3D181250%26vprv%3D1%26mime%3Dvideo%252Fmp4%26cnr%3D14%26ratebypass%3Dyes%26dur%3D5584.050%26lmt%3D1472770979899212%26mt%3D1622916047%26fvip%3D2%26fexp%3D24001373%252C24007246%26sparams%3Dexpire%252Cei%252Cip%252Cid%252Citag%252Csource%252Crequiressl%252Cvprv%252Cmime%252Ccnr%252Cratebypass%252Cdur%252Clmt%26sig%3DAOq0QJ8wRQIhAJRgkocFuDDpBzyLiravJTnQ8QyvyLG14Kw7rMLETk3NAiB2xhoPHSAbXct-TZ3Tra80XDS_5WhLuRmI_A2Hsmiy2Q%253D%253D%26lsparams%3Dmh%252Cmm%252Cmn%252Cms%252Cmv%252Cmvi%252Cpl%252Cinitcwndbps%26lsig%3DAG3C_xAwRgIhAO8ddkQPamniK3l1RnXt8Yzyr3oE9M_KKbB9yAj-3de9AiEA2-rW6rNn65f3J_PipFhKnFtZM_sPemXpbdzRGmbE0Pw%253D%26title%3D02.Module%25200%2520-%2520Introduction%2520to%2520Solid%2520State%2520Electronics`); /*req.query.token;*/
        console.log(video_info_url)
        request({
            url: video_info_url,
            method: "HEAD"
        }, function(err, response, body) {
            video_info_length = response.headers['content-length'];
            if ((req.headers["sec-fetch-dest"] == "video")) {
                var filestream = got.stream(video_info_url);
                res.sendSeekable(filestream, {
                    connection: 'keep-alive',
                    "cache-control": "no-cache",
                    type: 'video/mp4', // e.g. 'audio/mp4'
                    length: video_info_length,
                    filename: 'stream.mp4' // e.g. 4287092
                });
            } else {
                res.send('No video exists')
            }
        })
    } catch (error) {
        console.log(error);
        res.status(404)
    }
})




app.listen(PORT, function() { console.log('Server Started !!!') });