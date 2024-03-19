import { format } from "date-fns";
import { useRecoilState } from 'recoil';
import './Events.css';
import { eventsAtom } from '../../store/eventsAtom';

export default function Events() {
    const currentDate = new Date();
    const [events, setEvents] = useRecoilState(eventsAtom);

    return (
        <>
            <div className="events-main-div">
                <div className="events-title">
                    Upcoming Events
                </div>
                <hr className='line' />
                { events.map((event) => {
                    return (
                        <div key={ events.indexOf(event) } className="event" >
                            <div className="event-content">
                                <span className="event-date" style={{color: event.color}}>{event.date}th {format(currentDate, "MMMM")}:</span> {event.content}
                            </div>
                            <hr className='line' />
                        </div>
                    )
                })}
            </div>
        </>
    )
}