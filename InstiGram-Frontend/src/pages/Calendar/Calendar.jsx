import { useEffect } from 'react';
import SideNav from '../../components/NavBar/SideNav';
import './Calendar.css';
import { useRecoilState } from 'recoil';
import { calendarAtom } from '../../store/pageAtoms';
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
    const [calendar, setCalendar] = useRecoilState(calendarAtom);
    const navigate = useNavigate();

    useEffect(() => {
        setCalendar(true);

        return () => {
            setCalendar(false);
        }
    }, [])

    return (
        <>
            <SideNav />
            <div className="calendar-main-div">
            <div className="calendar-close-button-div" onClick={() => navigate(-1)}></div>
            </div>
        </>
    )
}