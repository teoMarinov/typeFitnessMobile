import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WorkoutStack from "./WorkoutsStack";
import NutritionStack from "./NutritionStack";
import CustomDrawer from "../components/Drawer/CustomDrawer";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import Nutrition from "../screens/Nutrition/Nutrition";

const Drawer = createDrawerNavigator();

type propType = {
  navigation: DrawerNavigationProp<any, any>;
};

export default function LoggedInRoute() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Workouts"
        options={{ drawerLabel: "Workouts" }}
        component={WorkoutStack}
      />
      <Drawer.Screen
        name="Nutrition"
        options={{ drawerLabel: "Nutrition" }}
        component={NutritionStack}
      />
    </Drawer.Navigator>
  );
}
