import { DrawerNavigationProp } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Workout from "../screens/Workout/Workout";
import RecordWorkout from "../screens/Workout/RecordWorkout";
import Header from "../components/Header/Header";
import { RouteProp } from "@react-navigation/native";

type propType = {
  navigation: DrawerNavigationProp<any, any>;
  handle: string | null
};

const Stack = createNativeStackNavigator();

export default function WorkoutStack({ navigation, handle }: propType) {
  return (
    <Stack.Navigator initialRouteName="AllWorkouts">
      <Stack.Screen
        name="AllWorkouts"
        options={{
          headerTitle: () => (
            <Header navigation={navigation} title="Your Workouts" />
          ),
        }}
      >
        {(props) => <Workout handle={handle} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="RecordWorkout"
        component={RecordWorkout}
      />
    </Stack.Navigator>
  );
}
