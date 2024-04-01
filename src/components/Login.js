import Header from "./Header";
import { useRef, useState } from "react";
import { Validation } from "../utils/Validation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/Auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";




const Login = () => {


    const [issigninForm, setissigninForm] = useState([true]);
    const [errormessage, setErrormessage] = useState([""]);



    const email = useRef(null);
    const passowrd = useRef(null);
    const name = useRef(null);
    const dispatch = useDispatch();


    const toggleSignupForm = () => {
        setissigninForm(!issigninForm);
    }

    const handleButtonClick = () => {
        const message = Validation(email?.current?.value, passowrd?.current?.value);
        setErrormessage(message);
        if (message) return;

        if (!issigninForm) {
            createUserWithEmailAndPassword(auth, email?.current?.value, passowrd?.current?.value)
                .then((userCredential) => {
                    const user = userCredential?.user;
                    updateProfile(user, {
                        displayName: name?.current?.value, photoURL: "https://avatars.githubusercontent.com/u/88236196?v=4"
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
                    }).catch((error) => {
                        setErrormessage(error?.message);
                    });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrormessage(errorCode + " " + errorMessage);
                });
        } else {
            //sign in
            signInWithEmailAndPassword(auth, email.current.value, passowrd.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('user: ', user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrormessage(errorCode + " " + errorMessage);
                });
        }


    }

    return (
        <div>
            <Header />
            <div>
                <form onSubmit={(event) => event.preventDefault()} className="bg-opacity-80 bg-black absolute p-12 w-[35%] my-36 mx-auto right-0 left-0 text-white">
                    <h1 className="font-bold text-3xl py-2">
                        {issigninForm ? "Sign In " : "Sign Up"}
                    </h1>

                    {!issigninForm && (
                        <input ref={name} type="text" placeholder="Name" className="p-4 my-4 w-full bg-black bg-opacity-80 border border-gray-400" />
                    )
                    }

                    <input type="text" ref={email} placeholder="Email Address" className="p-4 my-4 w-full bg-black bg-opacity-80 border border-gray-400" />
                    <input type="password" ref={passowrd} placeholder="Password" className="p-4 my-4 w-full bg-black bg-opacity-80 border border-gray-400" />
                    <p className="text-red-500">{errormessage}</p>
                    <button className="p-4 my-2 bg-red-700 w-full rounded" onClick={handleButtonClick}>
                        {issigninForm ? " Sign In" : "Sign Up"}
                    </button>

                    <p className="p-4 cursor-pointer">
                        <span onClick={toggleSignupForm} > {issigninForm ? "New to Netflix? Sign Up Now" : "Already Registred ? Sign In Now"} </span>
                    </p>

                </form>
            </div>
            <div>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-hi-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="img" />
            </div>
        </div>
    )

}

export default Login;