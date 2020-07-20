import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';


const App = () => {
  //we use useState from react to create our state
  const [activities, setActivities] = useState<IActivity[]>([]);
  //useState<IActivity | null> means that our selected activity can be a type of IActivity, or it can be null (like if one isn't slected)
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>();
  //we will pass this function down to our activity list
  //activity dashboard will be the middleman
  const handleSelectActivity = (id: string) =>{
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }
  //we will toggle this edit boolean
  const [editMode, setEditMode] = useState(false);

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) =>{
    //use spread operator to add new activity to activities array
    setActivities([...activities, activity]);
    //show the details view for our new activity
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) =>{
    //filter out the activity we are edititing
    //and then just add the updated activity to the array
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) =>{
    setActivities([...activities.filter(a => a.id !== id)])
  }

  //no longer need componentDidMount
  useEffect(()=> {
    //this is our get request. getting our list of activities
    agent.Activities.list().then(response => {
      let activities: IActivity[] = [];
      //reformat the date so our html can read it
      response.forEach(activity =>{
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      //insted of using this.setState, use setActivities
      setActivities(activities);
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
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
      
    </Fragment>
  );
}


export default App;
