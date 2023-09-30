import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomePage from "../Pages/WelcomePage";
import AgendaWithEvents from "../Pages/AgendaWithEvents";
import RegistrationPage from "../Pages/RegistrationPage";
import EnterPasswordPage from "../Pages/EnterPasswordPage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage";
import Weekly from "../Pages/Weekly";
import CreateEvent from "../Pages/CreateEvent";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomePage" component={WelcomePage} />
      <Stack.Screen name="RegistrationPage" component={RegistrationPage} />
      <Stack.Screen name="EnterPasswordPage" component={EnterPasswordPage} />
      <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} />
      <Stack.Screen name="AgendaWithEvents" component={AgendaWithEvents} />
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
    </Stack.Navigator>
  );
}
