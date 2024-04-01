import useNowPlayingMovies from "../hooks/useNowPlayingMovie";
import Header from "./Header";
import SecondoryContainer from "./SecondoryContainer";
import MainContainer from "./MainContainer";



const Browse = () => {

    

    useNowPlayingMovies();
   
    return (
        <div>
            <Header />
            <MainContainer/>
            <SecondoryContainer/>

        </div>
    )

}

export default Browse;