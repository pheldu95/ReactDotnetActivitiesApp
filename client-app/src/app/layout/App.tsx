import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';

interface IState {
  activities: IActivity[]
}

class App extends Component<{}, IState> {
  //tell our state it is of type IState, which we defined above
  //types defined in IActivity will now be checked
  //make it readonly. so only way we can modify it is by using this.setState
  readonly state: IState = {
    activities: []
  };

  componentDidMount() {
    //add <IActivity[]> after the .get, telling that it should be getting an array of IActivities
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then(response => {
      this.setState({
        activities: response.data
      });
    });
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {this.state.activities.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
