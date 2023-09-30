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
} from "@gluestack-ui/themed";

const RegistrationPage = ({ navigation }) => {
  const [registrationData, setRegistrationData] = useState({
    accountNo: "",
    branch: "",
    name: "",
    nicNo: "",
    email: "",
    mobileNo: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true); // State to track email validation
  // Function to update the registrationData state
  const handleChange = (name, value) => {
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  // Function to validate email
  const validateEmail = (text) => {
    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(text);
    setIsEmailValid(isValid);
  };

  // Function to navigate to the EnterPasswordPage and pass registrationData
  const handleNext = () => {
    // Validate email before proceeding
    validateEmail(registrationData.email);

    // Check if email is valid before navigating
    if (isEmailValid) {
      navigation.navigate("EnterPasswordPage", { registrationData });
    } else {
      // Handle the case where the email is not valid (show an error message, prevent navigation, etc.)
      // For now, you can log an error message
      console.error("Invalid email address");
    }
  };

  return (
    <GluestackUIProvider config={config.theme}>
      <View style={styles.container}>
        <View style={styles.box}>
          <HStack justifyContent="center" marginTop={10}>
            <Text fontFamily="sans-serif" bold={true} size="xl">
              Registration
            </Text>
          </HStack>
          <View style={{ justifyContent: "flex-end" }}>
            <Text marginLeft={10} marginTop={25}>
              Account No.
            </Text>
            <Input marginLeft={10} marginRight={10}>
              {/* <InputField/> */}
              <InputField
                onChangeText={(text) => handleChange("accountNo", text)}
                value={registrationData.accountNo}
              />
            </Input>
            <Text marginLeft={10}>Branch</Text>
            <Input marginLeft={10} marginRight={10}>
              {/* <InputField/> */}
              <InputField
                onChangeText={(text) => handleChange("branch", text)}
                value={registrationData.branch}
              />
            </Input>
            <Text marginLeft={10}>Name</Text>
            <Input marginLeft={10} marginRight={10}>
              {/* <InputField/> */}
              <InputField
                onChangeText={(text) => handleChange("name", text)}
                value={registrationData.name}
              />
            </Input>
            <Text marginLeft={10}>NIC No.</Text>
            <Input marginLeft={10} marginRight={10}>
              {/* <InputField/> */}
              <InputField
                onChangeText={(text) => handleChange("nicNo", text)}
                value={registrationData.nicNo}
              />
            </Input>
            <Text marginLeft={10}>Email address</Text>
            <Input marginLeft={10} marginRight={10}>
              <InputField
                onChangeText={(text) => {
                  handleChange("email", text);
                  validateEmail(text); // Validate email on input change
                }}
                value={registrationData.email}
              />
            </Input>
            {!isEmailValid && (
              <Text marginLeft={10} color="red">
                Invalid email address
              </Text>
            )}
            <Text marginLeft={10}>Mobile No.</Text>
            <Input marginLeft={10} marginRight={10}>
              {/* <InputField/> */}
              <InputField
                onChangeText={(text) => handleChange("mobileNo", text)}
                value={registrationData.mobileNo}
              />
            </Input>
            <HStack justifyContent="flex-end" marginRight={10}>
              <Button
                width={80}
                marginTop={25}
                backgroundColor="#FCC507AB"
                onPress={handleNext}
                isDisabled={!isEmailValid}
              >
                <ButtonText>Next</ButtonText>
              </Button>
            </HStack>
          </View>
        </View>
      </View>
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
});

export default RegistrationPage;
