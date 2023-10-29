import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";
import Workout from "../screens/Workout/Workout";
import RecordWorkout from "../screens/Workout/RecordWorkout";

type propType = {
  navigation: NavigationProp<any>;
};

const Stack = createNativeStackNavigator();

export default function WorkoutStack({ navigation }: propType) {
  return (
    <Stack.Navigator initialRouteName="Workouts">
      <Stack.Screen name="Workouts" component={Workout} />
      <Stack.Screen name="RecordWorkout" component={RecordWorkout} />
    </Stack.Navigator>
  );
}
