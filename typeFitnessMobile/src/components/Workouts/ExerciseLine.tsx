import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ExerciseType } from "../../screens/Workout/Workout";
import { loggedDataType } from "../../screens/Workout/RecordWorkout";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { logsType } from "../../screens/Workout/RecordWorkout";

type propType = {
  exercise: ExerciseType;
  loggedData: loggedDataType;
  setLoggedData: any;
  currentlyOpen: number | string;
  setCurrentlyOpen: any;
  exerciseIndex: number;
};

const ExerciseLine = ({
  exercise,
  loggedData,
  setLoggedData,
  currentlyOpen,
  setCurrentlyOpen,
  exerciseIndex,
}: propType) => {
  const [exerciseLoggs, setExerciseLoggs] = useState<logsType[]>([
    { failure: false },
  ]);
  const lineH = exercise.name.length > 31 ? 104 : 74;
  const lineIncrease = 55;

  const heightValue = useSharedValue(lineH); // Initialize with the initial height

  useEffect(() => {
    currentlyOpen === exerciseIndex
      ? (heightValue.value = exerciseLoggs.length * lineIncrease + lineH)
      : (heightValue.value = lineH);
  }, [currentlyOpen, exerciseLoggs]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(heightValue.value, {
        duration: 80,
        easing: Easing.ease,
      }),
    };
  });

  const updateLoggedData = (newLog: logsType[]) => {
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

  const handleInput = (key: string, value: string, index: number) => {
    const lastIndex = exerciseLoggs.length - 1;
    const updatedLoggs: logsType[] = [...exerciseLoggs];

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
    <Animated.View
      style={[
        {
          overflow: "hidden",
        },
        animatedStyle,
      ]}
    >
      <TouchableWithoutFeedback onPress={toggleCurrentlyOpen}>
        <View style={styles.textView}>
          <Text style={styles.text}>
            {exercise.name} - {exercise.sets} x {exercise.reps}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      {exerciseLoggs.map((data: logsType, index: number) => (
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
    </Animated.View>
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
    marginHorizontal: 5,
  },
  text: {
    fontSize: 25,
    textAlign: "center",
  },
});
