import React, { useState, useEffect, Fragment } from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';


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
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <List>
          {activities.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </Container>
      
    </Fragment>
  );
}


export default App;
