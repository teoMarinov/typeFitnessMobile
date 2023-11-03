import { View, StyleSheet } from "react-native";
import React from "react";
import { TotalMacrtosType } from "../../../screens/Nutrition/Nutrition";
import InfoLine from "../MacrosInfo/InfoLine";

type PropType = {
  data: TotalMacrtosType;
};

const TotalMacros = ({ data }: PropType) => {
  return (
    <View style={styles.gridContainer}>
      <View>
        <InfoLine name="Cal" value={data.totalCalories} type="ckal" />
        <InfoLine name="Fat" value={data.totalFat} type="g" />
        <InfoLine
          name="Saturated Fat"
          value={data.totalSaturatedFat}
          type="g"
        />
      </View>
      <View>
        <InfoLine name="Carbs" value={data.totalCarbohydrates} type="g" />
        <InfoLine name="Sugar" value={data.totalSugar} type="g" />
        <InfoLine name="Protein" value={data.totalProtein} type="g" />
      </View>
    </View>
  );
};

export default TotalMacros;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    backgroundColor: "#ccc",
  },
});
