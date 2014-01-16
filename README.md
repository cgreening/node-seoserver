node-seoserver : A simple lightweight static renderer for dynamic content
============== 
Overview
--------
Most of our website's content (https://www.vollow.me) is generated dynamically using knockout which makes it hard for google to index. 

This project provides a proxy that uses PhantomJS to create static versions of our dynamic pages.

Example Usage
-------------
Start up the server by running:
```bash
node seoserver.js
```

Getting Started
---------------
1. Install the latest version of node.
2. Clone the repository
3. Add your configuration to config. E.g. ```config/prodoction.js```
    * At a minimum override the baseURL setting to point to your own server:
```javascript
module.exports = {
    baseURL : 'YOUR SERVER HERE'
}
```
4. Check ```config/default.js``` for other settings that can be overriden.

5. Run
```bash
NODE_ENV=production node seoserver.js
```
6. Configure your web server to use seoserver for web crawlers.
    * for nginx this might look like:
```yaml
location / {
    proxy_pass defaultProxy;
	if ($http_user_agent ~* bot)  {
		proxy_pass  http://localhost:300;
    }
    ... etc
```
