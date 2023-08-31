// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import {createBrowserRouter,RouterProvider} from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Home";
import EventsPage,{loader as eventsLoaderFun} from "./pages/Events";
import EventDetailsPage from "./pages/EventDetails";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import EventsLayoutPage from "./pages/EventsLayout";
import ErrorPage from "./pages/Error";

const router=createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {index:true, element:<HomePage/>},
      {
        path:"events",
        element:<EventsLayoutPage/>,
        children:[
          {
            index:true, 
            element:<EventsPage/>,
            loader:eventsLoaderFun,
          },
          {path:":eventId", element:<EventDetailsPage/>},
          {path:"new", element:<NewEventPage/>},
          {path:":editId/edit", element:<EditEventPage/>},
        ]
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
