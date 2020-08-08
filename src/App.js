import React, {Component} from 'react';
import SWAPIService from './swapi-service';
// import './App.css';

class App extends Component{

  constructor(props){
    super(props);
    this.swapiService = new SWAPIService();
    this.state = {
      items: null,
      baseUrl: "https://swapi.dev/api/",
      category: "people",
      sort: "name",
      sortDirection: "ascending",
    }
  }

  componentDidMount(){
    this.getItems();
  }
  
  render(){
    const items = this.state.items;
    if(!items) return null;
    const listItems = items.map((item) =>
      <li>
        <span className="item-name">{item.name}</span>
      </li>
    )
    return (
      <div className="App">
        <header className="App-header">
          <h1>This is a header.</h1>
          <div className="Buttons">
          </div>
          <span className="Item-count">Items: {listItems.length}</span>
        </header>
        <ol>
          {listItems}
        </ol>
      </div>
    );
  }

  async getItems(){
    // const url = "https://swapi.dev/api/people/";
    const url = this.state.baseUrl + this.state.category + "/";
    const newItems = await this.getItemsRecursive(url);
    this.setState({
      items: newItems,
    });
  }

  async getItemsRecursive(url){
    const data = await this.swapiService.retrieveRequest(url);
    const json = data;
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