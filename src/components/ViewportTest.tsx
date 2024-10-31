import { useAppDispatch, useAppSelector } from "../store/store"
import { setMobileView } from "../store/viewportSlice"
import { useEffect } from "react";

const ViewportTest = () => {
    const dispatch = useAppDispatch();
    const isMobile = useAppSelector(state => state.viewport.isMobile);

    const updateMobile = () => {
        const width = window.innerWidth;
        dispatch(setMobileView(width <= 768));


    }

    useEffect(() => {
        window.addEventListener('resize', updateMobile);
        return () => window.removeEventListener('resize', updateMobile);

    }, [dispatch])



    return (
        <div>
            {isMobile ? <h1>Mobile</h1> : <h1>desktop</h1>}

        </div>

    )
}

export default ViewportTest