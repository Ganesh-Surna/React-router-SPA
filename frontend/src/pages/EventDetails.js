import { useParams, Link } from "react-router-dom";

export default function EventDetailsPage(){
    const params=useParams();

    return <>
        <h1>Event Details Page</h1>
        <p>{params.eventId}</p>
        <p><Link to=".." relative="path">Back</Link></p>
    </>
};