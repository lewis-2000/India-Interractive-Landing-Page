import Navbar from "../components/Navs/LeftIconContent"
// import MapComponent from "../components/map/Map"
import RevisedMap from "../components/map/RevisedMap"
const Hero = () => {
    return (
        <div className="bg-black overflow-hidden">
            <Navbar />
            {/* <MapComponent /> */}
            <RevisedMap />

        </div>
    )
}

export default Hero