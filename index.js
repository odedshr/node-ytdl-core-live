var express = require('express'),
    app = express(),
    url = require('url'),
    fs = require('fs'),
    ytdl = require('ytdl-core');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function(request, response) {

    var url_parts = url.parse(request.url, true),
        query = url_parts.query,
        youtubeURL = query["url"];

    //console.log(youtubeURL);
    response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (typeof youtubeURL!== "undefined") {
        try {
            ytdl.getInfo(youtubeURL, {filter: "audioonly", downloadURL: true}, function gotInfo (err,info) {
                var filename = info.title.replace(/[^\w\s]/gi, '')+'.mp3';
                response.header('Content-disposition', 'attachment; filename='+filename);
                response.header('Content-type', 'audio/mpeg');

                var video = ytdl.downloadFromInfo(info, {filter: "audioonly"});
                /*video.on("data", function (data) {
                    response.send(data.toString("base64"));
                });
                /*video.on("close", function () {
                    console.log("close");
                });*/
                video.on("end", function () {
                    response.end();
                });
                video.pipe(response);
            });
        }
        catch (err) {
            response.status(500).send('Something broke!' + err);
        }
        //
    } else {
        response.sendFile('readme.html', {root: './public'});
    }
});

app.get('/ping', function(request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.end("pong");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
