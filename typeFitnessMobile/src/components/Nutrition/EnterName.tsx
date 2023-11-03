import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

type PropType = {
  mealName: string;
  setMealName: (_: string) => void;
};

const EnterName = ({ mealName, setMealName }: PropType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name:</Text>
      <TextInput
        placeholder="Enter name"
        style={styles.input}
        value={mealName}
        onChange={(val) => setMealName(val.nativeEvent.text)}
      />
    </View>
  );
};

export default EnterName;

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    padding: 10,
    paddingBottom: 6,
    // backgroundColor: "#ccc",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
  input: {
    width: "85%",
    backgroundColor: "#eee",
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#aaa",
    fontSize: 18,
  },
});
