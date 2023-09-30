import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./routes/DrawerNavigator";
import MainNavigator from "./routes/MainNavigator";
import WelcomePage from "./Pages/WelcomePage";
import SideDrawer from "./Pages/SideDrawer";
import AgendaWithEvents from "./Pages/AgendaWithEvents";
import LoginProvider, { useLogin } from "./context/LoginProvider";
import RegistrationModal from "./Modals/RegistrationModal";
import EnterPasswordPage from "./Pages/EnterPasswordPage";
import EventCreationScreen from "./Pages/CreateEvent";
import CreateEvent from "./Pages/CreateEvent";

export function App() {
  const { isLoggedIn } = useLogin();
  // const isLoggedIn = true; //Replace with logic to determine the active screen
  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
}

export default function LoginWrappedApp() {

  return(
  <LoginProvider>
<App />
  </LoginProvider>)
}

// export default function App() {
//   return (
//     <CreateEvent/>
//   );
// }