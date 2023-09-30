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
  Typography,
  Box,
} from "@mui/material";

export default function ReminderCreation({
  open,
  onClose,
  onSaveReminder,
  selectedStartTime,
}) {
  const defaultColor = "#FF0000"; // Default color (e.g., red)

  const [reminderData, setReminderData] = useState({
    title: "",
    description: "",
    recurrence: "none",
    timeZone: "GMT", // Default time zone
    start: selectedStartTime || null, // Start time from ReactBigCalendar
  });

  const handleSaveReminder = () => {
    if (reminderData.title) {
      onSaveReminder(reminderData);

      setReminderData({
        title: "",
        description: "",
        recurrence: "none",
        timeZone: "GMT",
        start: selectedStartTime || null,
      });

      onClose();
    }
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
      <DialogTitle>Create Reminder</DialogTitle>
      <DialogContent>
        <TextField
          label="Reminder Title"
          fullWidth
          margin="normal"
          value={reminderData.title}
          onChange={(e) =>
            setReminderData({ ...reminderData, title: e.target.value })
          }
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={reminderData.description}
          onChange={(e) =>
            setReminderData({ ...reminderData, description: e.target.value })
          }
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Recurrence</InputLabel>
          <Select
            value={reminderData.recurrence}
            onChange={(e) =>
              setReminderData({ ...reminderData, recurrence: e.target.value })
            }
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Time Zone</InputLabel>
          <Select
            value={reminderData.timeZone}
            onChange={(e) =>
              setReminderData({ ...reminderData, timeZone: e.target.value })
            }
          >
            <MenuItem value="auto">Auto (Detect Time Zone)</MenuItem>
            <MenuItem value="GMT">GMT</MenuItem>
            <MenuItem value="PST">PST (Pacific Standard Time)</MenuItem>
            {/* Add more time zones as needed */}
          </Select>
        </FormControl>

        <Typography variant="subtitle1">Start Time:</Typography>
        <Typography variant="body1">
          {reminderData.start ? reminderData.start.toString() : "N/A"}
        </Typography>
      </DialogContent>
      <Button variant="outlined" onClick={handleSaveReminder}>
        Save Reminder
      </Button>
    </Dialog>
  );
}
