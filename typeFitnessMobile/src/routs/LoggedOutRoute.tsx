import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";

const Stack = createNativeStackNavigator();

export default function LoggedOutRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
