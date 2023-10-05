import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventCreation from "./EventCreation";
import AppointmentCreation from "./AppointmentCreation";
import ReminderCreation from "./ReminderCreation"
import { Popover, MenuItem, Paper } from "@mui/material";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reminders, setReminders] = useState([]);


  const eventPropGetter = (event, start, end, isSelected) => {
    // Check if the event has a color property; if not, use a default color
    const color = event.color || "#FF0000";

    return {
      style: {
        backgroundColor: color,
      },
    };
  };

  const handleSelect = ({ start, end }) => {
    // Check if a valid time slot is selected
  
      setAnchorEl(start);
      setSelectedSlot({ start, end });
    
  };

  const addReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedOption(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="App">
      <Calendar
        views={["day", "week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="day"
        events={eventsData}
        style={{ height: "95vh" }}
        onSelectSlot={handleSelect}
        eventPropGetter={eventPropGetter} // Apply event colors
        
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Paper>
          <MenuItem onClick={() => handleOptionSelect("events")}>
            Create Event
          </MenuItem>
          <MenuItem onClick={() => handleOptionSelect("appointments")}>
            Create Appointment
          </MenuItem>
          <MenuItem onClick={() => handleOptionSelect("reminders")}>
            Create Reminder
          </MenuItem>
        </Paper>
      </Popover>
      {selectedOption === "events" && (
        <EventCreation
          open={Boolean(selectedOption)}
          onClose={handleCloseMenu}
          onSaveEvent={(newEvent) => {
            setEventsData([...eventsData, newEvent]);
            setSelectedSlot(null);
          }}
          selectedSlot={selectedSlot}
    //      selectedStartTime={selectedSlot?  selectedSlot.start : null}
    //      selectedEndTime={selectedSlot? selectedSlot.end : null}
        />
      )}
      {selectedOption === "appointments" && (
        <AppointmentCreation
          open={Boolean(selectedOption)}
          onClose={handleCloseMenu}
          onSaveAppointment={(newAppointment) => {
            
            setSelectedSlot(null);
          }}
          selectedSlot={selectedSlot}
          eventPropGetter={eventPropGetter}
        />
      )}
      {selectedOption === "reminders" && (
        <ReminderCreation
          open={Boolean(selectedOption)}
          onClose={handleCloseMenu}
          onSaveReminder={(newReminder) => {
            addReminder(newReminder);
            setSelectedSlot(null);
          }}
          selectedStartTime={selectedSlot.start} // Pass the start time
        />
      )}
    </div>
  );
}




