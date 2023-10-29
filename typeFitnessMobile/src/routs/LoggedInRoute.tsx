import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WorkoutStack from "./WorkoutsStack";
import NutritionStack from "./NutritionStack";

const Drawer = createDrawerNavigator();

export default function LoggedInRoute() {
  return (
    
      <Drawer.Navigator 
      screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Workouts" component={WorkoutStack} />
        <Drawer.Screen name="Nutrition" component={NutritionStack} />
      </Drawer.Navigator>
  
  );
}
