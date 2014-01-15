module.exports = {
	// port that we listen on 
	port : 3000,
	// base URL of the website we are proxy for
	baseURL : 'http://www.amazon.com',
	// access log file - write out requests in the common log format - http://en.wikipedia.org/wiki/Common_Log_Format
	accessLogFile : 'access.log',
	// timeout for resources in ms (passed into phantomJS
	resourceTimeout : 5000,
	// timeout for the phantom js process
	phantomTimeout : 10000,
	// phantomJS script for desktop request
	desktopPhantomScript : 'render_desktop_phantom.js',
	// phantomJS script for mobile request
	mobilePhantomScript : 'render_mobile_phantom.js',
}
