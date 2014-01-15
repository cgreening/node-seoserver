var express = require('express');
var child = require('child_process');
var fs = require('fs');
var sys = require('sys');
var tmp = require('tmp');
var CONFIG = require('config');
var phantomjsPath = require('phantomjs').path;
var colors = require('colors');

// log out the configuration
var valid = true;
['port','baseURL','accessLogFile','desktopPhantomScript','mobilePhantomScript','phantomTimeout','resourceTimeout'].forEach(function (configKey) {
	var value = CONFIG[configKey];
	if(typeof value !== 'undefined') {
		console.log((configKey + " : " + value.toString().bold).blue);
	} else {
		valid = false;
		console.log(('Error missing configuration setting : ' + configKey.bold).red);
	}
});

if(!valid) {
	process.exit(-1);
}

var app = express();

// output access to the sever in common log format
var accessLogFile = fs.createWriteStream(CONFIG.accessLogFile, {flags: 'a'});
app.use(express.logger({stream: accessLogFile}));

// catch all errors and log them out
app.use(function (error, req, res, next) {
    console.log(error.message);
    res.setStatus(500);
    res.render({error : error});
});

// catch all requests
app.get('*', function (req, res, next) {
	// the requested path
    var requestedPath = req.path;
    // user agent doing the request
    var userAgent = req.headers['user-agent'];
    // create a temporary file for the output from our phantomjs script
    tmp.file(function (error, path, fd) {
        if (error) {
            next(error);
        } else {
            // command to run
            var command = new Array();
            // phantom browser
            command.push(phantomjsPath);
            // script to run
			if (userAgent.toLowerCase().indexOf('mobile') !== -1) {
	            command.push(CONFIG.mobilePhantomScript);
	        } else {
	            command.push(CONFIG.desktopPhantomScript);
	        }
            // url to load
            command.push('"' + CONFIG.baseURL + requestedPath + '"');
            // file to save results to
            command.push(path);
    		// resource timeout
    		command.push(CONFIG.resourceTimeout);
        	// spawn phantomjs to download and render our page
            child.exec(command.join(' '), { timeout : CONFIG.phantomTimeout }, function (error, stdout, stderr) {
                if (error !== null) {
                    next(error);
                } else {
                    fs.readFile(path, function read(error, data) {
                        if (error) {
                            next(error);
                        } else {
                            res.setHeader('Content-Type', 'text/html');
                            res.setHeader('Content-Length', data.length);
                            res.end(data);
                            fs.unlink(path);
                        }
                    });
                }
            });
        }
    });
});

app.listen(CONFIG.port);
console.log(('Listening on port : ' + CONFIG.port).green.bold);
