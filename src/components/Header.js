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
        <div className="px-10 py-10 bg-gradient-to-b from-black absolute w-full flex justify-between items-center">
            <img className="w-36" src={NETFLIX_LOGO} alt="logo" />
            {(user &&
                <div className="flex items-center">
                    <img className="w-10 h-10 shadow-md mr-4 shadow-black" src={user?.photoURL} alt="logo" />
                    <p className="text-white  cursor-pointer" onClick={handleSignout}>Sign out</p>
                </div>)
            }
        </div>
    )
}

export default Header;