import { View, Text, StyleSheet } from "react-native";
import React from "react";

type PropType = {
  name: string;
  value: any;
  type: string;
};

const InfoLine = ({ name, value, type }: PropType) => {
  return (
    <View style={styles.row}>
      <View style={styles.name}>
        <Text>{name}:</Text>
      </View>
      <View style={styles.value}>
        <Text>
          {value} {type}
        </Text>
      </View>
    </View>
  );
};

export default InfoLine;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    margin: 5,
    paddingVertical: 2,
    backgroundColor: "#ddd",
  },
  name: {
    width: 95,
    alignItems: "center",
  },
  value: {
    width: 100,
    alignItems: "center",
  },
});
