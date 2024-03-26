import Header from "./Header";
import { useState } from "react"


const Login = () => {

    const [issigninForm, setissigninForm] = useState([true]);

    const toggleSignupForm = () => {
        setissigninForm(!issigninForm);
        console.log(issigninForm);
    }

    return (
        <div>
            <Header />
            <div>
                <form className="bg-opacity-80 bg-black absolute p-12 w-[35%] my-36 mx-auto right-0 left-0 text-white">
                    <h1 className="font-bold text-3xl py-2">
                        {issigninForm ? "Sign In " : "Sign Up"}
                    </h1>

                    {!issigninForm && (
                        <input type="text" placeholder="Name" className="p-4 my-4 w-full bg-black bg-opacity-80 border border-gray-400" />
                    )
                    }

                    <input type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-black bg-opacity-80 border border-gray-400" />
                    <input type="password" placeholder="Password" className="p-4 my-4 w-full bg-black bg-opacity-80 border border-gray-400" />
                    <button className="p-4 my-2 bg-red-700 w-full rounded">
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