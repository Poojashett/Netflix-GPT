import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/Constants";


const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
       const unsuscribe= onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                navigate("/browse")
            } else {
                dispatch(removeUser());
                navigate("/")
            }
        });
        
        //unsuscribe when comp unmounts
        return () => unsuscribe();
    }, []);

    const handleSignout = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            navigate("/error")
        });
    }

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
            <img className="w-44 mx-auto md:mx-0" src={NETFLIX_LOGO} alt="logo" />
            {(user &&
                <div className="flex p-2 justify-between">
                    <img className="w-10 h-10 shadow-md mr-4 shadow-black" src={user?.photoURL} alt="logo" />
                    <p className="font-bold text-white cursor-pointer pt-3" onClick={handleSignout}>Sign out</p>
                </div>)
            }
        </div>
    )
}

export default Header;


