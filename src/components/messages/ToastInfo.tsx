import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastInfo = () => {
    useEffect(() => {
        toast.info('Click on a state or zone to check tours and itineraries', {
            position: window.innerWidth <= 768 ? "top-center" : "bottom-center",
            autoClose: 15000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: window.innerWidth <= 768 ? 'toast-mobile' : 'toast-desktop',
        });
    }, []);

    return <ToastContainer />;
};

export default ToastInfo;
