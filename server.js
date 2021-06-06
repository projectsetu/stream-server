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
        var video_info_url = 'https://redirector.googlevideo.com/videoplayback?api=youtubemultidownloader.com&expire=1623020638&ei=_v-8YJezKcKTgQerqLjwBA&ip=2a03%3Ab0c0%3A3%3Ae0%3A%3Ae6%3Af001&id=o-APUwIUbTCPyrZ2R_OpLtTEqr4pKXaGhP5O-w1AepdM9u&itag=22&source=youtube&requiressl=yes&mh=kt&mm=31%2C29&mn=sn-4g5edned%2Csn-4g5e6nsy&ms=au%2Crdu&mv=m&mvi=5&pl=48&initcwndbps=230000&vprv=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=5438.949&lmt=1470968447462738&mt=1622998850&fvip=5&fexp=24001373%2C24007246&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgI3_X-6FMgqKHyg0EgtYWtSS4KTxtEPsArzwO0oUZDfACIQDm8GF_sara3VEj3b9GbtvEoMQxAEW9kOiSDCMaBvWwJQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhANiNiJ1njmrs9a8y91DE7kJVWQqMGUm3b5_bDArZhq0TAiEA9MuTGz7Vsyy4r8I7MrsQDz9vk4_9v3aeTVGKe3w57J4%3D&title=03.Module%201A%20-%20Crystal%20Structures'; 
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