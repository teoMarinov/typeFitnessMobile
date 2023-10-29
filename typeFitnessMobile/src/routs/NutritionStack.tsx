import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import Nutrition from "../screens/Nutrition/Nutrition";
import Header from "../components/Header/Header";

type propType = {
  navigation: DrawerNavigationProp<any>;
  handle: string | null
};

const Stack = createNativeStackNavigator();

export default function NutritionStack({ navigation, handle }: propType) {
  return (
    <Stack.Navigator initialRouteName="Nutrition">
      <Stack.Screen
        name="Nutrition"
        options={{
          headerTitle: () => (
            <Header navigation={navigation} title="Nutrition" />
          ),
        }}
      >
        {() => <Nutrition handle={handle} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
