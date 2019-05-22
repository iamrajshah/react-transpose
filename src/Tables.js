import React, { PureComponent } from 'react'
import {Table} from 'react-bootstrap';
import _ from 'lodash';


export default class Tables extends PureComponent {
  renderHeader = () => {
    return _.map(_.keys(this.props.data[0]),(e, index) => {return (<th key={index}>{e}</th>)});
   }
  
   renderTableData = () => {
     return _.map(this.props.data, (e) => {
        let data = _.values(e);
        return (<tr>{_.map(data, (e, index) => { return (<td key={index}>{e}</td>) })}</tr>)
      })
  
  
   }
  render() {
    return (
      <div>
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
      </div>
    )
  }
}
