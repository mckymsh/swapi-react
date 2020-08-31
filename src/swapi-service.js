class SWAPIService{
	async retrieveRequest(requestedURL){
		const response = await fetch(requestedURL)
			.catch(error => {
				document.write(requestedURL);
				this.handleError(error);
		});
		if(!response.ok){
			this.handleResponseError(response);
			return null;
		}
		const json = await response.json();
		return json;
	}

	handleResponseError(response){
		// document.write("HTTP error. Status: " + response.status);
	}

	handleError(error){
		// document.write("Error in swapi-service: " + error.message);
	}
}

export default SWAPIService;