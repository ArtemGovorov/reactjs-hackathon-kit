/*var express = require('express');
var compress = require('compression');
var path = require('path');
const assets = require('../../public/webpack.assets.json');
const customServerRendering = require(`../../public/${assets.main.js}`);
console.log(customServerRendering);
var server = express();
const port = process.env.PORT || 8080;


//http://openmymind.net/2012/5/30/Client-Side-vs-Server-Side-Rendering/
//https://www.quora.com/What-are-the-tradeoffs-of-client-side-rendering-vs-server-side-rendering

server.use(compress({threshold: 0}));

server.use(express.static(path.resolve(__dirname, '..', '..', 'public')));

server.use(function(req, res) {
	customServerRendering.default(req, res, assets);
});

//TODO: utiliser an http api pour logguer les GET, POST...:
server.listen(port, function() {
	var host = 'localhost';
	console.log('Server launched at http://%s:%s', host, port);
});
*/