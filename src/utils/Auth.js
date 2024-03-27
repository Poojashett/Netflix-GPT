import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCFSb_ipqB7YkBMn6qP68egPlnqjb0Ald0",
    authDomain: "netflixgpt-57a56.firebaseapp.com",
    projectId: "netflixgpt-57a56",
    storageBucket: "netflixgpt-57a56.appspot.com",
    messagingSenderId: "1093133802935",
    appId: "1:1093133802935:web:c284961959cce2a54adc32",
    measurementId: "G-DEHFXGZ999",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);