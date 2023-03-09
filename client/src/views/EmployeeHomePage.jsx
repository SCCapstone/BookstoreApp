import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import axios from "axios";
import { useNavigate } from "react-router-dom"

const EmployeeHomepage = () => { 
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("/api/events");
                setEvents(response.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        };
        fetchEvents();
    });

    const handleEventSubmit = async (event) => {
        event.preventDefault();
        const newEvent = {
            title: event.target.eventTitle.value,
            start: event.target.eventStart.value,
            end: event.target.eventEnd.value,
        };
        try {
            const response = await axios.post("/api/events", newEvent);
            setEvents([...events, response.data]);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const handleEventDelete = async (eventToDelete) => {
        try {
            await axios.delete(`/api/events/${eventToDelete._id}`);
            if (Array.isArray(events)) {
                setEvents(events.filter((event) => event !== eventToDelete));
            }
            if (selectedEvent && selectedEvent === eventToDelete) {
                setSelectedEvent(null);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

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
                tileDisabled = {() => false}
                tileClassName={({date, view}) => {
                    const eventDatesStart = events.map(event => new Date(event.start));
                    const eventDatesEnd = events.map(event => new Date(event.end));
                    const withinStartEnd = eventDatesStart.some((eventDatesStart, index) => {
                        const eventDatesE = eventDatesEnd[index];
                        return date >= eventDatesStart && date <= eventDatesE;
                    });
                    const firstDay = eventDatesStart.some(eventDate => eventDate.toDateString() == date.toDateString());

                    if (withinStartEnd || firstDay) {
                        return "bg-blue-500 text-white border border-gray"
                    } else {
                        return "border boder-gray"
                    }
                }}
                tileContent={({date,view}) => {
                    const eventsThatStartOnDate = events.filter(
                        event => new Date(event.start).toDateString() === date.toDateString()
                    );
                    const eventsThatSpanAcrossDate = events.filter(
                        event => {
                          const start = new Date(event.start);
                          const end = new Date(event.end);
                          return (
                            start <= date &&
                            end >= date &&
                            start.toDateString() !== end.toDateString()
                          );
                        }
                    );
                    return (
                        <div>
                          {eventsThatStartOnDate.map(event => (
                            <div key={event.id}>
                                <div>
                                    <span>{event.title}</span>
                                </div>
                                <div>
                                    <span>{event.start} - {event.end}</span>
                                </div>
                                <div>
                                    <button onClick={() => handleEventDelete(event)} className="bg-black text-white p-2 mt-4 rounded hover:bg-white hover:text-black text-center text-sm italic">
                                        Delete
                                    </button>
                                </div>
                            </div>
                          ))}
                          {eventsThatSpanAcrossDate.map(event => (
                            <div key={event.id}>
                                <div>
                                    <span>{event.title}</span>
                                </div>
                                <div>
                                    <span>{event.start} - {event.end}</span>
                                </div>
                                <div>
                                    <button onClick={() => handleEventDelete(event)} className="bg-black text-white p-2 mt-4 rounded hover:bg-white hover:text-black text-center text-sm italic">
                                        Delete
                                    </button>
                                </div>
                            </div>
                          ))}
                        </div>
                      );

                }}
            />
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
                <a
                    href="/users"
                    class="underline cursor-pointer text-center bg-black text-white p-2 mt-4 rounded hover:bg-white hover:text-black"
                >
                    Click here to see user
                </a>
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