import React from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import User from './User';

export default class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: this.props.brothers,
      target: this.props.target,
    }
  }

  render() {
    return (
      <Tabs defaultActiveKey={this.state.selected[0].id} id="edit-brothers" onSelect={this.clearCurrent}>
        {this.state.selected.map(
          selection =>
          <Tab eventKey={selection.id} title={selection.last_name}>
            <User info={selection} admin={true} target={this.props.target}/>
          </Tab>
        )}
      </Tabs>
    )
  }
}
