import { View, Text, Button, Modal, StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contenxt/AuthContext";
import SelectFoodModal from "../../components/Nutrition/SelectFoodModal";

const Nutrition = () => {
  const [open, setOpen] = useState<boolean>(false);
  const context: any = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  return (
    <View style={styles.container}>
      <SelectFoodModal
        open={open}
        setOpen={setOpen}
        currentUser={currentUser}
      />
      <Text>{currentUser}</Text>
      <Button title="open modal" onPress={() => setOpen(true)} />
    </View>
  );
};

export default Nutrition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  centered: {
    width: "100%",
    height: "100%",
    backgroundColor: "coral",
    justifyContent: "center",
  },
});
