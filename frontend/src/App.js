import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RootLayoutPage from "./pages/RootLayoutPage";
import EditEventPage from "./pages/EditEventPage";
import EventDetailsPage, {loader as eventDetailsLoader, action as deleteAction} from "./pages/EventDetailsPage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import NewEventPage from "./pages/NewEventPage";
import ErrorPage from "./pages/ErrorPage";
import EventsLayoutPage from "./pages/EventsLayoutPage";
import NewsletterPage,{ action as newsletterAction } from "./pages/NewsletterPage";
import { action as manipulateFormAction } from "./components/EventForm";

const router=createBrowserRouter([
  {
    path:"/",
    element:<RootLayoutPage/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        index:true, element:<HomePage/>,
      },
      {
        path:"events", element:<EventsLayoutPage/>,
        children:[
          {
            index:true, element:<EventsPage/>,
            loader: eventsLoader,
          },
          {
            path:":eventId",
            loader: eventDetailsLoader,
            id: "event-details",
            children:[
              {
                index:true, element:<EventDetailsPage/>,
                action: deleteAction,
              },
              {
                path:"edit", element:<EditEventPage/>,
                action: manipulateFormAction,
              },
            ]
          },
          {
            path:"new", element:<NewEventPage/>,
            action: manipulateFormAction,
          }
        ]
      },
      {
        path:"newsletter", element:<NewsletterPage/>,
        action:newsletterAction,
      }
    ]
  }
])

function App() {
  return <>
    <RouterProvider router={router}/>
  </>;
}

export default App;
