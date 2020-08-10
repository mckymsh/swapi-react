import React, {Component} from 'react';
import SWAPIService from './swapi-service';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button, ButtonGroup, ToggleButtonGroup, ToggleButton, 
  Alert, Accordion, Card
} from 'react-bootstrap';
import './App.css';

class App extends Component{

  constructor(props){
    super(props);
    this.swapiService = new SWAPIService();
    this.state = {
      items: null,
      baseUrl: "https://swapi.dev/api/",
      category: "people",
      overallCount: 0,
      sort: null,
      sortDirection: "ascending",
      showAll: false,
      loading: true,
      nextPage: null,
      previousPage: null,
      pageNumber: 1,
    }
  }

  componentDidMount(){
    this.getItems(null);
  }
  
  render(){
    const categoryRadios = [
      {name: 'People', value: 'people'},
      {name: 'Planets', value: 'planets'},
      {name: 'Species', value: 'species'},
      {name: 'Vehicles', value: 'vehicles'},
      {name: 'Ships', value: 'starships'},
    ];
    const items = this.state.items;
    if(this.state.sort){
      // sorting here
      window.alert("This shouldn't happen.");
    }
    if(!items) return null;
    const listItems = items.map((item, index) =>
        <Card> 
          <Accordion.Toggle as={Card.Header} variant="primary" eventKey={index+1}>
            {item.name}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={index+1}>
            <Card.Body>This is {index}. More info about {item.name} here.</Card.Body>
          </Accordion.Collapse>
        </Card>
    )
    // I know what you're thinking: "Why is it {index+1} instead of just {index}?"
    // The answer is simple. When I use {index} the first item in the Accordion
    // won't open. When I do {index+1}, it does. The indices of the Cards in the
    // Accordion are the same either way. Absolutely no clue why.

    return (
      <div className="app">
        <header className="app-header">
          <h1>This is a header.</h1>
          <div className="Buttons">
            <ToggleButtonGroup type="radio" name="category" defaultValue="people">
              {categoryRadios.map((radio) => (
                <ToggleButton
                  type="radio"
                  variant="secondary"
                  name={radio.value}
                  value={radio.value}
                  onChange={(e) => this.setCategory(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <br/>
            <ButtonGroup name="page-buttons">              
              <Button 
                variant="secondary"
                value="previous"
                onClick={(e) => this.changePage(e.currentTarget)}
              >
                Previous
              </Button>
              <ToggleButton 
                type="checkbox"
                variant="secondary" 
                checked={this.state.showAll}
                onChange={(e) => this.setShowAll(e.currentTarget)}
              >
                Show All
              </ToggleButton>
              <Button 
                variant="secondary"
                value="next"
                onClick={(e) => this.changePage(e.currentTarget)}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
          <Alert className="item-count" variant='info'>
          Count: {this.state.overallCount} <br/>
          Page: {this.state.pageNumber}/{this.state.showAll ? 1 : Math.ceil(this.state.overallCount/10)}
          </Alert>
        </header>
        <Accordion>
          {listItems}
        </Accordion>
      </div>
    );
  }

  setShowAll(target){
    var checked = this.state.showAll;
    this.setState({
      showAll: !checked,
      pageNumber: 1,
    }, this.getItems);
  }

  changePage(target){
    if(this.state.showAll){return;}
    var newPageUrl = null;
    if(target.value === "next"){
      newPageUrl = this.state.nextPage;
    }else{
      newPageUrl = this.state.previousPage;
    }
    if(newPageUrl){
      this.getItems(newPageUrl);
      this.setState({ // more accurate than counting, eh?
        pageNumber: newPageUrl.slice(newPageUrl.length-1),
      });
    }
  }

  setCategory(newCategory){
    this.setState({
      category: newCategory,
      nextPage: null,
      previousPage: null,
      pageNumber: 1,
    }, this.getItems);
  }

  async getItems(optionalURL){
    var url = null;
    if(optionalURL){
      url = optionalURL;
    }else{
      url = this.state.baseUrl + this.state.category + "/";
    }
    var newItems = [];
    var itemCount = 0;
    if(this.state.showAll){
      newItems = await this.getItemsRecursive(url);
      itemCount = newItems.length;
    }else{
      var tempData = await this.swapiService.retrieveRequest(url);
      newItems = tempData.results;
      itemCount = tempData.count;
      this.setState({
        nextPage: addTheS(tempData.next),
        previousPage: addTheS(tempData.previous),
      });
    }
    this.setState({
      items: newItems,
      overallCount: itemCount,
    });
  }

  async getItemsRecursive(url){
    const json = await this.swapiService.retrieveRequest(url);
    if(json.next === null){
      return json.results;
    }else{
      var nextURL = addTheS(json.next);
      var tempResults = await this.getItemsRecursive(nextURL);
      return json.results.concat(tempResults);        
    }
  }
}

function addTheS(httpUrl){
  // SWAPI isn't https, but Netlify insists that outgoing
  // connections be https. Reasonable, but unnecessary.
  // Yet here we are, hacking away.
  if(httpUrl){
    return httpUrl.slice(0,4) + "s" + httpUrl.slice(4);
  }
  return httpUrl;
}

export default App;