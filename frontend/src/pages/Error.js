import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
export default function ErrorPage(){

    const error=useRouteError();

    let title="An Error occured!";
    let msg="Something went wrong!";

    if(error.status===500){
        // msg=JSON.parse(error.data).message;
        msg=error.data.message;
    }
    if(error.status===404){
        title="Not found!";
        msg="Page not found!";
    }

    return <>
        <MainNavigation/>
        <main>
            <h1>{title}</h1>
            <p>{msg}</p>
        </main>
    </>
}