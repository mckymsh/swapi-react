class SWAPIService{
	async retrieveRequestRecursive(requestedURL){
		const response = await fetch(requestedURL)
			.catch(error => {
				this.handleError(error);
		});
		if(!response.ok){
			this.handleResponseError(response);
		}
		const json = await response.json();
		const resultsList = json.results;
		if(json.next === null)
		{
			return resultsList;
		}
		var nextURL = json.next.slice(0,4) 
            + "s" + json.next.slice(4); // silly swapi
        var tempList = await this.retrieveRequestRecursive(nextURL);
		return resultsList.concat(tempList);
	}

	async retrieveRequest(requestedURL){
		const response = await fetch(requestedURL)
			.catch(error => {
				this.handleError(error);
		});
		if(!response.ok){
			this.handleResponseError(response);
		}
		const json = await response.json();
		return json.results;
	}

	handleResponseError(response){
		document.write("HTTP error. Status: " + response.status);
	}

	handleError(error){
		document.write("Error in swapi-service: " + error.message);
	}


}

export default SWAPIService;