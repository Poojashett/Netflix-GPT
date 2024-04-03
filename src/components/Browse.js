import useNowPlayingMovies from "../hooks/useNowPlayingMovie";
import Header from "./Header";
import SecondoryContainer from "./SecondoryContainer";
import MainContainer from "./MainContainer";
import usePopularMovies from "../hooks/usePopularMovies";



const Browse = () => {

    

    useNowPlayingMovies();
    usePopularMovies();
   
    return (
        <div>
            <Header />
            <MainContainer/>
            <SecondoryContainer/>

        </div>
    )

}

export default Browse;