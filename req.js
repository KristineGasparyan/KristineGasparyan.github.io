function makeRequests() {
	let url = "https://restcountries.eu/rest/v2/alpha/col";
	let response = fetch(url)
					.then((response) => {
						response.json()
					})
					.then((json) => {
						callbackCountryName(json)
					});
	console.log("");
}
​
function callbackCountryName(response){
	console.log(response.name);
}
