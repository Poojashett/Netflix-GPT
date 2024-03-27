import { useEffect } from "react";
import Login from "./Login";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import Browse from "./Browse";



const Body = () =>{

    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element:<Login/>
        } ,
        {
            path: "/browse",
            element: <Browse />
        } 
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
            } else {
               dispatch(removeUser());
            }
        });
    }, []);

    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
}



export default Body;