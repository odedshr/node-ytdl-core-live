# node-ytdl-core-live

I just placed [node-youtube-dl](https://github.com/fent/node-youtube-dl) binaries and made them available

I needed this so my [rikud](odedshr.github.io/rikud) could easy download youtube songs into the player

## The code

There's not much of a code really, only getting URL as parameter and sending it to the node-youtube-dl engine, which will pipe the file content to the response stream.

## Using it

index.js get a parameter of URL, which should be a youtube URL. if no URL was provided, a simple html page will load.
If non-youtube URL is provided, I will not be held responsible.

Please don't misuse this tool.

##Acknowledgements

This piece of code is under "[The MIT License](http://opensource.org/licenses/MIT)", meaning you can do whatever you want with it. it's free, as all intellectual property should be. Enjoy.