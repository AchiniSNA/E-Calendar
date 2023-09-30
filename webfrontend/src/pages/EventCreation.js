import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";

export default function EventCreation({
  open,
  onClose,
  onSaveEvent,
  selectedSlot,
}) {
  const defaultColor = "#FF0000";

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    color: defaultColor,
    recurrence: "none",
    timeZone: "GMT",
    start: selectedSlot ? selectedSlot.start : null,
    end: selectedSlot ? selectedSlot.end : null,
  });

  //console.log(eventData);

  const [reminders, setReminders] = useState({
    "15": false,
    "30": false,
    "60": false,
  });

  const [selectedColor, setSelectedColor] = useState(defaultColor);

  useEffect(() => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      start: selectedSlot ? selectedSlot.start : null,
      end: selectedSlot ? selectedSlot.end : null,
    }));
  }, [selectedSlot]);

  const handleSaveEvent = () => {
    if (eventData.title ) {
      const selectedReminders = Object.keys(reminders).filter(
        (minutes) => reminders[minutes]
      );

      const newEvent = {
        title: eventData.title,
        start: eventData.startTime,
        end: eventData.endTime,
        color: selectedColor,
      };

      onSaveEvent({
        ...eventData,
        reminders: selectedReminders,
        color: selectedColor,
      });

      setEventData({
        title: "",
        description: "",
        color: defaultColor,
        recurrence: "none",
        timeZone: "GMT",
        startTime: null,
        endTime: null,
      });

      console.log(eventData);

      setReminders({
        "15": false,
        "30": false,
        "60": false,
      });

      setSelectedColor(defaultColor);

      onClose();
    }
  };

  const handleReminderChange = (minutes) => (event) => {
    setReminders({ ...reminders, [minutes]: event.target.checked });
  };

  const colorOptions = [
    "#FF0000",
    "#FFA500",
    "#FFFF00",
    "#008000",
    "#0000FF",
    "#800080",
    "#FF00FF",
    "#00FFFF",
    "#808080",
    "#000000",
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Event Title"
          fullWidth
          margin="normal"
          value={eventData.title}
          onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
        />
        
        

<Typography variant="subtitle1">Start Time:</Typography>
        <Typography variant="subtitle2">
          {eventData.start ? eventData.start.toString() : "N/A"}
        </Typography>

        <Typography variant="subtitle1">End Time:</Typography>
        <Typography variant="subtitle2">
          {eventData.end ? eventData.end.toString() : "N/A"}
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Event Color</InputLabel>
          <Select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {colorOptions.map((color, index) => (
              <MenuItem key={index} value={color}>
                <Box
                  component="span"
                  sx={{
                    width: "20px",
                    height: "20px",
                    display: "inline-block",
                    backgroundColor: color,
                    marginRight: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "50%",
                  }}
                />
                Color {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Recurrence</InputLabel>
          <Select
            value={eventData.recurrence}
            onChange={(e) =>
              setEventData({ ...eventData, recurrence: e.target.value })
            }
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Time Zone</InputLabel>
          <Select
            value={eventData.timeZone}
            onChange={(e) =>
              setEventData({ ...eventData, timeZone: e.target.value })
            }
          >
            <MenuItem value="auto">Auto (Detect Time Zone)</MenuItem>
            <MenuItem value="GMT">GMT</MenuItem>
            <MenuItem value="PST">PST (Pacific Standard Time)</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="subtitle1">Reminders</Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={reminders["15"]}
                onChange={handleReminderChange("15")}
              />
            }
            label="15 Minutes Before"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={reminders["30"]}
                onChange={handleReminderChange("30")}
              />
            }
            label="30 Minutes Before"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={reminders["60"]}
                onChange={handleReminderChange("60")}
              />
            }
            label="1 Hour Before"
          />
        </FormGroup>
      </DialogContent>
      <Button variant="outlined" onClick={handleSaveEvent}>
        Save Event
      </Button>
    </Dialog>
  );
}
