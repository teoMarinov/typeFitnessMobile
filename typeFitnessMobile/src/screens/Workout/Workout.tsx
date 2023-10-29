import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import readData from "../../utils/readData";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { auth } from "../../config/firebase.config";

type propType = {
  route: RouteProp<any>,
  navigation: NavigationProp<any, any>;
};

const Workout = ({ route, navigation }: propType) => {
  const [allWorkouts, setAllWorkouts] = useState<any>([]);

  useEffect(() => {
    readData(`workouts/${"teo03"}`, (snapshot: any) => {
      const result: any = Object.entries(snapshot);
      setAllWorkouts(result);
    });
  }, []);
  return (
    <>
      {Array.isArray(allWorkouts) &&
        allWorkouts.map((workout: any) => (
          <TouchableWithoutFeedback
            style={styles.touchable}
            onPress={() => alert(workout[0])}
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
