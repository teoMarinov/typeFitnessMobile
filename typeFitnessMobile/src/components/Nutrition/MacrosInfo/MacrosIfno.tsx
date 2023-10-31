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

      <Modal visible={open} animationType="fade">
        <View>
          <Text>AAA</Text>
          <AntDesign
            name="infocirlceo"
            size={24}
            color="black"
            onPress={() => setOpen(false)}
          />
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
});
