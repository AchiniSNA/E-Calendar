import React, { useState } from "react";
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

export default function AppointmentCreation({ open, onClose, onSaveAppointment, selectedSlot }) {
  const defaultColor = "#FFA500"; // Default color (e.g., orange)

  const [appointmentData, setAppointmentData] = useState({
    title: "",
    description: "",
    color: defaultColor,
    timeZone: "GMT",
    start: selectedSlot ? selectedSlot.start : null,
    end: selectedSlot ? selectedSlot.end : null,
  });

  const [reminders, setReminders] = useState({
    "15": false,
    "30": false,
    "60": false,
  });

  const [selectedColor, setSelectedColor] = useState(defaultColor);

  const handleSaveAppointment = () => {
    if (appointmentData.title) {
      const selectedReminders = Object.keys(reminders).filter(
        (minutes) => reminders[minutes]
      );

      const newAppointment = {
        title: appointmentData.title,
        start: appointmentData.start,
        end: appointmentData.end,
        color: selectedColor,
      };

      onSaveAppointment({
        ...appointmentData,
        reminders: selectedReminders,
        color: selectedColor,
      });

      setAppointmentData({
        title: "",
        description: "",
        color: defaultColor,
        timeZone: "GMT",
        start: null,
        end: null,
      });

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
      <DialogTitle>Create Appointment</DialogTitle>
      <DialogContent>
        <TextField
          label="Appointment Title"
          fullWidth
          margin="normal"
          value={appointmentData.title}
          onChange={(e) => setAppointmentData({ ...appointmentData, title: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={appointmentData.description}
          onChange={(e) => setAppointmentData({ ...appointmentData, description: e.target.value })}
        />

<Typography variant="subtitle1">Start Time:</Typography>
        <Typography variant="subtitle2">
          {appointmentData.start ? appointmentData.start.toString() : "N/A"}
        </Typography>

        <Typography variant="subtitle1">End Time:</Typography>
        <Typography variant="subtitle2">
          {appointmentData.end ? appointmentData.end.toString() : "N/A"}
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Appointment Color</InputLabel>
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
          <InputLabel>Time Zone</InputLabel>
          <Select
            value={appointmentData.timeZone}
            onChange={(e) => setAppointmentData({ ...appointmentData, timeZone: e.target.value })}
          >
            <MenuItem value="auto">Auto (Detect Time Zone)</MenuItem>
            <MenuItem value="GMT">GMT</MenuItem>
            <MenuItem value="PST">PST (Pacific Standard Time)</MenuItem>
            {/* Add more time zones as needed */}
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
      <Button variant="outlined" onClick={handleSaveAppointment}>
        Save Appointment
      </Button>
    </Dialog>
  );
}
