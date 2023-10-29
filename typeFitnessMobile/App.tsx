import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/screens/Login/Login";
import Workout from "./src/screens/Workout/Workout";
import { NavigationProp } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/config/firebase.config";
import getUserHandle from "./src/utils/getUserHandle";
import LoggedInRoute from "./src/routs/LoggedInRoute";

const Stack = createNativeStackNavigator();

type propType = {
  navigation: NavigationProp<any, any>;
};

export default function App({ navigation }: propType) {
  const [user, setUser] = useState<User | null>(null);
  const [handle, setHandle] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      getUserHandle(user).then((handle) => {
        setHandle(handle);
      });

      setUser(user);
    });
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {user ? (
            <Stack.Screen name="Inside" options={{ headerShown: false }}>
              {(props) => <LoggedInRoute handle={handle} {...props} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
//aaaa
