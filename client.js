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

console.log('Starting Dynamic DNS Updater...');
console.log( process.env);
console.log('host:' + process.env.HOST);
console.log('username:' + process.env.USERNAME);


var DynDNSClient = require('./lib/dyndns-client'),
	dyndns = new DynDNSClient({
		url                 : "http://members.dyndns.org/nic/update", //TODO: change to tokens[url] and put default value
		hostname            : [
			tokens["hostname"] || process.env.HOSTNAME
		],
		username            : tokens["username"] || process.env.USERNAME,
		password            : tokens["password"] || process.env.PASSWORD,
		network_interface   : tokens["interface"] || process.env.INTERFACE || undefined,
		protocol            : tokens["protocol"] || process.env.PROTOCOL || "ipv4",
        check               : tokens["check"] || process.env.CHECK || "60"
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

