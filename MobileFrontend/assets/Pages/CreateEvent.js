import {
  Avatar,
  ChevronDownIcon,
  GluestackUIProvider,
  Icon,
  Input,
  InputField,
  SearchIcon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Textarea,
  TextareaInput,
  config,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
} from "react-native";
import {listTimeZones} from 'timezone-support'

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const timezones = listTimeZones();

  const handleCreateEvent = () => {
    // You would typically send this data to your backend server,
    // which would then use the Google Calendar API to create the event.
    const eventData = {
      title,
      description,
      startDate,
      endDate,
    };

    // Perform the API request to create the event here
    // (not shown in this simplified example).
  };

  return (
    <GluestackUIProvider config={config.theme}>
      <View style={styles.container}>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Add Title" />
        </Input>
        <Select>
          <SelectTrigger>
            <SelectInput placeholder="Account" />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Red" value="red" />
              <SelectItem label="Blue" value="blue" />
              <SelectItem label="Black" value="black" />
              <SelectItem label="Pink" value="pink" isDisabled={true} />
              <SelectItem label="Green" value="green" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Date" />
        </Input>
        <Textarea
        size="md"
        isReadOnly={false}
        isInvalid={false}
        isDisabled={false}
        w="$full"
        >
            <TextareaInput placeholder="Description" />
        </Textarea>
         {/* select the time zone he wanted from this */}
        <Select>
          <SelectTrigger>
            <SelectInput placeholder='Time Zone' />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Red" value="red" />
              <SelectItem label="Blue" value="blue" />
              <SelectItem label="Black" value="black" />
              <SelectItem label="Pink" value="pink" isDisabled={true} />
              <SelectItem label="Green" value="green" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectInput placeholder='Does not repeat' />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Repeat" value="repeat" />
              <SelectItem label="Does not repeat" value="doesnt" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectInput placeholder='Color' />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Red" value="red" />
              <SelectItem label="Blue" value="blue" />
              <SelectItem label="Black" value="black" />
              <SelectItem label="Pink" value="pink" isDisabled={true} />
              <SelectItem label="Green" value="green" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Attachments" />
        </Input>
      </View>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default CreateEvent;
