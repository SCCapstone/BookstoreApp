import React, { useState } from "react";
import Calendar from 'react-calendar';

const EventInfo = ({ event, deleteEvent }) => {
    return (
        <div>
            <h3>
                {event.title}
            </h3>
            <p>
                {event.start} - {event.end}
            </p>
            <button className="bg-black text-white p-2 mt-4 rounded hover:bg-white hover:text-black text-center" onClick = {() => deleteEvent(event)}>
                Delete Event
            </button>
        </div>
    );
};

const EmployeeHomepage = () => { 
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelctedEvent] = useState(null);
    // const [showUsers, setShowUsers] = useState(false);
    // const [showBooks, setShowBooks] = useState(false);

    const handleEventSubmit = (event) => {
        event.preventDefault();
        const newEvent = {
            title: event.target.eventTitle.value,
            start: event.target.eventStart.value,
            end: event.target.eventEnd.value,
        };
        setEvents([...events, newEvent]);
    };

    const handleEventDelete = (eventToDelete) => {
        setEvents(events.filter(event => event !== eventToDelete));
    }

    return (

    <div className="max-w-screen-md mx-auto p-4 text-center"> 
        <h1 className="text-2xl font-medium mb-4 text-center">
            Welcome, Employee!
        </h1> 
        <h2 className="text-lg font-medium mb-4 text-center">
            Upcoming Meeting
        </h2>
        <div className="flex flex-col">
            <Calendar
                className="border border-gray rounded-lg shadow-lg text-center hover"
                value={date}
                onChange={setDate}
                tileClassName={({date, view}) => {
                    const eventDates = events.map(event => new Date(event.start));
                    if (eventDates.some(eventDate => eventDate.toDateString() == date.toDateString())) {
                        return "bg-blue-500 text-white bordder border-gray"
                    } else {
                        return "border boder-gray"
                    }
                } }
                tileContent={({date,view}) => {
                    const event = events.find(event => new Date(event.start).toDateString() === date.toDateString());
                    if (event) {
                        const isSelected = selectedEvent && selectedEvent.start === event.start;
                        return (
                            <div
                                onClick={() => {
                                    if (isSelected) {
                                        setSelctedEvent(null);
                                    } else {
                                        setSelctedEvent(event)
                                    }
                                }}
                                // onMouseOver={() => setSelctedEvent(event)}
                                // onMouseOut={()=> setSelctedEvent(null)}
                            >
                                <h3>
                                    {event.title}
                                </h3>
                                {/* <p>
                                    {event.start} - {event.end}
                                </p> */}
                                {/* <button>
                                    Delete Event
                                </button> */}
                                {/* Important Date */}
                            </div>
                        );
                    } 
                    else {
                        return;
                    }
                }}
            />
            {selectedEvent && (
                <EventInfo event={selectedEvent} deleteEvent = {handleEventDelete}/>
            )}
            {/* <ul className="list-disc pl-4 hover">
                {events.map((event, index) => (
                    <li key={index} className="mb-2">
                        {event.title} on {event.start}
                    </li>
                ))}
            </ul> */}
        </div>
            <form onSubmit={handleEventSubmit} className="mt-4">
                <label className="block font-medium mb-2">
                    Title:
                </label>
                <input 
                    type="text" 
                    name="eventTitle" 
                    className="w-full p-2 border rounded"
                />
                <label className="block font medium mb-2 mt-4">
                    Start Time:
                </label>
                <input 
                    type="datetime-local" 
                    name="eventStart" 
                    className="w-full p-2 border rounded"
                />
                <label className="block font medium mb-2 mt-4">
                    End Time:
                </label>
                <input 
                    type="datetime-local" 
                    name="eventEnd" 
                    className="w-full p-2 border rounded"
                />
                <button 
                    type="submit" 
                    className="bg-black text-white p-2 mt-4 rounded hover:bg-white hover:text-black text-center"
                >
                    Add Event
                </button>
            </form>
            <div className="flex justify-between items-center mb-6 grid grid-cols-2 gap-2">
                {/* <h3 className="underline cursor-pointer text-center" onClick={() => setShowUsers(!showUsers)}>
                    Click here to see user
                </h3> */}
                <a
                    href="/users"
                    class="underline cursor-pointer text-center bg-black text-white p-2 mt-4 rounded hover:bg-white hover:text-black"
                >
                    Click here to see user
                </a>
                {/* <h3 className="underline cursor-pointer text-center" onClick={() => setShowBooks(!showBooks)}>
                    Click here to order books
                </h3> */}
                <a
                    href="/browse"
                    class="underline cursor-pointer text-center bg-black text-white p-2 mt-4 rounded hover:bg-white hover:text-black"
                >
                    Click here to order books
                </a>
            </div>
    </div>
    );
};

export default EmployeeHomepage;
