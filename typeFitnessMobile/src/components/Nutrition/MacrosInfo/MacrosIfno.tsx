import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { foodDetails } from "../SelectFoodModal";

type PropType = {
  data: foodDetails;
};

const MacrosIfno = ({ data }: PropType) => {
  const [open, setOpen] = useState(false);

  const openModal = (e: any) => {
    e.stopPropagation();
    setOpen(true);
  };

  const calories = ((data.calories * data.weight) / 100).toFixed(1);
  const fat = ((data.fat * data.weight) / 100).toFixed(1);
  const saturatedFat = ((data.saturatedFat * data.weight) / 100).toFixed(1);
  const carbohydrate = ((data.carbohydrate * data.weight) / 100).toFixed(1);
  const sugar = ((data.sugar * data.weight) / 100).toFixed(1);
  const protein = ((data.protein * data.weight) / 100).toFixed(1);

  return (
    <>
      <View style={styles.openModal}>
        <AntDesign
          name="infocirlceo"
          size={24}
          color="black"
          onPress={openModal}
        />
      </View>

      <Modal visible={open} animationType="fade" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={{ fontSize: 30, color: "white" }}>
                Macro details:
              </Text>
              <View style={styles.closeIcon}>
                <AntDesign
                  name="closecircleo"
                  size={34}
                  color="white"
                  onPress={() => setOpen(false)}
                />
              </View>
            </View>
            <View style={styles.main}>
              <Text style={styles.text}>
                {data.name} per {data.weight}g
              </Text>
              <Text style={styles.text}>Calories: {calories}</Text>
              <Text style={styles.text}>Fat: {fat}</Text>
              <Text style={styles.text}>Saturated Fat: {saturatedFat}</Text>
              <Text style={styles.text}>Carbohydrates: {carbohydrate}</Text>
              <Text style={styles.text}>Sugar: {sugar}</Text>
              <Text style={styles.text}>Protein: {protein}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MacrosIfno;

const styles = StyleSheet.create({
  openModal: {
    alignSelf: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  modalContainer: {
    backgroundColor: "black",
    borderRadius: 14,
    width: "80%",
    height: "80%",
    justifyContent: "center",
  },
  closeIcon: {
    position: "absolute",
    right: 15,
  },
  header: {
    position: "absolute",
    top: 10,
    flexDirection: "row",
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    padding: 10,
  },
});
