import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { foodDetails } from "./SelectFoodModal";
import { AntDesign } from "@expo/vector-icons";
import MacrosIfno from "./MacrosInfo/MacrosIfno";

type PropType = {
  data: [string, foodDetails];
  changeFoodWeight: (id: string, newVal: string) => void;
  removeFromSelected: (id: string) => void;
};

const FoodBox = ({ data, changeFoodWeight, removeFromSelected }: PropType) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          name="delete"
          size={24}
          color="black"
          onPress={() => removeFromSelected(data[0])}
        />
        <Text style={styles.text}>{data[1].name} : </Text>
        <TextInput
          keyboardType="numeric"
          value={String(data[1].weight)}
          onChange={(val) => {
            changeFoodWeight(data[0], val.nativeEvent.text);
          }}
          style={{ fontSize: 24, marginTop: 4 }}
        />
        <Text style={{ fontSize: 24, marginTop: 4 }}>g</Text>
      </View>
      <MacrosIfno data={data[1]} />
    </View>
  );
};

export default FoodBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    padding: 5,
    margin: 5,
    alignItems: "center",
    borderRadius: 8,
    width: "90%",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 30,
    marginLeft: 15
  },
});
