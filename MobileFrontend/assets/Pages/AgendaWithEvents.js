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
import Weekly from "./Weekly";
import MonthlyDayPress from "./MonthlyDayPress";
import { useNavigation } from "@react-navigation/native";

const AgendaWithEvents = () => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer(); // This will open the side drawer
    const today = new Date();
  };
  return (
    <GluestackUIProvider config={config.theme}>
      <View style={styles.startView}>
        {/* <View style={styles.container}>
          <Button
            title="Open Drawer"
            onPress={openDrawer}
            backgroundColor="white"
          >
            <Icon as={MenuIcon} size="xl" color="black" />
          </Button> */}
        {/* <View style={styles.rowbar}>
            <View style={{ flexDirection: "row-reverse" }}>
              <HStack reversed={true} space="xs">
                <Button backgroundColor="white" size="md">
                  <Avatar
                    justifyContent="center"
                    marginRight={5}
                    width={30}
                    height={30}
                  >
                    <AvatarFallbackText>Anjula Abeyweera</AvatarFallbackText>
                  </Avatar>
                </Button>
                <Button
                  backgroundColor="white"
                  onPress={() => navigation.goback()}
                >
                  <ButtonIcon as={CalendarDaysIcon} size="lg" color="black" />
                </Button>
                <Button backgroundColor="white">
                  <ButtonIcon as={SearchIcon} size="lg" color="black" />
                </Button>
              </HStack>
            </View>
          </View> */}
        {/* </View> */}
        <View style={styles.calendarView}>
          <Calendar
            hideExtraDays={false}
            onDayPress={(day) => {
              // <CalendarProvider date={day.dateString}>
              //   <WeekCalendar />
              // </CalendarProvider>;
              navigation.navigate("Daily", { selectedDate: day.dateString });
            }}
          />
        </View>
        {/* <Agenda
          items={{
            "2012-05-22": [{ name: "item 1 - any js object" }],
            "2012-05-23": [{ name: "item 2 - any js object", height: 80 }],
            "2012-05-24": [],
            "2012-05-25": [
              { name: "item 3 - any js object" },
              { name: "any js object" },
            ],
          }}
        /> */}
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

export default AgendaWithEvents;
