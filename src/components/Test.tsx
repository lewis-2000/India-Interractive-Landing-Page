import { useAppSelector } from '../store/store'

const Test = () => {
    // Get GeoJSON data from Redux store

    const geoData = useAppSelector((state) => state.geoJson.data);

    return (
        <>
            <h1>GeoJson Data</h1>
            <pre>{JSON.stringify(geoData, null, 2)}</pre>

        </>

    )
}

export default Test