import React from "react";
import { Svg } from "react-native-svg";

import {
  View,
  // Text,
  // Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  GluestackUIProvider,
  config,
  Text,
  HStack,
  VStack,
  Input,
  InputField,
  Button,
  ButtonText,
  Icon,
  MenuIcon,
  Avatar,
  AvatarFallbackText,
  CalendarDaysIcon,
  SearchIcon,
  ButtonIcon,
} from "@gluestack-ui/themed";
import {
  Agenda,
  Calendar,
  CalendarList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";

import { useNavigation } from "@react-navigation/native";

const Monthly = () => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer(); // This will open the side drawer
    const today = new Date();
  };
  return (
    <GluestackUIProvider config={config.theme}>
      <View style={styles.startView}>
        <View style={styles.calendarView}>
          <Calendar
            hideExtraDays={false}
            onDayPress={(day) => {
              navigation.navigate("Daily", { selectedDate: day.dateString });
            }}
          />
        </View>
      </View>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  startView: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
    alignItems: "flex-start",
    flexDirection: "column",
    margin: 0,
    // borderColor: 'red',
    // borderWidth: 3,
  },
  container: {
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  rowbar: {
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
  },
  calendarView: {
    width: "100%",
    height: "100%",
  },
});

export default Monthly;
