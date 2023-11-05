import { DrawerNavigationProp } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Workout from "../screens/Workout/Workout";
import RecordWorkout from "../screens/Workout/RecordWorkout";
import Header from "../components/Header/Header";

type propType = {
  navigation: DrawerNavigationProp<any, any>;
};

const Stack = createNativeStackNavigator();

export default function WorkoutStack({ navigation }: propType) {
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
        {() => <Workout navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="RecordWorkout"
        component={RecordWorkout}
        options={({ route }: any) => ({
          headerTitle: route.params.workout[1].name,
        })}
      />
    </Stack.Navigator>
  );
}
