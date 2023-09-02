import { useRouteError } from "react-router-dom";
import ContentComponent from "../components/ContentComponent";
import MainNavigation from "../components/MainNavigation";
import Card from "../components/Card";

export default function ErrorPage(){
    const err= useRouteError();

    let title= "An error occured!";
    let msg= "Something went wrong!";

    if(err.status===500){
        msg= err.data.message;
    }

    if(err.status===404){
        title = "Page not found!";
        msg= "Couldn't find the page or resource!";
    }

    return <>
        <MainNavigation/>
        <Card>
            <ContentComponent title={title}>
                <p>{msg}</p>
            </ContentComponent>
        </Card>
    </>
}