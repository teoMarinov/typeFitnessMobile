import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import WorkoutStack from "./WorkoutsStack";
import NutritionStack from "./NutritionStack";

const Drawer = createDrawerNavigator();

export default function LoggedInRoute() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.screen name="Workouts" component={WorkoutStack} />
        <Drawer.screen name="Nutrition" component={NutritionStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
