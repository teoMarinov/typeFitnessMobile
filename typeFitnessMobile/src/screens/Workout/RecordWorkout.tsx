import { View, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { WorkoutArrType, ExerciseType } from "./Workout";
import addData from "../../utils/addData";
import ExerciseLine from "../../components/Workouts/ExerciseLine";
import { useNavigation } from "@react-navigation/native";

type propType = {
  route: RouteProp<any>;
};

type WorkoutDataType = {
  name: string;
  date: string;
  exercises: loggedDataType;
};

export type logsType = {
  failure: boolean;
  reps?: string;
  weight?: string;
};

type exerciseLogType = {
  logs: logsType;
};

export type loggedDataType = {
  [key: string]: exerciseLogType;
};

const RecordWorkout = ({ route }: propType) => {
  const { workout, currentUser } = route.params as {
    workout: WorkoutArrType;
    currentUser: string;
  };
  const exercises = workout[1].exercises;

  const [loggedData, setLoggedData] = useState<loggedDataType>({});
  const [currentlyOpen, setCurrentlyOpen] = useState("");

  const navigation = useNavigation();

  const handleFinishWorkout = () => {
    if (Object.keys(loggedData).length < 1) return navigation.goBack();
    const data = Object.entries(loggedData);
    const exercises: loggedDataType = data.reduce((acc: loggedDataType, currentExercise: any) => {
      const exerciseName = currentExercise[0];
      const filteredLogs = currentExercise[1].logs.filter(
        (i: logsType) => i.reps && i.weight
      );
      if (filteredLogs.length === 0) return acc;
      acc[exerciseName] = filteredLogs;
      addData(`exerciseLogs/${currentUser}/${exerciseName}`, {
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

    addData(`finishedWorkouts/${currentUser}`, workoutData);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <ScrollView>
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
        </ScrollView>
        <View style={styles.button}>
          <Button title="Finish" onPress={handleFinishWorkout} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'relative',
    bottom: 10,
    alignSelf: 'center',
    width: '80%',
    backgroundColor: 'red',
  },
});

export default RecordWorkout;
