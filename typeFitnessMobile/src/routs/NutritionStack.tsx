import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import Nutrition from "../screens/Nutrition/Nutrition";
import Header from "../components/Header/Header";

type propType = {
  navigation: DrawerNavigationProp<any>;
};

const Stack = createNativeStackNavigator();

export default function NutritionStack({ navigation }: propType) {
  return (
    <Stack.Navigator initialRouteName="YourNutrition">
      <Stack.Screen
        name="Nutrition"
        options={{
          headerTitle: () => (
            <Header navigation={navigation} title="Nutrition" />
          ),
        }}
      >
        {() => <Nutrition/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
