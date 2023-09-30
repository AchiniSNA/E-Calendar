import React, { useState } from "react";
import {
  View,
  // Text,
  // Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
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
  Image,
  Center,
  Modal,
  ModalContent,
  ModalBody,
  ModalBackdrop,
  ModalHeader,
  Icon,
  CheckCircleIcon,
  ModalFooter,
  CalendarDaysIcon,
  Spinner,
  SlashIcon,
} from "@gluestack-ui/themed";
import RegistrationModal from "../Modals/RegistrationModal";
import AuthService from "../services/AuthService";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const lockImage = require("../assets/lock.png");
const EnterPasswordPage = ({ route, navigation }) => {
  // Access registrationData from the route.params object
  //   const { registrationData } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isUniqueUsername, setIsUniqueUsername] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for passwor
  const registrationData = route.params.registrationData;
  const accountNo = registrationData.accountNo;
  const branch = registrationData.branch;
  const name = registrationData.name;
  const nicNo = registrationData.nicNo;
  const email = registrationData.email;
  const mobileNo = registrationData.mobileNo;
  // Function to handle the registration of the account
  const handleRegisterAccount = () => {
    const userData = {
      username: username,
      password: password,
      // Add other registration data here
      account_number: accountNo,
      branch: branch,
      name: name,
      phone_number: mobileNo,
      email: email,
    };
    try {
      const response = AuthService.RegisterUser(userData);
      if (response?.status === 200) {
        // Successful registration
        setShowModal(true);
      } else {
        // Handle unsuccessful registration (e.g., show an error message)
        console.log("Registration Failed");
      }
    } catch (error) {
      // Handle any network or server errors here
      console.error("Registration error:", error);
    }
    // Alert.alert('Your account has been registered Succesfully');
    // Navigate back to the login page
    // navigation.push('WelcomePage');
  };
  const checkUniqueUsername = async (text) => {
    if (text.trim() === "") {
      setIsUniqueUsername(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthService.CheckUniqueUsername(text);
      setIsUniqueUsername(response.isUnique);
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      setIsUniqueUsername(false);
    } finally {
      setIsLoading(false);
    }
  };
  const checkPasswordMatch = (password1, password2) => {
    setIsLoading1(true);
    const passwordsMatch = password1 === password2;
    setIsPasswordMatch(passwordsMatch);
    setIsLoading1(false);};
  return (
    <GluestackUIProvider config={config.theme}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={{ alignSelf: "center" }}>
            <Image size="xl" borderRadius="$none" source={lockImage} />
          </View>
          <Text marginLeft={10} marginTop={25}>
            Username
          </Text>
          <Input marginLeft={10} marginRight={10}>
            <InputField onChangeText={checkUniqueUsername} />
            {isLoading ? (
              <Spinner size="small" color="green" />
            ) : isUniqueUsername ? (
              <Icon as={CheckCircleIcon} color="green" h="35" w="30" />
            ) : null}
          </Input>
          <Text marginLeft={10}>Password</Text>
          <Input marginLeft={10} marginRight={10}>
            <InputField onChangeText={(text) => {
              setPassword(text)
              checkPasswordMatch(text, password)}
              } />
          </Input>
          <Text marginLeft={10}>Confirm Password</Text>
          <Input marginLeft={10} marginRight={10}>
            <InputField
              onChangeText={(text) => checkPasswordMatch(password, text)}
            />
            {isLoading1 ? (
              <Spinner size="small" color="green" />
            ) : isPasswordMatch ? (
              <Icon as={CheckCircleIcon} color="green" h="35" w="30" />
            ) : null}
          </Input>
          <Button
            marginTop={15}
            marginLeft={10}
            marginRight={10}
            size="lg"
            backgroundColor="#FCC507AB"
            onPress={handleRegisterAccount}
            isDisabled={!isUniqueUsername ||!isPasswordMatch|| isLoading || isLoading1}
          >
            <ButtonText>Register</ButtonText>
          </Button>
          <Button
            marginTop={15}
            marginLeft={10}
            size="lg"
            width={100}
            backgroundColor="#FCC507AB"
            onPress={() => navigation.push("RegistrationPage")}
          >
            <ButtonText>back</ButtonText>
          </Button>
        </View>
      </View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalContent height={height * 0.5} backgroundColor="#FFF4C8">
          <ModalHeader>
            <VStack flexDirection="row">
              <Icon as={CheckCircleIcon} h="$10" w="$10" />
              <VStack marginTop={height * 0.01} alignContent="center">
                <Text size="lg" bold={true}>
                  Registration Completed
                </Text>
              </VStack>
            </VStack>
          </ModalHeader>
          <ModalBody>
            <VStack marginTop={height * 0.001}>
              <HStack alignItems="center" justifyContent="center">
                <Text size="2xl">Manage your life with</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="center">
                <Text size="2xl">BOC Calendar</Text>
              </HStack>
            </VStack>
            <VStack
              alignItems="center"
              justifyContent="center"
              marginTop={height * 0.0001}
            >
              <Icon as={CalendarDaysIcon} h="$20" w="$20" />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <VStack marginTop={height * 0.05}>
              <HStack
                alignItems="center"
                justifyContent="flex-end"
                marginRight={width * 0.001}
              >
                <Button
                  size="xl"
                  variant="solid"
                  action="primary"
                  isDisabled={false}
                  isFocusVisible={false}
                  bgColor="#FCC507AB"
                  onPress={() => {
                    setShowModal(false);
                    navigation.push("WelcomePage");
                  }}
                >
                  <ButtonText color="black">Got It</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCC507AB",
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "75%",
    height: "85%",
    backgroundColor: "white",
  },
  pageView: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    height: 10,
    // justifyContent: "flex-start",
    backgroundColor: "#FFF4C8",
    // alignItems: "flex-start",
    borderColor: "red",
    borderWidth: 3,
  },
});

export default EnterPasswordPage;
