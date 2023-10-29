import { View, Text, Button } from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";

type propType = {
  handle: string | null;
};

const Nutrition = ({  handle }: propType) => {
  return (
    <View>
      <Text>{handle}</Text>
    </View>
  );
};

export default Nutrition;
