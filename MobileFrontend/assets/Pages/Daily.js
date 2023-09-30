import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import {
  CalendarProvider,
  TimelineList,
  TimelineProps,
} from 'react-native-calendars';

const INITIAL_TIME = { hour: 9, minutes: 0 };

const Daily = ({ route }) => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(
    route.params?.selectedDate || new Date().toISOString().split('T')[0]
  );
  const [events, setEvents] = useState([]);
  const timelineRef = useRef(null);

  const onDateChanged = (date, updateSource) => {
    console.log('Daily onDateChanged: ', date, updateSource);
    if (!route.params?.selectedDate) {
      setCurrentDate(date);
    }
  };

  const createNewEvent = (timeString, timeObject) => {
    console.log('Daily createNewEvent: ', timeString, timeObject);
    navigation.navigate('CreateEvent', {date: timeObject.date, time: timeObject.hour + ':' + timeObject.minutes});
    const newEvent = {
      id: 'draft',
      start: timeString,
      end: `${timeObject.date} ${timeObject.hour}:${timeObject.minutes}:00`,
      title: 'New Event',
      color: 'white',
    };

    Alert.prompt('New Event', 'Enter event title', (eventTitle) => {
      if (eventTitle) {
        newEvent.title = eventTitle;
        newEvent.color = 'lightgreen';
        newEvent.id = undefined;
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      }
    });
  };

  const formattedDate = (date) => {
    const dateObject = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return dateObject.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (route.params?.selectedDate && route.params.selectedDate !== currentDate) {
      setCurrentDate(route.params.selectedDate);
      if (timelineRef.current) {
        timelineRef.current.scrollToDate(route.params.selectedDate);
      }
    }
  }, [route.params?.selectedDate, currentDate]);

  const timelineProps = {
    format24h: true,
    onBackgroundLongPress: createNewEvent,
  };

  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged}
      showTodayButton
    >
      <View style={styles.container}>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{formattedDate(currentDate)}</Text>
        </View>
        <TimelineList
          events={events}
          timelineProps={timelineProps}
          showNowIndicator
          scrollToFirst
          initialTime={INITIAL_TIME}
          ref={timelineRef}
        />
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateBox: {
    backgroundColor: '#FCC507AB',
    padding: '2%',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Daily;
