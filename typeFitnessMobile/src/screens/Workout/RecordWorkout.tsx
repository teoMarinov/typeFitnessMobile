import { View, Button, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import { WorkoutArrType, ExerciseType } from "./Workout";
import addData from "../../utils/addData";
import ExerciseLine from "../../components/Workouts/ExerciseLine";

type propType = {
  route: RouteProp<any>;
};

type WorkoutDataType = {
  name: string;
  date: string;
  exercises: any;
};

type logsType = {
  failure: boolean;
  reps: string;
  weight: string;
};

type exerciseLogType = {
  id: any;
  logs: logsType;
};

export type loggedDataType = {
  [key: string]: exerciseLogType;
};

const RecordWorkout = ({ route }: propType) => {
  const { workout, handle } = route.params as {
    workout: WorkoutArrType;
    handle: string;
  };
  const exercises = workout[1].exercises;

  const [loggedData, setLoggedData] = useState<loggedDataType>({});
  const [currentlyOpen, setCurrentlyOpen] = useState("");

  const handleFinishWorkout = () => {
    const data = Object.entries(loggedData);
    const exercises = data.reduce((acc: any, currentExercise: any) => {
      const exerciseName = currentExercise[0];
      const filteredLogs = currentExercise[1].logs.filter(
        (i: any) => i.reps && i.weight
      );
      if (filteredLogs.length === 0) return acc;
      acc[exerciseName] = filteredLogs;
      addData(`exerciseLogs/${handle}/${exerciseName}`, {
        date: new Date().toString(),
        exercises: filteredLogs,
      });
      return acc;
    }, {});

    const workoutData: WorkoutDataType = {
      name: workout[1].name,
      date: new Date().toString(),
      exercises,
    };

    addData(`finishedWorkouts/${handle}`, workoutData);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {exercises.map((exercise: ExerciseType, index: number) => (
          <View key={exercise.name}>
            <ExerciseLine
              exercise={exercise}
              loggedData={loggedData}
              setLoggedData={setLoggedData}
              currentlyOpen={currentlyOpen}
              setCurrentlyOpen={setCurrentlyOpen}
              exerciseIndex={index}
            />
          </View>
        ))}
        <View style={styles.button}>
          <Button title="Finish" onPress={handleFinishWorkout} />
        </View>
      </View>
    </ScrollView>
  );
};

export default RecordWorkout;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 30,
  },
});
