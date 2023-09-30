import React, { useState } from "react";
import {
  View,
  Text,
  // Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  secureTextEntry,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import LogoImage from "../assets/favicon.png"; // Replace with actual path
import {
  GluestackUIProvider,
  Input,
  InputField,
  config,
  Link,
  LinkText,
  HStack,
  Button,
  ButtonText,
  VStack,
  Image,
  Center,
} from "@gluestack-ui/themed";
import AgendaWithEvents from "./AgendaWithEvents";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthServices from "../services/AuthService";
import { useLogin } from "../context/LoginProvider";

const Image1 = require("../assets/Bank_of_Ceylon.svg.png");
const Image2 = require("../assets/Welcome_calendar.png");
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const WelcomePage = ({ navigation }) => {
  const { setIsLoggedIn, setUser } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const response = await AuthServices.LoginUser({
        username,
        password,
      }).catch((e) => console.log({ e }));
      // Check the response status and handle accordingly
      if (response?.status === 200) {
        // Successful login
        // You can navigate to the next screen or perform other actions here
        setIsLoggedIn(true);
        // setUser(response.data.user)
        navigation.push("AgendaWithEvents");
      } else {
        // Handle unsuccessful login (e.g., show an error message)
        // You can display an error message to the user
        console.log("Login failed");
      }
    } catch (error) {
      // Handle any network or server errors here
      console.error("Login error:", error);
    }
  };
  return (
    <GluestackUIProvider config={config.theme}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.pageView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.pageView}>
            <View style={styles.HeaderView}>
              <View style={styles.logoView}>
                <Image source={Image1} style={styles.imageView} />
                <Text style={styles.textView}>Calendar</Text>
              </View>
              <HStack justifyContent="center" width={width}>
                <Text>_______________________________________________</Text>
              </HStack>
              <Text style={styles.welcomeText}>Welcome</Text>
              <HStack justifyContent="center" marginTop={height * 0.01}>
                <Image
                  style={{ width: width * 0.8, height: height * 0.2 }}
                  size="md"
                  borderRadius="$none"
                  source={Image2}
                />
              </HStack>
              <Text style={styles.loginText}>Login to your calendar</Text>

              <Text>Enter username</Text>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                {/* <InputField/> */}
                <InputField
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
              </Input>
              <Text>Enter password</Text>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                {/* <InputField/> */}
                <InputField
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  type="password"
                />
              </Input>
              <HStack justifyContent="flex-end">
                <Button backgroundColor="white">
                  <Link>
                    <Button
                      backgroundColor="white"
                      size="md"
                      variant="link"
                      onPress={() => navigation.push("ForgotPasswordPage")}
                    >
                      <LinkText color="blue">Forgot password?</LinkText>
                    </Button>
                  </Link>
                </Button>
              </HStack>
              <HStack justifyContent="center" marginTop={10}>
                <Button
                  size="xl"
                  variant="solid"
                  action="primary"
                  isDisabled={false}
                  isFocusVisible={false}
                  bgColor="#FCC507AB"
                  onPress={handleLogin}
                >
                  <ButtonText color="black">Login</ButtonText>
                </Button>
              </HStack>
              <VStack marginTop={20}>
                <HStack justifyContent="center">
                  <Text>New to calendar? </Text>
                  {/* <Button backgroundColor='white' size='md' variant='link'
                onPress={()=> navigation.push('RegistrationPage')}
                > */}
                  <Link>
                    <Button
                      backgroundColor="white"
                      size="md"
                      variant="link"
                      onPress={() => navigation.push("RegistrationPage")}
                    >
                      <LinkText color="blue">Register Now</LinkText>
                    </Button>
                  </Link>
                  {/* </Button> */}
                </HStack>
              </VStack>
              <HStack justifyContent="center">
                <Text>Trouble logging in 011 000 0000</Text>
              </HStack>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
  },
  HeaderView: {
    flex: 1,
    justifyContent: "flex-start",
    width: width,
    height: height,
  },
  logoView: {
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    // paddingHorizontal : 20,
    fontSize: 10000,
  },
  imageView: {
    justifyContent: "flex-start",
    width: width * 0.52,
    //150
    height: height * 0.165,
    //90
    marginRight: width * 0.01,
    marginLeft: width * 0.01,
  },
  textView: {
    fontSize: height * 0.05,
    marginTop: height * 0.05,
    justifyContent: "flex-end",
  },
  welcomeText: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: width * 0.3,
    width: "100%",
    fontSize: height * 0.05,
    flexDirection: "column",
  },
  loginText: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: width * 0.25,
    width: "100%",
    fontSize: 22,
    flexDirection: "column",
  },
});
export default WelcomePage;
