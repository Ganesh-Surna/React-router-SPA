import {Link} from "react-router-dom";
export default function HomePage(){
    return <>
        <h1>Home Page</h1>
        <p>Go to <Link to="events">Events Page</Link></p>
    </>
};