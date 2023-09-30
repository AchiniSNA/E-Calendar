import React from "react";
import {
  Button,
  ButtonText,
  CalendarDaysIcon,
  CheckCircleIcon,
  GluestackUIProvider,
  HStack,
  Icon,
  Text,
  VStack,
  config,
} from "@gluestack-ui/themed";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const RegistrationModal = ({ navigation }) => {
  return (
    <GluestackUIProvider config={config.theme}>
      <View style={styles.pageView}>
        <VStack marginTop={height * 0.2} flexDirection="row">
          <Icon as={CheckCircleIcon} h="$20" w="$20" />
          <VStack marginTop={height * 0.03} alignContent="center">
            <Text size="2xl" bold={true}>
              Registration Completed
            </Text>
          </VStack>
        </VStack>
        <VStack marginTop={height * 0.1}>
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
          marginTop={height * 0.05}
        >
          <Icon as={CalendarDaysIcon} h="$20" w="$20" />
        </VStack>
        <VStack marginTop={height * 0.05}>
          <HStack
            alignItems="center"
            justifyContent="flex-end"
            marginRight={width * 0.05}
          >
            <Button
              size="xl"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              bgColor="#FCC507AB"
              onPress={() => navigation.push("WelcomPage")}
            >
              <ButtonText color="black">Got It</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </View>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    // justifyContent: "flex-start",
    backgroundColor: "#FFF4C8",
    // alignItems: "flex-start",
  },
});
export default RegistrationModal;
