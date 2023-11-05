import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contenxt/AuthContext";
import SelectFoodModal from "../../components/Nutrition/SelectFoodModal";
import addData from "../../utils/addData";
import FoodBox from "../../components/Nutrition/FoodBox";
import TotalMacros from "../../components/Nutrition/TotalMacros/TotalMacros";
import EnterName from "../../components/Nutrition/EnterName";
import { Keyboard } from "react-native";

export type macroType = {
  calories: number;
  fat: number;
  saturatedFat: number;
  carbohydrate: number;
  sugar: number;
  protein: number;
  weight: number;
};

export type foodDetails = {
  calories: number;
  carbohydrate: number;
  date: string;
  fat: number;
  name: string;
  protein: number;
  saturatedFat: number;
  sugar: number;
  weight: any | string;
};

export type TotalMacrtosType = {
  totalCalories: String;
  totalFat: String;
  totalSaturatedFat: String;
  totalCarbohydrates: String;
  totalSugar: String;
  totalProtein: String;
};

const Nutrition = () => {
  const context: any = useContext(AuthContext);
  const currentUser = context.userData?.handle;

  const [currentSelectedFoods, setCurrentSelecetedFoods] = useState([]);
  const [mealName, setMealName] = useState("");

  const totalCalories = currentSelectedFoods
    .reduce((acc: number, food: string & macroType[]) => {
      acc += (food[1].calories * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);
  const totalFat = currentSelectedFoods
    .reduce((acc: number, food: string & macroType[]) => {
      acc += (food[1].fat * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);
  const totalSaturatedFat = currentSelectedFoods
    .reduce((acc: number, food: string & macroType[]) => {
      acc += (food[1].saturatedFat * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);
  const totalCarbohydrates = currentSelectedFoods
    .reduce((acc: number, food: string & macroType[]) => {
      acc += (food[1].carbohydrate * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);
  const totalSugar = currentSelectedFoods
    .reduce((acc: number, food: string & macroType[]) => {
      acc += (food[1].sugar * food[1].weight) / 100;
      return acc;
    }, 0)
    .toFixed(1);
  const totalProtein = currentSelectedFoods
    .reduce((acc: number, food: string & macroType[]) => {
      acc += (food[1].protein * food[1].weight) / 100;
      acc.toFixed(1);
      return acc;
    }, 0)
    .toFixed(1);

  const totalMacros: TotalMacrtosType = {
    totalCalories,
    totalFat,
    totalSaturatedFat,
    totalCarbohydrates,
    totalSugar,
    totalProtein,
  };

  const resetSelectedMenu = () => {
    setMealName("");
    setCurrentSelecetedFoods([]);
  };

  const removeFromSelected = (id: string) => {
    if (currentSelectedFoods.length === 1) return resetSelectedMenu();
    const editedArr = currentSelectedFoods.filter(
      (food: string & foodDetails) => {
        return id !== food[0];
      }
    );

    setCurrentSelecetedFoods(editedArr); 
  };

  const changeFoodWeight = (id: string, newVal: number) => {
    const editedWeight = [...currentSelectedFoods];
    editedWeight.map((food: string & foodDetails[]) => {
      if (food[0] === id) food[1].weight = newVal;
    });

    setCurrentSelecetedFoods(editedWeight);
  };

  const handleSave = () => {
    if (!mealName) return alert("You must enter meal name!");

    const ingredients: foodDetails[] = [];
    currentSelectedFoods.map((food: string & foodDetails[]) => {
      ingredients.push(food[1]);
    });

    const mealProps = {
      name: mealName,
      calories: totalCalories,
      fat: totalFat,
      saturatedFat: totalSaturatedFat,
      carbohydrates: totalCarbohydrates,
      sugar: totalSugar,
      protein: totalProtein,
      date: new Date().toString(),
      ingredients,
    };

    addData(`nutrition/${currentUser}/finishedMeals`, mealProps);
    resetSelectedMenu();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <View style={styles.container}>
          <SelectFoodModal
            currentUser={currentUser}
            currentSelectedFoods={currentSelectedFoods}
            setCurrentSelecetedFoods={setCurrentSelecetedFoods}
            setMealName={setMealName}
          />
          {currentSelectedFoods.length > 0 && (
            <>
              <EnterName mealName={mealName} setMealName={setMealName} />
              <TotalMacros data={totalMacros} />

              <View style={styles.selectedFoodsContaier}>
                <ScrollView>
                  {currentSelectedFoods.map((food: [string, foodDetails]) => (
                    <View style={styles.horizontalStackContainer} key={food[0]}>
                      <FoodBox
                        data={food}
                        changeFoodWeight={changeFoodWeight}
                        removeFromSelected={removeFromSelected}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
              <TouchableOpacity onPress={handleSave} style={styles.save}>
                <View>
                  <Text>Save</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default Nutrition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  horizontalStackContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedFoodsContaier: {
    width: "100%",
    height: 381,
  },
  save: {
    width: "98%",
    backgroundColor: "#eee",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    marginTop: 2,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ccc",
  },
});
