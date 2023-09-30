import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  CalendarProvider,
  TimelineList,
  WeekCalendar,
} from "react-native-calendars";

const INITIAL_TIME = { hour: 9, minutes: 0 };

const Weekly = ()=> {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [events, setEvents] = useState([]);

  const onDateChanged = (date, updateSource) => {
    console.log("Weekly onDateChanged: ", date, updateSource);
    setCurrentDate(date);
  };

  const createNewEvent = (timeString, timeObject) => {
    console.log("Weekly createNewEvent: ", timeString, timeObject);
    const timeLst= timeString.split(" ");
    const time = timeLst[1];
    navigation.navigate("CreateEvent", { selectedDate: timeObject.date , selectedTime: time });
    const newEvent = {
      id: "draft",
      start: timeString,
      end: `${timeObject.date} ${timeObject.hour}:${timeObject.minutes}:00`,
      title: "New Event",
      color: "white",
    };

    Alert.prompt("New Event", "Enter event title", (eventTitle) => {
      if (eventTitle) {
        newEvent.title = eventTitle;
        newEvent.color = "lightgreen";
        newEvent.id = undefined;
        setEvents([...events, newEvent]);
      }
    });
  };
  const timelineProps = {
    format24h: true,
    onBackgroundLongPress: createNewEvent,
    // Add any other timeline properties you need
  };

  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged}
      showTodayButton
    >
      <View style={styles.container}>
        <WeekCalendar />
        {/* You can add other components or headers here */}
        <TimelineList
          events={events}
          timelineProps={{onBackgroundLongPress: createNewEvent }}
          showNowIndicator
          scrollToFirst={false}
          // initialTime={INITIAL_TIME}
        />
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Add any other styles you need for the container
  },
});

export default Weekly;
