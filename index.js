var express = require('express'),
    app = express(),
    url = require('url'),
    fs = require('fs'),
    ytdl = require('ytdl-core');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {

    var url_parts = url.parse(request.url, true),
        query = url_parts.query,
        youtubeURL = query["url"];

    if (typeof youtubeURL!== "undefined") {
        try {
            response.setHeader('Content-disposition', 'attachment; filename='+url.parse(decodeURI(youtubeURL), true).query["v"]+'.mp3');
            response.setHeader('Content-type', 'audio/mp3');
            ytdl(youtubeURL, {filter: "audioonly"}).pipe(response);
        }
        catch (err) {

        }
        //response.send("saved?");
    } else {
        res.redirect('/public/index.html');
    }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
