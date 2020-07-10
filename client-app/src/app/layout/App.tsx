import React, { useState, useEffect, Fragment } from 'react';
import { Header, Icon, List, Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


const App = () => {
  //we use useState from react to create our state
  const [activities, setActivities] = useState<IActivity[]>([]);
  //useState<IActivity | null> means that our selected activity can be a type of IActivity, or it can be null (like if one isn't slected)
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>();
  //we will pass this function down to our activity list
  //activity dashboard will be the middleman
  const handleSelectActivity = (id: string) =>{
    setSelectedActivity(activities.filter(a => a.id === id)[0])
  }
  //we will toggle this edit boolean
  const [editMode, setEditMode] = useState(false);

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

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
      <NavBar openCreateForm={handleOpenCreateForm}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectActivity}
          //the exclamation mark says it will either be an activity (IActivity) or null
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
        />
      </Container>
      
    </Fragment>
  );
}


export default App;
