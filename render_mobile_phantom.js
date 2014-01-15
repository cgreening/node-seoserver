var page = require('webpage').create();
var system = require('system');
var fs = require('fs');
var srcUrl = system.args[1];
var dstFile = system.args[2];
page.settings.userAgent = 'mozilla/5.0 (iphone; cpu iphone os 7_0_2 like mac os x) applewebkit/537.51.1 (khtml, like gecko) version/7.0 mobile/11a501 safari/9537.53 phantomjs';
page.settings.resourceTimeout = system.args[3];
page.viewportSize = { width: 320, height: 480 };
page.open(srcUrl, function (status) {
    if (status !== 'success') {
        console.log('Unable to access the network!');
    } else {
    	page.evaluate(function() {
	   		do {
	    		var element = document.getElementById('main');
	    		element.parentNode.removeChild(element);
	    	} while(element);
    	});
    	fs.write(dstFile, page.content, 'w');
    }
    phantom.exit();
});


