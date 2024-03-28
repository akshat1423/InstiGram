import { useEffect } from 'react';
import SideNav from '../../components/NavBar/SideNav';
import './Calendar.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { calendarAtom } from '../../store/pageAtoms';
import { useNavigate } from 'react-router-dom';
import CalendarView from '../../components/CalendarView/CalendarView';
import Events from '../../components/Events/Events';
import { eventsAtom } from '../../store/eventsAtom';
import { BASE_URL, getCookie } from '../../App';

export default function Calendar() {
    const setEvents = useSetRecoilState(eventsAtom);
    const [calendar, setCalendar] = useRecoilState(calendarAtom);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/events`, {
            method: "POST",
            // credentials: "include",
            headers: {
                "Content-type": 'application/json',
                "Cookie": `sessionid=${getCookie('sessionid')}`
            },
        })
            .then( async function (res) {
                const json = await res.json();
                if (res.status == 200) {
                    setEvents(json);
                } else if (res.status == 401) {
                    navigate('/signin');
                }
            })
    }, [])

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