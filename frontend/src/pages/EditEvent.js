import { useRouteLoaderData } from "react-router-dom"
import EditForm from "../components/EventForm";

export default function EditEventPage(){

    const data=useRouteLoaderData("event-details");

    return <>
        <EditForm method="patch" event={data.event} />
    </>
};