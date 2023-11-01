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

type PropType = {
  data: any;
};

const MacrosIfno = ({ data }: PropType) => {
  const [open, setOpen] = useState(false);

  const openModal = (e: any) => {
    e.stopPropagation();
    setOpen(true);
  };
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
              <Text style={{ fontSize: 30, color: "white" }}>Macro details:</Text>
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
              <Text style={styles.text}>Calories: {data.calories}</Text>
              <Text style={styles.text}>Fat: {data.fat}</Text>
              <Text style={styles.text}>
                Saturated Fat: {data.saturatedFat}
              </Text>
              <Text style={styles.text}>
                Carbohydrates: {data.carbohydrate}
              </Text>
              <Text style={styles.text}>Sugar: {data.sugar}</Text>
              <Text style={styles.text}>Protein: {data.protein}</Text>
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
    padding: 10
  },
});
