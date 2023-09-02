import { Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigationObj=useNavigation();
  const isSubmitting = navigationObj.state==="submitting";

  const data= useActionData();

  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
        {
            data && data.errors && 
            <ul>
                {Object.keys(data.errors).map((err)=>{
                    return <p key={err} >{data.errors[err]}</p>
                })}
            </ul>
        }
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ""} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ""} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required  defaultValue={event ? event.date : ""} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ""} />
      </p>
      <div className={classes.actions}>
        <button type="button"  disabled={isSubmitting} onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export const action = async({request, params})=>{

    const data= await request.formData();

    const enteredEventData= {
        title: data.get("title"),
        image: data.get("image"),
        date: data.get("date"),
        description: data.get("description"),
    }

    const method= request.method;

    let url="http://localhost:8080/events";

    if(method==="PATCH"){
        const id= params.eventId;
        url= "http://localhost:8080/events/"+id;
    }

    const response= await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(enteredEventData),
    });

    if(response.status===422){
        return response;
    }

    if(!response.ok){
        throw json({message: "Couldn't save the event data!"}, {status:500});
    }
    
    return redirect("/events");
}