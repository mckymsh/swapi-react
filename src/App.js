import React, {Component} from 'react';
import SWAPIService from './swapi-service';
// import './App.css';

class App extends Component{

  constructor(props){
    super(props);
    this.swapiService = new SWAPIService();
    this.state = {
      items: null
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
        </header>
        <ol>
          {listItems}
        </ol>
        <p>halp</p>
      </div>
    );
  }

  getItems(){
    this.swapiService.retrieveItems()
    .then(items => {
      this.setState({items: items});
    });
  }
}

export default App;