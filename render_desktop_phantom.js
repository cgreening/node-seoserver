var page = require('webpage').create();
var system = require('system');
var fs = require('fs');
var srcUrl = system.args[1];
var dstFile = system.args[2];
page.settings.resourceTimeout = system.args[3];
page.viewportSize = { width: 1024, height: 768 };
page.open(srcUrl, function (status) {
    if (status !== 'success') {
        console.log('Unable to access the network!');
    } else {
    	page.evaluate(function() {
	   		do {
	    		var element = document.getElementById('mobile');
	    		element.parentNode.removeChild(element);
	    	} while(element);
    	});
    	fs.write(dstFile, page.content, 'w');
    }
    phantom.exit();
});


