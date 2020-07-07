import React, { useState, useEffect } from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';


const App = () => {
  //we use useState from react to create our state
  const [activities, setActivities] = useState<IActivity[]>([]);
  
  //no longer need componentDidMount
  useEffect(()=> {
    //add <IActivity[]> after the .get, telling that it should be getting an array of IActivities
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then(response => {
      //insted of using this.setState, use setActivities
      setActivities(response.data);
    });
    //the empty array added at the end ensures our useEffect onlky runs one time, instead of continuously
  }, [])

  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}


export default App;
