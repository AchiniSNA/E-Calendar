//Didn't used anywhere

/*import React, { createContext, useContext, useState } from "react";

// Create a context
const EventContext = createContext();

// Create a provider component
export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  // Function to add an event
  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  // Function to update an event
  const updateEvent = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
  };

  // Function to delete an event
  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
}

// Custom hook to access the context
export function useEventContext() {
  return useContext(EventContext);
}
*/