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
        <Text style={{ fontSize: 20, textAlign: "center" }}>{name}:</Text>
      </View>
      <View style={styles.value}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
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
    height: 56,
  },
  name: {
    width: 95,
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
