import { format } from "date-fns";
import './CalendarView.css';

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const DATES = Array(31).fill().map((x,i) => i+1);

console.log(DATES);

export default function CalendarView() {
    const currentDate = new Date();

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

                { DATES.map((date) => {
                    return <div key={ date } className="date">{ date }</div>
                })}
            </div>
        </>
    )
}