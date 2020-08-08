class SWAPIService{
	async retrieveRequest(requestedURL){
		const response = await fetch(requestedURL)
			.catch(error => {
				this.handleError(error);
		});
		if(!response.ok){
			this.handleResponseError(response);
		}
		const json = await response.json();
		var resultsList = json.results;
		if(json.next === null)
		{
			return resultsList;
		}
		var nextURL = json.next.slice(0,4) 
            + "s" + json.next.slice(4); // silly swapi
        var tempList = await this.retrieveRequest(nextURL);
		return resultsList.concat(tempList);
	}

	handleResponseError(response){
		document.write("HTTP error, status: " + response.status);
	}

	handleError(error){
		document.write("in swapi-service: " + error.message);
	}
}

export default SWAPIService;