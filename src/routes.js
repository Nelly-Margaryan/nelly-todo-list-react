import ToDo from "./Pages/Todo/ToDo-List";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import SingleTask from "./Pages/SingleTask/SingleTask";
import NotFound from "./Pages/NotFound/NotFound";


const routes = [
    {
      path: "/",
      element: <ToDo />,
    },
    {
      path: "/todo",
      element: <ToDo />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/task/:taskId",
      element: <SingleTask />,
    },
    {
      path: "*",
      element: < NotFound />,
    }
  ];

  export {routes};