import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { ExerciseType } from "../../screens/Workout/Workout";
import { loggedDataType } from "../../screens/Workout/RecordWorkout";
import { AntDesign } from "@expo/vector-icons";

type propType = {
  exercise: ExerciseType;
  loggedData: loggedDataType;
  setLoggedData: any;
  currentlyOpen: number | string;
  setCurrentlyOpen: any;
  exerciseIndex: number;
};

export type logType = {
  weight: string;
  reps: string;
  failure: boolean;
};

const ExerciseLine = ({
  exercise,
  loggedData,
  setLoggedData,
  currentlyOpen,
  setCurrentlyOpen,
  exerciseIndex,
}: propType) => {
  const [exerciseLoggs, setExerciseLoggs] = useState([{ failure: false }]);
  const lineH = exercise.name.length > 31 ? 104 : 74;
  const lineIncrease = 55;

  const updateLoggedData = (newLog: logType[]) => {
    if (!loggedData[exercise.name]) {
      const changedLog = {
        ...loggedData,
        [exercise.name]: { logs: newLog },
      };
      setLoggedData(changedLog);
    }

    const changedLog = {
      ...loggedData,
      [exercise.name]: { logs: newLog },
    };
    setLoggedData(changedLog);
  };

  const handleInput = (key: string, value: any, index: number) => {
    const lastIndex = exerciseLoggs.length - 1;
    const updatedLoggs: any = [...exerciseLoggs];

    updatedLoggs[index] = {
      ...updatedLoggs[index],
      [key]: value,
    };

    setExerciseLoggs(updatedLoggs);

    updateLoggedData(updatedLoggs);

    if (
      lastIndex >= 0 &&
      updatedLoggs[lastIndex].reps &&
      updatedLoggs[lastIndex].weight
    ) {
      updatedLoggs.push({ failure: false });
    }
  };

  const toggleCurrentlyOpen = () =>
    currentlyOpen === exerciseIndex
      ? setCurrentlyOpen("")
      : setCurrentlyOpen(exerciseIndex);

  const handleToggleFailure = (index: number) => {
    const updatedStatus = [...exerciseLoggs];
    updatedStatus[index] = {
      ...updatedStatus[index],
      failure: !updatedStatus[index].failure,
    };
    setExerciseLoggs(updatedStatus);

    setLoggedData({
      ...loggedData,
      [exercise.name]: { logs: updatedStatus },
    });
  };

  return (
    <View
      style={{
        width: "100%",
        height:
          currentlyOpen === exerciseIndex
            ? exerciseLoggs.length * lineIncrease + lineH
            : lineH,
        overflow: "hidden",
      }}
    >
      <TouchableWithoutFeedback onPress={toggleCurrentlyOpen}>
        <View style={styles.textView}>
          <Text style={styles.text}>
            {exercise.name} - {exercise.sets} x {exercise.reps}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {exerciseLoggs.map((data: any, index: number) => (
        <View key={index} style={styles.inputContainer}>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={data.reps}
            onChange={(val) => {
              handleInput("reps", val.nativeEvent.text, index);
            }}
          />
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            value={data.weight}
            onChange={(val) => {
              handleInput("weight", val.nativeEvent.text, index);
            }}
          />
          <AntDesign
            name="exclamationcircle"
            size={24}
            color={data.failure ? "red" : "black"}
            onPress={() => handleToggleFailure(index)}
          />
        </View>
      ))}
    </View>
  );
};

export default ExerciseLine;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 4,
    width: 70,
    marginRight: 10,
    margin: 5,
    height: 45,
    textAlign: "center",
  },
  textView: {
    backgroundColor: "#ddd",
    padding: 15,
    borderRadius: 6,
    marginBottom: 6,
    marginHorizontal: 5
  },
  text: {
    fontSize: 25,
    textAlign: "center",
  },
});
