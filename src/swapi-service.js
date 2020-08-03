class SWAPIService{
	async retrieveItems(){
		var url = "http://swapi.dev/api/people/";
		return fetch(url)
			.then(response => {
				if(!response.ok){
					this.handleResponseError(response);
				}
				return response.json(); //.results;
			})
			.then(json => {
				const names = [];
				const itemArray = json.results;
				for(var i = 0; i < itemArray.length; i++){
					names[i] = itemArray[i].name;
				}
				return itemArray;
			})
			.catch(error => {
				this.handleError(error);
			});
	}

	handleResponseError(response){
		document.write("HTTP error, status = " + response.status);
	}

	handleError(error){
		document.write("Error: " + error);
		document.write(error.message);
	}
}

export default SWAPIService;