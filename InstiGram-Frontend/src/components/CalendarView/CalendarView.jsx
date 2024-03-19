import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from "date-fns";
import './CalendarView.css';
import { useRecoilValue } from "recoil";
import { eventsAtom } from "../../store/eventsAtom";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const DATES = Array(31).fill().map((x,i) => i+1);

export default function CalendarView() {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDatOfMonth = endOfMonth(currentDate);
    const events = useRecoilValue(eventsAtom);

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDatOfMonth,
    });

    const startingDayIndex = getDay(firstDayOfMonth);

    return (
        <>
            <div className="calendar-main-div">
                <div className="month-name">
                    {format(currentDate, "MMMM yyyy")}
                </div>
                <div className="day-titles">
                    { WEEKDAYS.map((day) => {
                        return <div key={ day } className="day-title" >{ day }</div>
                    })}
                </div>

                { Array.from({length: startingDayIndex}).map((_, index) => {
                    return <div key={ `empty-${index}` }></div>
                })}

                { daysInMonth.map((day, index) => {
                    const date = format(day, 'd');
                    const todaysEvents = events.filter((event) => event.date == date);
                    const hasEvents = (todaysEvents.length != 0);
                    return <div key={ index } className={"date " + (isToday(day) ? "today " : "")} style={ hasEvents ? {background: todaysEvents[0].color}: {}}>
                        { format(day, "d") }
                    </div>
                })}
            </div>
        </>
    )
}