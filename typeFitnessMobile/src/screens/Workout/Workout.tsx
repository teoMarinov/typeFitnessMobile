import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import readData from "../../utils/readData";
import { NavigationProp, RouteProp } from "@react-navigation/native";

type propType = {
  handle: string | null;
  navigation: NavigationProp<any, any>;
};

export type ExerciseType = {
  name: string;
  reps: string;
  sets: string;
};

export type WorkoutType = {
  exercises: ExerciseType[];
  name: string;
};

type SnapshotType = {
  [id: string]: WorkoutType;
};

export type WorkoutArrType = [string, WorkoutType];

type AllWorkoutsType = WorkoutArrType[];

const Workout = ({ handle, navigation }: propType) => {
  const [allWorkouts, setAllWorkouts] = useState<any>([]);

  useEffect(() => {
    readData(`workouts/${handle}`, (snapshot: SnapshotType) => {
      const result: AllWorkoutsType = Object.entries(snapshot);
      setAllWorkouts(result);
    });
  }, [handle]);

  const pressHandler = (workout: WorkoutArrType) => {
    navigation.navigate("RecordWorkout", { handle, workout });
  };
  return (
    <>
      {Array.isArray(allWorkouts) &&
        allWorkouts.map((workout: WorkoutArrType) => (
            <TouchableWithoutFeedback
              style={styles.touchable}
              onPress={() => pressHandler(workout)}
            >
              <Text style={styles.text}>{workout[1].name}</Text>
            </TouchableWithoutFeedback>
        ))}
    </>
  );
};

export default Workout;

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 5,
  },
  text: {
    fontSize: 24,
    padding: 5,
    backgroundColor: "#ddd",
    margin: 3,
    textAlign: "center",
  },
});
