var http = require('http'); // missing p - 1
var myname = function () {
	// mispelled function - 2
	return 'Here is my IP address'; // changed from log to return -10
};

async function callHttpbin() {	// missing n in function call - 4, missing async call - 5
	let promise = new Promise((resolve, reject) => {
		http.get('http://httpbin.org/ip', function (response) {
			var str = '';
			response.setEncoding('utf8');
			response.on('data', function (data) {
				str += data;
			});
			response.on('end', function () {
				var result = JSON.parse(str);
				myips = result.origin;
				resolve(myips); // missing myips in the resolve - 9
			});
		});
	});
	let result = await promise;
	return result; // missing return 7
}

async function executeAsyncTask() {	// missing async call - 6
	const valueA = await callHttpbin();
	// console.log('value a: ',valueA);
	const valueB = myname();
	// console.log('value b: ',valueB);
	console.log(valueB + ' ' + valueA + ', ' + valueA); // - value only showing once - added a second time to match output - 11
} // missing bracket - 3
// Output Here is my IP address 149.24.160.1, 149.24.160.1

executeAsyncTask(); // no call to function - 8
