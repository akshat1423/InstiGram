import { useEffect } from 'react';
import SideNav from '../../components/NavBar/SideNav';
import './Calendar.css';
import { useRecoilState } from 'recoil';
import { calendarAtom } from '../../store/pageAtoms';
import { useNavigate } from 'react-router-dom';
import CalendarView from '../../components/CalendarView/CalendarView';
import Events from '../../components/Events/Events';

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
            <div className="calendar-container-div">
                <CalendarView></CalendarView>
                <Events></Events>
                <div className="calendar-close-button-div" onClick={() => navigate(-1)}></div>
            </div>
        </>
    )
}