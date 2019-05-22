import React from 'react';
import './App.css';
import Tables from './Tables';
import Header from './Header';
import _ from 'lodash';
class App extends React.PureComponent {
  state = {
    source:'https://jsonplaceholder.typicode.com/posts',
    tableHeader:[],
    tableData: [],
  };

  constructor(props) {
    super(props);
    this.callApi(this.state.source);
}
  callApi = (link) => {
    fetch(link)
    .then(response => response.json())
    .then(json => {
      let tableHeader = _.keys(json[0]);
      this.setState({tableHeader, tableData: json, source:link});
    });
  }
  menuChange = (menu) => {
    let link = '';
    switch(menu) {
      case 'posts': link = 'https://jsonplaceholder.typicode.com/posts'; break;
      case 'todos': link = 'https://jsonplaceholder.typicode.com/todos'; break;
      case 'comments': link = 'https://jsonplaceholder.typicode.com/comments'; break;
      default : link = 'https://jsonplaceholder.typicode.com/posts'; break;
    }
    this.callApi(link);
  }
  render() {
    return (
    <div>
      <Header menuChange={this.menuChange} source={this.state.source}/>
      <Tables data={this.state.tableData}/>
    </div> )
  }
}

export default App;
