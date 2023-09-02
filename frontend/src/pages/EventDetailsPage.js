import { Suspense } from "react";
import { Await, useRouteLoaderData, defer, json, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

export default function EventDetailsPage(){

    const {eventKey, eventsKey} = useRouteLoaderData("event-details");

    return <>
        <Suspense fallback={<main><p>Loading...</p></main>}>
            <Await resolve={eventKey}>
                {(loadedEvent)=><EventItem event={loadedEvent}/>}
            </Await>
        </Suspense>
        <Suspense fallback={<main><p>Loading...</p></main>}>
            <Await resolve={eventsKey}>
                {(loadedEvents)=>{
                    const filteredEvents= loadedEvents.filter((eventItem)=>{
                        return eventItem.id !== eventKey.id;
                    });
                    return <EventsList title="All Related Events" events={filteredEvents}/>
                }}
            </Await>
        </Suspense>
    </>
}

const eventLoader= async(id)=>{
    const response= await fetch("http://localhost:8080/events/"+id);

    if(!response.ok){
        throw json({message: "Couldn't fetch event details!"},{status:500});
    }

    else{
        const resData = await response.json();
        return resData.event;
    }
};

const eventsLoader=async()=>{
    const response= await fetch("http://localhost:8080/events");

    if(!response.ok){
        throw json({message: "Couldn't fetch events!"},{status:500});
    }

    else{
        const resData = await response.json();
        return resData.events;
    }
};

export const loader=async({request, params})=>{
    const id= params.eventId;

    return defer({
        eventKey: await eventLoader(id),
        eventsKey: eventsLoader(),
    });
}

export const action= async ({request, params})=>{
    const id= params.eventId;

    const response= await fetch("http://localhost:8080/events/"+id,
        {
            method: request.method,
        }
    );

    if(!response.ok){
        throw json({message: "Couldn't delete event!"},{status:500});
    }
    else{
        window.alert("Event Deleted Successfully!");

        return redirect("/events");
    }

}