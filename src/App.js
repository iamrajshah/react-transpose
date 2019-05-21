import React from 'react';
import {Table, Dropdown} from 'react-bootstrap';
import _ from 'lodash';

import './App.css';

class App extends React.PureComponent {
  state = {
    source:'https://jsonplaceholder.typicode.com/posts',
    tableHeader:[],
    tableData: [],
  };

  constructor(props) {
    super(props);
    fetch(this.state.source)
    .then(response => response.json())
    .then(json => {
      let tableHeader = _.keys(json[0]);
      this.setState({tableHeader, tableData: json});
  });
}
 renderHeader = () => {
  return _.map(this.state.tableHeader,(e) => {return (<th>{e}</th>)});
 }

 renderTableData = () => {
   return _.map(this.state.tableData, (e) => {
      let data = _.values(e);
      return (<tr> {_.map(data, (e) => { return (<td>{e}</td>) })}</tr>)
    })


 }

  menuChange = (menu) => {
    let link = '';
    switch(menu) {
      case 'posts': link = 'https://jsonplaceholder.typicode.com/posts'; break;
      case 'todos': link = 'https://jsonplaceholder.typicode.com/todos'; break;
      case 'comments': link = 'https://jsonplaceholder.typicode.com/comments'; break;
      default : link = 'https://jsonplaceholder.typicode.com/posts'; break;
    }
    fetch(link)
    .then(response => response.json())
    .then(json => {
      let tableHeader = _.keys(json[0]);
      this.setState({tableHeader, tableData: json, source:link});
  });
  }
  render() {
    return (
    <div>
      <div >
        <label className="labelClass">Current Source:</label>
        <input type="text" value={this.state.source} className="inputField" disabled/>
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdownClass">
          Select Source
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onSelect={(e)=>this.menuChange('posts')}>Posts</Dropdown.Item>
          <Dropdown.Item onClick={(e)=>this.menuChange('comments')}>Comments</Dropdown.Item>
          <Dropdown.Item onClick={(e)=>this.menuChange('todos')}>Todos</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Table striped bordered hover>
          <thead>
            <tr>
              {this.renderHeader()}
            </tr>
          </thead>
          <tbody>
            {this.renderTableData()}
          </tbody>
      </Table>
    </div> )
  }
  
}

export default App;
