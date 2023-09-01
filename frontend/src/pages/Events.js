// import { useEffect, useState } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { Suspense } from 'react';

import EventsList from '../components/EventsList';


function EventsPage() {

    const data=useLoaderData();
    const events=data.events;

  return (
    <Suspense fallback={
                        <main>
                            <p>Loading...</p>
                        </main>
      } >
      <Await resolve={events}>
        {(loadedEvents)=>{
          return <EventsList events={loadedEvents}/>
        }}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

const loadEvents= async ()=>{
  const response = await fetch('http://localhost:8080/events');

        if (!response.ok) {
          // throw new Error("Couldn't fetch events!");
          // throw {message : "Couldn't fetch events",};
          // throw new Response(JSON.stringify({message:"Couldn't fetch events!"}),{status:500});

          throw json({message:"Couldn't fetch events!"},{status:500});

        } else {
          const resData = await response.json();
          return resData.events;
        }
};

export const loader= async ()=>{
        return defer({
          events:loadEvents(),
        });
};