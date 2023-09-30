import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import SideDrawer from "../Pages/SideDrawer";
import AgendaWithEvents from "../Pages/AgendaWithEvents";
import Weekly from "../Pages/Weekly";
import { HeaderTitle } from "react-navigation-stack";
import { ScrollView } from "react-native";
import Daily from "../Pages/Daily";
import Monthly from "../Pages/Monthly";
import CreateEvent from "../Pages/CreateEvent";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideDrawer {...props} />}
      // initialRouteName="MainNavigator"
    >
      {/* <Drawer.Screen name="AgendaWithEvents" component={AgendaWithEvents} options={{title:'BOC E Calendar'}}/> */}
      <Drawer.Screen
        name="Agenda"
        component={AgendaWithEvents}
        options={{ title: "Agenda", headerTitle: "BOC E Calendar" }}
      />
      <Drawer.Screen
        name="Daily"
        component={Daily}
        options={{ title: "Day", headerTitle: "BOC E Calendar" }}
      />
      <Drawer.Screen
        name="Weekly"
        component={Weekly}
        options={{ title: "Week", headerTitle: "BOC E Calendar" }}
      />
      <Drawer.Screen
        name="Monthly"
        component={Monthly}
        options={{ title: "Month" , headerTitle: "BOC E Calendar" }}
      />
      <Drawer.Screen
        name="Refresh"
        component={MainNavigator}
        options={{ title: "Refresh" }}
      />
        <Drawer.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={{ headerShown: false ,}}
      />
    </Drawer.Navigator>
  );
}
