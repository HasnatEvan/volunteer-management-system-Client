import Banner from "../../Shared/Banner";
import VolunteerNeedsNow from "../Components/VolunteerNeedsNow";
import Testimonials from "./Testimonials";
import UpcomingEvent from "./UpcommingEvent";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <VolunteerNeedsNow></VolunteerNeedsNow>
           <Testimonials></Testimonials>
           <UpcomingEvent></UpcomingEvent>
        </div>
    );
};

export default Home;