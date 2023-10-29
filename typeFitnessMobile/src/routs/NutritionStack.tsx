import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";
import Nutrition from "../screens/Nutrition/Nutrition";

type propType = {
  navigation: NavigationProp<any>;
};

const Stack = createNativeStackNavigator();

export default function NutritionStack({ navigation }: propType) {
  return (
    <Stack.Navigator initialRouteName="Nutrition">
      <Stack.Screen name="Nutrition" component={Nutrition} />
    </Stack.Navigator>
  );
}
