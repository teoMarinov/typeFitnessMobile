import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import React, { useState } from "react";

type PropType = {
  setSelected: (_: string) => void;
};

const FoodMealSelector = ({ setSelected }: PropType) => {
  const [selectedOption, setSelectedOption] = useState("Foods");
  const [notSelectedOption, setNotSelectedOption] = useState("Meals");
  const [open, setOpen] = useState(false);

  const selectedPressHandler = () => {
    setOpen(!open);
  };
  const notSelectedPressHandler = () => {
    const previouslySelected = selectedOption;
    setSelected(notSelectedOption);
    setSelectedOption(notSelectedOption);
    setNotSelectedOption(previouslySelected);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={selectedPressHandler}>
        <View style={styles.selectedContainer}>
          <Text style={styles.text}>{selectedOption}</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={notSelectedPressHandler}>
        <View style={{ display: open ? "flex" : "none" }}>
          <View style={styles.notSelectedContainer}>
            <Text style={styles.text}>{notSelectedOption}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FoodMealSelector;

const styles = StyleSheet.create({
  container: {
    width: "20%",
    height: 50,
  },
  selectedContainer: {
    backgroundColor: "rgba(50, 50, 50, 0.2)",
    padding: 8,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
  },
  notSelectedContainer: {
    backgroundColor: "rgba(50, 50, 50, 0.2)",
    padding: 8,
    borderBottomStartRadius: 4,
    borderBottomRightRadius: 4,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 19,
  },
});
