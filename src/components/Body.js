import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";



const Body = () => {


    const appRouter = createBrowserRouter([ 
        {
            path: "/",
            element: <Login/>
        },
        {
            path:"/browse",
            element: <Browse/>
        },
    ]);


   //i want to use the below api for once so im using useeffect



  return (
    <div>
    <RouterProvider router={appRouter}/>
    </div>
  );
};

export default Body;
