import Card from "../components/Card";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";

export default function RootLayoutPage(){
    return <>
        <MainNavigation/>
        <Card>
            <Outlet/>
        </Card>
    </>
}