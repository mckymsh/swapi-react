import React, {Component} from 'react';
import SWAPIService from './swapi-service';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToggleButtonGroup, ToggleButton, Alert} from 'react-bootstrap';
// import './App.css';

class App extends Component{

  constructor(props){
    super(props);
    this.swapiService = new SWAPIService();
    this.state = {
      items: null,
      baseUrl: "https://swapi.dev/api/",
      category: "people",
      overallCount: 0,
      sort: "name",
      sortDirection: "ascending",
      showAll: false,
    }
  }

  componentDidMount(){
    this.getItems();
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
    if(!items) return null;
    const listItems = items.map((item) =>
      <li>
        <span className="item-name">{item.name}</span>
      </li>
    )
    return (
      <div className="app">
        <header className="app-header">
          <h1>This is a header.</h1>
          <div className="Buttons">
            <div className="category-buttons">
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
            </div>
            <div className="page-buttons">
              <ToggleButton 
                type="checkbox"
                variant="secondary" 
                checked={this.state.showAll}
                onChange={(e) => this.setShowAll(e.currentTarget)}
              >
              Show All
              </ToggleButton>
        </div>
          </div>
          <Alert className="item-count" variant='info'>Count: {this.state.overallCount}</Alert>
        </header>
        <ol>
          {listItems}
        </ol>
      </div>
    );
  }

  setShowAll(target){
    var checked = this.state.showAll;
    this.setState({
      showAll: !checked,
    }, this.getItems);
  }

  setCategory(newCategory){
    this.setState({
      category: newCategory,
    }, this.getItems);
  }

  async getItems(){
    const url = this.state.baseUrl + this.state.category + "/";
    var newItems = []
    if(this.state.showAll){
      newItems = await this.getItemsRecursive(url);
    }else{
      var tempData = await this.swapiService.retrieveRequest(url);
      this.setState({
        overallCount: tempData.count,
      });
      newItems = tempData.results;
    }
    this.setState({
      items: newItems,
    });
    // for(var i = 0; i < newItems.length; i++){
    //   document.write(newItems[i].name);
    // }
  }

  async getItemsRecursive(url){
    const json = await this.swapiService.retrieveRequest(url);
    this.setState({
        overallCount: json.count,
      });
    if(json.next === null){
      return json.results;
    }else{
      var nextURL = json.next.slice(0,4) + "s" + json.next.slice(4);
      var tempResults = await this.getItemsRecursive(nextURL);
      return json.results.concat(tempResults);        
    }
  }
}

export default App;