var fs = require('fs');

var tokens = {};
var configFile = fs.readFileSync('config.txt', 'utf8');
var tokensList = configFile.replace(/"/g, '').replace(/ /g, '').split(/\r?\n/); //Fix blank line in the end

//Iterates through each token name and value and saves it to tokens dict
tokensList.forEach(function(token) {
    tokenName = token.split("=")[0]
    tokenValue = token.split("=")[1]
    tokens[tokenName] = tokenValue;
});

var DynDNSClient = require('index'),
	dyndns = new DynDNSClient({
		url                 : "http://members.dyndns.org/nic/update",
		hostname            : [
			tokens["hostname"]
		],
		username            : tokens["username"],
		password            : tokens["password"],
		network_interface   : tokens["interface"],
		protocol            : tokens["protocol"],
		check               : tokens["check"]
	});

dyndns.on('IP:changed', function (newIP, oldIP) {
    console.log(newIP, oldIP);
});

dyndns.on('update:success', function () {
	console.log('updated');
});

dyndns.on('error', function (err) {
	console.log(err);
});

