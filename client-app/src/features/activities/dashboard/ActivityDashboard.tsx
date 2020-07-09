import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

//telling the dashboard what the props will look like
interface IProps{
    activities: IActivity[];
    //this function will also be received throguh props
    //it is coming from App.tsx. it has an id string as an arguemtn and returns void
    selectActivity: (id: string) => void;
    //will be an IActivity or null
    selectedActivity: IActivity | null;
}
//{activites} is just destructuring props.activities. it's the same thing
//but now we can just type activities instead of props.activities when we are mapping it
const ActivityDashboard: React.FC<IProps> = ({ activities, selectActivity, selectedActivity}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid.Column>
            <Grid.Column width= {6}>
                {selectedActivity &&
                    <ActivityDetails activity={selectedActivity}/>
                }
                <ActivityForm/>
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard
