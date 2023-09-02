import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventsPage(){
    const {eventsKey}= useLoaderData();

    return <>
        <Suspense fallback={<main><p>Loading...</p></main>}>
            <Await resolve={eventsKey}>
                {(loadedEvents)=>{
                    return <EventsList title="All Events" events={loadedEvents}/>
                }}
            </Await>
        </Suspense>
    </>
}

const eventsLoader=async()=>{
    const response= await fetch("http://localhost:8080/events");

    if(!response.ok){
        throw json({message: "Couldn't fetch events!"},{status:500});
    }

    else{
        const resData = await response.json();
        return resData.events;
    }
}

export const loader=()=>{
    return defer({
        eventsKey : eventsLoader(),
    });
}