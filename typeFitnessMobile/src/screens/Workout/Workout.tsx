import React, { useState, useEffect, useContext } from "react";
import { Text, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import readData from "../../utils/readData";
import { NavigationProp } from "@react-navigation/native";
import { AuthContext } from "../../contenxt/AuthContext";

type propType = {
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

const Workout = ({ navigation }: propType) => {
  const [allWorkouts, setAllWorkouts] = useState<AllWorkoutsType>([]);
  const context: any = useContext(AuthContext);
  const currentUser = context.userData?.handle;
  useEffect(() => {
    currentUser &&
      readData(`workouts/${currentUser}`, (snapshot: SnapshotType) => {
        const result: AllWorkoutsType = Object.entries(snapshot);
        setAllWorkouts(result);
      });
  }, [currentUser]);

  const pressHandler = (workout: WorkoutArrType) => {
    navigation.navigate("RecordWorkout", { currentUser, workout });
  };
  return (
    <View style={styles.container}>
      {Array.isArray(allWorkouts) &&
        allWorkouts.map((workout: WorkoutArrType) => (
          <TouchableWithoutFeedback
            onPress={() => pressHandler(workout)}
            key={workout[0]}
          >
            <Text style={styles.text}>{workout[1].name}</Text>
          </TouchableWithoutFeedback>
        ))}
    </View>
  );
};

export default Workout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    padding: 15,
    backgroundColor: "#ddd",
    margin: 3,
    textAlign: "center",
  },
});
