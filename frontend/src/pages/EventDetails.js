import { Suspense } from 'react';
import { useRouteLoaderData, json, redirect, defer, Await } from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

function EventDetailsPage() {
  const data = useRouteLoaderData('event-details');

  const {event, events} = data;

  return (
    <>
        <Suspense fallback={<main>
            <p>Loading...</p>
        </main>}
        >
            <Await resolve={event}>
                {(loadedEvent)=>{
                    return <EventItem event={loadedEvent} />
                }}
            </Await>
        </Suspense>

        <Suspense fallback={<main>
            <p>Loading...</p>
        </main>}
        >
            <Await resolve={events}>
                {(loadedEvents)=>{
                    return <EventsList events={loadedEvents} />
                }}
            </Await>
        </Suspense>
    </>
  )
}
export default EventDetailsPage;

const loadEvent= async (id)=>{
    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw json(
        { message: 'Could not fetch details for selected event.' },
        {
            status: 500,
        }
        );
    } else {
        const resData= await response.json();
        return resData.event;
    }
};

const loadEvents= async ()=>{
    const response = await fetch('http://localhost:8080/events');
  
          if (!response.ok){
  
            throw json({message:"Couldn't fetch events!"},{status:500});
  
          } else {
            const resData = await response.json();
            return resData.events;
          }
  };

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete event.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/events');
}