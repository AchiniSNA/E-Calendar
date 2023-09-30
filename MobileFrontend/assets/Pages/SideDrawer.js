import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  GluestackUIProvider,
  config,
  Text,
  Button,
  ButtonText,
  Icon,
  MenuIcon,
  RepeatIcon,
  HelpCircleIcon,
} from "@gluestack-ui/themed";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const SideDrawer = (props) => {
  return (
    <GluestackUIProvider config={config.theme}>
      <View style={styles.pageView}>
        {/* <Button backgroundColor="white">
          <Icon as={MenuIcon} size="xl" color="black" />
        </Button> */}
        <DrawerContentScrollView {...props} style={{ backgroundColor: "white" }}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <Text size="lg">Account Number</Text>
        <Text size="lg">Other Calendars</Text>
        <View style={styles.helpContainer}>
          <Icon as={HelpCircleIcon} w="$5" h="$5" />
          <Text>Help and Feedback</Text>
        </View>
      </View>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
    // justifyContent: "flex-start",
    // backgroundColor: "white",
    // alignItems: "flex-start",
    // borderColor: "red",
    // borderWidth: 3,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight, // Add padding for the status bar
  },
  iconContainer: {
    marginRight: 8,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  helpContainer: {
    flexDirection: "row",
  },
});

export default SideDrawer;

{
  /* <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Button
            width={width}
            height={height * 0.05}
            flexDirection="row"
            alignItems="center"
            bgColor="white"
          >
            <View style={styles.iconContainer}>
              <Icon as={MenuIcon} w="$8" h="$8" color="black" />
            </View>
            <View style={styles.textContainer}>
              <ButtonText color="black" fontSize="$lg">
                Agenda
              </ButtonText>
            </View>
          </Button>
          <Button
            width={width}
            height={height * 0.05}
            flexDirection="row"
            alignItems="center"
            bgColor="white"
          >
            <View style={styles.iconContainer}>
              <Icon as={MenuIcon} w="$8" h="$8" color="black" />
            </View>
            <View style={styles.textContainer}>
              <ButtonText color="black" fontSize="$lg">
                Day
              </ButtonText>
            </View>
          </Button>
          <Button
            width={width}
            height={height * 0.05}
            flexDirection="row"
            alignItems="center"
            bgColor="white"
          >
            <View style={styles.iconContainer}>
              <Icon as={MenuIcon} w="$8" h="$8" color="black" />
            </View>
            <View style={styles.textContainer}>
              <ButtonText color="black" fontSize="$lg">
                Week
              </ButtonText>
            </View>
          </Button>
          <Button
            width={width}
            height={height * 0.05}
            flexDirection="row"
            alignItems="center"
            bgColor="blue"
            onPress={() => navigation.navigate("Weekly view")}
          >
            <View style={styles.iconContainer}>
              <Icon as={MenuIcon} w="$8" h="$8" color="black" />
            </View>
            <View style={styles.textContainer}>
              <ButtonText color="black" fontSize="$lg">
                Month
              </ButtonText>
            </View>
          </Button>
          <Button
            width={width}
            height={height * 0.05}
            flexDirection="row"
            alignItems="center"
            bgColor="white"
          >
            <View style={styles.iconContainer}>
              <Icon as={MenuIcon} w="$8" h="$8" color="black" />
            </View>
            <View style={styles.textContainer}>
              <ButtonText color="black" fontSize="$lg">
                Refresh
              </ButtonText>
            </View>
          </Button>
        </ScrollView> */
}
