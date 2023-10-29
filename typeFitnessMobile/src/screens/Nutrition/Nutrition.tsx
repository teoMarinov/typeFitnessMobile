import { View, Text, Button } from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { auth } from "../../config/firebase.config";

type propType = {
  navigation: NavigationProp<any, any>;
};

const Nutrition = ({ navigation }: propType) => {
  return (
    <View>
      <Text>Nutting</Text>
    </View>
  );
};

export default Nutrition;
