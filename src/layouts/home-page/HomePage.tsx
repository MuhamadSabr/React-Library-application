import { ExploreTopBooks } from './components/ExploreTopBooks';
import {Carousel} from './components/Carousel';
import { Heros } from './components/Heros';
import { LibraryServices } from './components/LibraryServices';


export const HomePage = ()=>{

    sessionStorage.setItem("redirectPath", "/")

    return(
        <>
            <ExploreTopBooks />
            <Carousel />
            <Heros />
            <LibraryServices />
        </>
    );

}
