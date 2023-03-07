import React, { useState } from "react";
import Calendar from 'react-calendar';
import axios from "axios";
import { useNavigate } from "react-router-dom"

const EventInfo = ({ event, deleteEvent }) => {
    return (
        <div>
            <h3>
                {event.title}
            </h3>
            <p>
                {event.start} - {event.end}
            </p>
            <button className="bg-black text-white p-2 mt-4 rounded hover:bg-white hover:text-black text-center" 
                onClick = {() => deleteEvent(event)}>
                Delete Event
            </button>
        </div>
    );
};

const EmployeeHomepage = () => { 
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
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
        // axios.post('/api/events', newEvent)
        // .then(response => {
        //     setEvents([...events, response.data]);
        // })
        // .catch(error => {
        //     console.error(error);
        // });
    };

    // const handleGetTodayEvents = () => {
    //     axios.get('/api/events/today')
    //       .then(response => {
    //         setEvents(response.data);
    //         setSelectedEvent(null);
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    //   };

    // const handleEventSubmit = async (event) => {
    //     event.preventDefault();
    //     const newEvent = {
    //       title: event.target.eventTitle.value,
    //       start: event.target.eventStart.value,
    //       end: event.target.eventEnd.value,
    //     };
    //     try {
    //       // Send the new event to the server
    //       const response = await axios.post("/api/events", newEvent);
    //       // Add the new event to the events array
    //       setEvents([...events, response.data]);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

//     const handleEventDelete = (eventToDelete) => {
//         axios.delete(`/api/events/${eventToDelete.id}`)
//     .then(response => {
//     setEvents(events.filter(event => event.id !== eventToDelete.id));
//     if (selectedEvent && selectedEvent.id === eventToDelete.id) {
//       setSelectedEvent(null);
//     }
//   })
//   .catch(error => {
//     console.error(error);
//   });
//         if (selectedEvent && selectedEvent === eventToDelete) {
//             setSelectedEvent(null);
//         }
//     };

    const handleEventDelete = (eventToDelete) => {
        setEvents(events.filter(event => event !== eventToDelete));
        if (selectedEvent && selectedEvent === eventToDelete) {
            setSelectedEvent(null);
        }
    };

    // const handleEventDelete = async (eventToDelete) => {
    //     try {
    //     // Send a DELETE request to the server to delete the event
    //     await axios.delete(`/api/events/${eventToDelete.id}`);
    //     // Remove the event from the events array
    //     setEvents(events.filter((event) => event.id !== eventToDelete.id));
    //     // Clear the selected event if it's the one being deleted
    //     if (selectedEvent && selectedEvent.id === eventToDelete.id) {
    //         setSelctedEvent(null);
    //     }
    //     } catch (error) {
    //     console.error(error);
    //     }
    // };

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
                    // if (eventDatesStart.some(eventDate => eventDate.toDateString() == date.toDateString())) {
                    //     return "bg-blue-500 text-white border border-gray"
                    // } if (eventDatesEnd.some(eventDate => eventDate.toDateString() == date.toDateString())) {
                    //     return "bg-blue-500 text-white border border-gray"
                    // } else {
                    //     return "border boder-gray"
                    // }
                    const firstDay = eventDatesStart.some(eventDate => eventDate.toDateString() == date.toDateString());

                    if (withinStartEnd || firstDay) {
                        return "bg-blue-500 text-white border border-gray"
                    } else {
                        return "border boder-gray"
                    }
                }}
                tileContent={({date,view}) => {
                    // const event = events.find(event => new Date(event.start).toDateString() === date.toDateString());

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

                    // if (event) {
                    //     const isSelected = selectedEvent && selectedEvent.start === event.start;
                    //     return (
                    //         <div
                    //             onClick={() => {
                    //                 if (isSelected) {
                    //                     setSelctedEvent(null);
                    //                 } else {
                    //                     setSelctedEvent(event)
                    //                 }
                    //             }}
                    //             // onMouseOver={() => setSelctedEvent(event)}
                    //             // onMouseOut={()=> setSelctedEvent(null)}
                    //         >
                    //             <h3>
                    //                 {event.title}
                    //             </h3>
                    //         </div>
                    //     );
                    // } 
                    // else {
                    //     return;
                    // }

                    // if (eventsThatStartOnDate.length > 0 || eventsThatSpanAcrossDate.length > 0) {
                    //     const isSelected =
                    //       selectedEvent &&
                    //       selectedEvent.start === eventsThatStartOnDate[0]?.start &&
                    //       selectedEvent.end === eventsThatStartOnDate[0]?.end;
                    
                    //     return (
                    //       <div
                    //         onClick={() => {
                    //           if (isSelected) {
                    //             setSelctedEvent(null);
                    //           } else {
                    //             setSelctedEvent(eventsThatStartOnDate[0]);
                    //           }
                    //         }}
                    //         className={`${
                    //           isSelected ? 'bg-blue-500 text-white' : ''
                    //         } border border-gray p-1 rounded`}
                    //       >
                    //         {eventsThatStartOnDate.length > 0 && (
                    //         <p className="mb-1">
                    //             {eventsThatStartOnDate[0].title}
                    //         </p>
                    //         )}
                    //         {eventsThatSpanAcrossDate.length > 0 && (
                    //         <p className="text-sm italic">
                    //             {eventsThatSpanAcrossDate.map(event => event.title).join(', ')}
                    //         </p>
                    //         )}
                    //       </div>
                    //     );
                    //   }
                    // return null;
                }}
            />
            {/* {selectedEvent && (
                <EventInfo event={selectedEvent} deleteEvent = {handleEventDelete}/>
            )} */}
           
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
                    // onClick={handleEventSubmit}
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