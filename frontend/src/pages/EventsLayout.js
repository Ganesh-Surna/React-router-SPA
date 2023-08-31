import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

export default function EventsLayoutPage(){
    return <>
        <EventsNavigation/>
        <main>
            <Outlet/>
        </main>
    </>
}