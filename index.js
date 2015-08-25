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

    console.log(youtubeURL);
    response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (typeof youtubeURL!== "undefined") {
        try {
            response.setHeader('Content-disposition', 'attachment; filename='+url.parse(decodeURI(youtubeURL), true).query["v"]+'.mp3');
            response.setHeader('Content-type', 'audio/mpeg');
            ytdl(youtubeURL, {filter: "audioonly"}).pipe(response);
        }
        catch (err) {
            res.status(500).send('Something broke!' + err);
        }
        //
    } else {
        response.sendFile('readme.html', {root: './public'});
    }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
