import React, {Component} from 'react';
import SWAPIService from './swapi-service';
// import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Button, ButtonGroup, ToggleButtonGroup, ToggleButton, 
  Accordion, Card, ListGroup, Container, Row,
} from 'react-bootstrap';

import './custom.scss';

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
    var listItems = this.assembleListItems();

    return (
      <Container className="app">
        <div className="app-header">
          <h1>Star Wars API</h1>
          <div>
            <Row>
              <ToggleButtonGroup className="category-radios" type="radio" name="category" defaultValue="people">
                {categoryRadios.map((radio) => (
                    <ToggleButton
                      className="category-radio"
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
            </Row>
            <Row>
              <ButtonGroup className="page-buttons" name="page-buttons">              
                <Button 
                  variant="secondary"
                  value="previous"
                  disabled={this.state.showAll}
                  onClick={(e) => this.changePage(e.currentTarget)}
                >
                  Previous
                </Button>
                <ToggleButtonGroup className="show-all" type="radio" name="showAll" defaultValue="pages">
                  <ToggleButton
                    type="radio"
                    variant="secondary"
                    value="pages"
                    onChange={(e) => this.setShowAll(e.currentTarget)}
                  >
                    Page: {this.state.pageNumber}/{this.getPageCount()}
                  </ToggleButton>
                  <ToggleButton 
                    type="checkbox"
                    variant="secondary" 
                    value="all"
                    onChange={(e) => this.setShowAll(e.currentTarget)}
                  >
                    Show All
                  </ToggleButton>
                </ToggleButtonGroup>
                <Button 
                  variant="secondary"
                  value="next"
                  disabled={this.state.showAll}
                  onClick={(e) => this.changePage(e.currentTarget)}
                >
                  Next
                </Button>
              </ButtonGroup>
            </Row>
          </div>
          <Accordion className="results">
            {listItems}
          </Accordion>
        </div>
      </Container>
    );
  }

  //             <Container fluid="sm">
  //               <Row>
  //                 <Alert className="item-count" variant='info'>
  //                   Count: {this.state.overallCount}
  //                 </Alert>
  //               </Row>
  //             </Container>

   

  // There is probably a way to do this more procedurally, but with so
  // few categories, it was worth the ten minutes to hand-code it 
  // rather than the hours of debugging to automagically generate it.
  assembleListItems(){
    const items = this.state.items;
    var listItems = [];
    switch(this.state.category){
        case "people":
          listItems = items.map((item, index) =>
            <Card> 
              <Accordion.Toggle as={Card.Header} variant="primary" eventKey={index+1}>
                {item.name}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={index+1}>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Height: {item.height} cm</ListGroup.Item>
                    <ListGroup.Item>Mass: {item.mass} kg</ListGroup.Item>
                    <ListGroup.Item>Hair: {item.hair_color}</ListGroup.Item>
                    <ListGroup.Item>Eyes: {item.eye_color}</ListGroup.Item>
                    <ListGroup.Item>Born: {item.birth_year}</ListGroup.Item>
                    <ListGroup.Item>Gender: {item.gender}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
          break;
        case "planets":
          listItems = items.map((item, index) =>
            <Card> 
              <Accordion.Toggle as={Card.Header} variant="primary" eventKey={index+1}>
                {item.name}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={index+1}>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Day: {item.rotation_period} hours</ListGroup.Item>
                    <ListGroup.Item>Year: {item.orbital_period} days</ListGroup.Item>
                    <ListGroup.Item>Diameter: {item.diameter} km</ListGroup.Item>
                    <ListGroup.Item>Climate: {item.climate}</ListGroup.Item>
                    <ListGroup.Item>Gravity: {item.gravity} g</ListGroup.Item>
                    <ListGroup.Item>Terrain: {item.terrain}</ListGroup.Item>
                    <ListGroup.Item>Water: {(item.surface_water) ? "yes" : "no"}</ListGroup.Item>
                    <ListGroup.Item>Population: {item.population}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
          break;
        case "species":
          listItems = items.map((item, index) =>
            <Card> 
              <Accordion.Toggle as={Card.Header} variant="primary" eventKey={index+1}>
                {item.name}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={index+1}>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Classification: {item.classification}</ListGroup.Item>
                    <ListGroup.Item>Designation: {item.designation}</ListGroup.Item>
                    <ListGroup.Item>Avg Height: {item.average_height} cm</ListGroup.Item>
                    <ListGroup.Item>Skin: {item.skin_colors}</ListGroup.Item>
                    <ListGroup.Item>Hair: {item.hair_colors}</ListGroup.Item>
                    <ListGroup.Item>Eyes: {item.eye_colors}</ListGroup.Item>
                    <ListGroup.Item>Avg Lifespan: {item.average_lifespan}</ListGroup.Item>
                    <ListGroup.Item>Language: {item.language}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
          break;
        case "vehicles":
          listItems = items.map((item, index) =>
            <Card> 
              <Accordion.Toggle as={Card.Header} variant="primary" eventKey={index+1}>
                {item.name}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={index+1}>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Model: {item.model}</ListGroup.Item>
                    <ListGroup.Item>Manufacturer: {item.manufacturer}</ListGroup.Item>
                    <ListGroup.Item>Cost: {item.cost_in_credits} credits</ListGroup.Item>
                    <ListGroup.Item>Length: {item.length} m</ListGroup.Item>
                    <ListGroup.Item>Max Speed: {item.max_atmosphering_speed} km/h</ListGroup.Item>
                    <ListGroup.Item>Crew: {item.crew}</ListGroup.Item>
                    <ListGroup.Item>Passengers: {item.passengers}</ListGroup.Item>
                    <ListGroup.Item>Cargo Cap.: {item.cargo_capacity} kg</ListGroup.Item>
                    <ListGroup.Item>Consumables: {item.consumables}</ListGroup.Item>
                    <ListGroup.Item>Class: {item.vehicle_class}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
          break;
        case "starships":
          listItems = items.map((item, index) =>
            <Card> 
              <Accordion.Toggle as={Card.Header} variant="primary" eventKey={index+1}>
                {item.name}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={index+1}>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Model: {item.model}</ListGroup.Item>
                    <ListGroup.Item>Manufacturer: {item.manufacturer}</ListGroup.Item>
                    <ListGroup.Item>Cost: {item.cost_in_credits} credits</ListGroup.Item>
                    <ListGroup.Item>Length: {item.length} m</ListGroup.Item>
                    <ListGroup.Item>Max Atmospheric Speed: {item.max_atmosphering_speed} km/h</ListGroup.Item>
                    <ListGroup.Item>Crew: {item.crew}</ListGroup.Item>
                    <ListGroup.Item>Passengers: {item.passengers}</ListGroup.Item>
                    <ListGroup.Item>Cargo Cap.: {item.cargo_capacity} kg</ListGroup.Item>
                    <ListGroup.Item>Consumables: {item.consumables}</ListGroup.Item>
                    <ListGroup.Item>Hyperdrive Rating: {item.hyperdrive_rating}</ListGroup.Item>
                    <ListGroup.Item>Class: {item.starship_class}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
          break;
        default:
          listItems = null;
    }
    return listItems;
  }
  // I know what you're thinking: Why is it {index+1} instead of just {index}?
  // The answer is simple. When I use {index} the first item in the Accordion
  // won't open. When I do {index+1}, it does. The indices of the Cards in the
  // Accordion are the same either way. Absolutely no clue why.

  getPageCount(){
    return this.state.showAll ? 1 : Math.ceil(this.state.overallCount/10);
  }

  setShowAll(target){
    if(target.value === "all")
    {
      this.setState({
        showAll: true,
        pageNumber: 1,
      }, this.getItems);
    }else{
      this.setState({
        showAll: false,
        pageNumber: 1,
      }, this.getItems);
    }
  }

  changePage(target){
    if(this.state.showAll){return;}
    var newPageUrl = null;
    if(target.value === "next"){
      newPageUrl = this.state.nextPage;
    }else{
      newPageUrl = this.state.previousPage;
    }
    // The null-check here stops us from attempting to change
    // to pages that don't exist. Not the only way, but the
    // easiest way.
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

  // What is a college education good for if not for adding
  // unnecessary recursion to a simplistic app?
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