import { useFetcher, useActionData } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";
import { useEffect } from "react";

export default function NewsletterSignup(){
    const fetcher= useFetcher();

    // const { message } = useActionData();

    const { data, state } = fetcher;

    useEffect(()=>{
        if(state==="idle" && data && data.message){
            window.alert(data.message);
        }
    },[state, data]);

    return <fetcher.Form method="post" action="/newsletter" className={classes.form}>
        <input id="email" type="email" name="email" placeholder="Signup for newsletter..." />
        <button>Signup</button>
    </fetcher.Form>
}