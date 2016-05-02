// import modules
var express                         = require("express");
 	app                             = express();

var port = process.env.PORT || 3002;
app.listen(port, function() {
	console.log("Express server listening on port %d", port);
});

app.use(express.static(__dirname + '/html/'));

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
