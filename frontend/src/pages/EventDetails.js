import { useParams, Link, useLoaderData, json } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetailsPage(){
    // const params=useParams();

    const data=useLoaderData();

    return <>
        <EventItem event={data.event} />
        <p><Link to=".." relative="path">Back</Link></p>
    </>
};

export const loader=async({request, params})=>{
    const id=params.eventId;
    console.log(id);

    const response= await fetch("http://localhost:8080/events/"+id);

    if(!response.ok){
        return json({message:"Couldn't fetch event details!"},{status:500});
    }
    else{
        return response;
    }
};