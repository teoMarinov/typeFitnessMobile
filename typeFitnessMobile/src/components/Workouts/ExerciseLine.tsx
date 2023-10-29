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
  const lineH = exercise.name.length > 37 ? 64 : 30;
  const lineIncrease = 45;

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
        height:
          currentlyOpen === exerciseIndex
            ? exerciseLoggs.length * lineIncrease + lineH
            : lineH,
        overflow: "hidden",
      }}
    >
      <TouchableWithoutFeedback onPress={toggleCurrentlyOpen}>
        <Text style={{ height: 30 }}>
          {exercise.name} - {exercise.sets} x {exercise.reps}
        </Text>
      </TouchableWithoutFeedback>
      {exerciseLoggs.map((data: any, index: number) => (
        <View key={index} style={styles.view}>
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
            size={20}
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
  view: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 4,
    width: 40,
    height: 35,
    margin: 5,
    textAlign: "center",
  },
});
