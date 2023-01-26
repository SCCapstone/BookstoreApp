import  React, { useState } from "react";
import Calendar from 'react-calendar';

const EmployeeHomepage = () => { 
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showUsers, setShowUsers] = useState(false);

    const handleEventSubmit = (event) => {
        event.preventDefault();
        const newEvent = {
            title: event.target.eventTitle.value,
            start: event.target.eventStart.value,
            end: event.target.eventEnd.value,
        };
        setEvents([...events, newEvent]);
    }

    return ( 
    <div> 
        <h1 className="text-2xl font-medium mb-4 text-center">
            Welcome, Employee!
        </h1> 
        <h2 className="text-lg font-medium mb-4 text-center">
            Upcoming Meeting
        </h2>
        <Calendar 
            value={date}
            onChange={setDate}
        />
            <ul className="list-disc pl-4">
                {events.map((event, index) => (
                    <li key={index} className="mb-2">
                        {event.title} on {event.start}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleEventSubmit}>
                <label>
                    Title:
                    <input type="text" name="eventTitle" />
                </label>
                <label>
                    Start Time:
                    <input type="datetime-local" name="eventStart" />
                </label>
                <label>
                    End Time:
                    <input type="datetime-local" name="eventEnd" />
                </label>
                <button type="submit" className="text-black hover:bg-blue-600">
                    Add Event
                </button>
            </form>
            <div className="btext-black text-center p-4 rounded-lg flex flex-col">
                <h3 className="underline cursor-pointer text-center" onClick={() => setShowUsers(!showUsers)}>
                    Click here to see users
                </h3>
                    {showUsers && (
                        <div className="flex-col flex-wrap">
                            <div className="flex">
                                <div className="underline w-1/2 text-left">username</div>
                                <div className="underline w-1/2 text-left">pasword</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 text-left">john@snow.com</div>
                                <div className="w-1/2 text-left">snoww1234@</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 text-left">Hello@world.com</div>
                                <div className="w-1/2 text-left">worldhello1234!</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/2 text-left">Jake@statefarm.com</div>
                                <div className="w-1/2 text-left">pasword15%</div>
                            </div>
                        </div>
                    )}
            </div>
    </div>
    );
};

export default EmployeeHomepage;
