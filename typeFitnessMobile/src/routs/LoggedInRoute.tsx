import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WorkoutStack from "./WorkoutsStack";
import NutritionStack from "./NutritionStack";

const Drawer = createDrawerNavigator();

type propType = {
  handle: string | null
};

export default function LoggedInRoute({ handle }: propType) {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="Workouts"
        options={{ drawerLabel: 'Workouts' }}
      >
        {(props) => <WorkoutStack handle={handle} {...props} />}
      </Drawer.Screen>
      <Drawer.Screen
        name="Nutrition"
        options={{ drawerLabel: 'Nutrition' }}
      >
        {(props) => <NutritionStack handle={handle} {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
