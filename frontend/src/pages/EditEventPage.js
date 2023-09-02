import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EditEventPage(){
    const {eventKey} = useRouteLoaderData("event-details");

    return <>
        <EventForm method="patch" event={eventKey} />
    </>
}