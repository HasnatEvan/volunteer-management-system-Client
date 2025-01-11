import Banner from "../../Shared/Banner";
import VolunteerNeedsNow from "../Components/VolunteerNeedsNow";
import ContactUs from "./ContactUs";
import Testimonials from "./Testimonials";
import UpcomingEvent from "./UpcommingEvent";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <VolunteerNeedsNow></VolunteerNeedsNow>
           <Testimonials></Testimonials>
           <UpcomingEvent></UpcomingEvent>
           <ContactUs></ContactUs>
        </div>
    );
};

export default Home;