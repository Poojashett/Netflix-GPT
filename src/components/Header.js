import { signOut } from "firebase/auth";
import { auth } from "../utils/Auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    const handleSignout = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            navigate("/error")
        });
    }

    return (
        <div className="px-10 py-10 bg-gradient-to-b from-black absolute w-full flex justify-between items-center">
            <img className="w-36" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
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