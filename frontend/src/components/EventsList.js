import { Link } from "react-router-dom";
import classes from "./EventsList.module.css";

export default function EventsList({title, events}){
    return <div className={classes.events}>
    <main><h1>{title}</h1></main>
    <ul className={classes.list}>
      {events.map((event) => (
        <li key={event.id} className={classes.item}>
          <Link to={`/events/${event.id}`}>
            <img src={event.image} alt={event.title} />
            <div className={classes.content}>
              <h2>{event.title}</h2>
              <time>{event.date}</time>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
}