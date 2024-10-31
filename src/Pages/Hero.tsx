// import Map from "../components/Map/MapComponent"
import RevisedMap from "../components/Map/RevisedMap"
import StateList from "../components/States/StateList"
import Zones from "../components/Zones/Zones"

const Hero = () => {
    return (
        <div className="h-full w-full">
            <RevisedMap />
            <StateList />
            <Zones />
        </div>
    )
}

export default Hero