// import { useEffect, useState } from 'react';
import { useLoaderData, json } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {

    const data=useLoaderData();
    const events=data.events;

  return (
    <>
       <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export const loader= async ()=>{
        const response = await fetch('http://localhost:8080/events');

        if (!response.ok) {
          // throw new Error("Couldn't fetch events!");
          // throw {message : "Couldn't fetch events",};
          // throw new Response(JSON.stringify({message:"Couldn't fetch events!"}),{status:500});

          throw json({message:"Couldn't fetch events!"},{status:500});

        } else {
          const resData = await response.json();
          return resData;
        }
};