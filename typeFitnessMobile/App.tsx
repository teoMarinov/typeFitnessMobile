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
import { DrawerNavigationProp } from "@react-navigation/drawer";
import LoggedInRoute from "./src/routs/LoggedInRoute";
import { DataSnapshot } from "firebase/database";
import setUserData from "./src/service/user-service";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "./src/contenxt/AuthContext";

const Stack = createNativeStackNavigator();


export default function App() {
  const [user]: any = useAuthState(auth);

  const [appState, setAppState] = useState<any>({
    user,
    userData: null,
  });

  if (appState.user !== user) {
    setAppState({ ...appState, user: user });
  }

  useEffect(() => {
    if (user === null) return;

    setUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error("The app is not working currently!");
        }
        setAppState({
          ...appState,
          userData: user.uid
            ? snapshot.val()[Object.keys(snapshot.val())[0]]
            : null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <>
      <AuthContext.Provider value={{ ...appState, setUser: setAppState }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            {user ? (
              <Stack.Screen name="Inside" options={{ headerShown: false }} component={LoggedInRoute}/>

            ) : (
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
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
//Test