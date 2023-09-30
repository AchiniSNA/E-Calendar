import React from "react";

const MonthlyDayPress = (day => {
  return (
    <CalendarProvider date={day.dateString}>
      <WeekCalendar />
    </CalendarProvider>
  );
});

export default MonthlyDayPress;