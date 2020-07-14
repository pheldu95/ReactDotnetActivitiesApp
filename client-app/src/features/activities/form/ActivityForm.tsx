import React, {useState, FormEvent} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid} from 'uuid';

interface IProps{
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;

}

const ActivityForm: React.FC<IProps> = ({
    setEditMode, 
    activity: initialFormState,
    createActivity,
    editActivity
}) => {
    
    const initializeForm = () =>{
        if (initialFormState){
            return initialFormState;
        }else{
            return{
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);
    
    const handleSubmit = () => {
        console.log(activity);
        //if there is not id, then we know we are creating a new activity, not editing
        //so we use the spread operator to add a guid to the activity object
        //esle, we are editing, so we simply pass it to our editActivity function
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        }else{
            editActivity(activity)
        }
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        //event.currentTarget is the same as event.target, except it is for FormEvents, instead of ChangeEvents. We use FormEvent b/c we have a text area for our description
        //destructure event so that we dont have to type out event.currentTarget.name and event.currentTarget.value
        const {name, value} = event.currentTarget;
        //setActiviy is like using this.setState in class components
        setActivity({
            ...activity,
            [name]: value
        })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity.title}/>
                <Form.TextArea onChange={handleInputChange} name='description' rows={2} placeholder='Description' value={activity.description} />
                <Form.Input onChange={handleInputChange} name='category' placeholder='Category' value={activity.category}/>
                <Form.Input onChange={handleInputChange} name='date' type='datetime-local' placeholder='Date' value={activity.date} />
                <Form.Input onChange={handleInputChange} name='city' placeholder='City' value={activity.city}/>
                <Form.Input onChange={handleInputChange} name='venue' placeholder='Venue' value={activity.venue}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default ActivityForm