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
import readData from "../../utils/readData";
import FoodMealSelector from "./Selector/FoodMealSelector";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import MacrosIfno from "./MacrosInfo/MacrosIfno";

export type foodDetails = {
  calories: number;
  fat: number;
  saturatedFat: number;
  carbohydrate: number;
  sugar: number;
  protein: number;
  name: string;
  date: string;
  weight: number;
};
export type mealDetails = {
  calories: number;
  fat: number;
  saturatedFat: number;
  carbohydrates: number;
  sugar: number;
  protein: number;
  name: string;
  date: string;
  ingredients: dataType;
};
type dataType = [string, foodDetails][];

type propType = {
  currentUser: string;
  currentSelectedFoods: any;
  setCurrentSelecetedFoods: (_: any) => void;
  setMealName: (_: string) => void;
};

const SelectFoodModal = ({
  currentUser,
  currentSelectedFoods,
  setCurrentSelecetedFoods,
  setMealName,
}: propType) => {
  const [selected, setSelected] = useState("Foods");
  const [foodData, setFoodData] = useState<dataType>([]);
  const [mealData, setMealData] = useState<dataType>([]);
  const [searchInput, setSearchInput] = useState("");
  const [displayData, setDisplayData] = useState<dataType>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser) return;
    readData(
      `nutrition/${currentUser}/foods`,
      (snapshot: Record<string, foodDetails>) => {
        const result: any = Object.entries(snapshot).sort((a, b) => {
          const dateA: Date = new Date(a[1].date);
          const dateB = new Date(b[1].date);
          return dateA.getTime() - dateB.getTime();
        });
        setFoodData(result);
      }
    );
    readData(
      `nutrition/${currentUser}/meals`,
      (snapshot: Record<string, foodDetails>) => {
        const result: any = Object.entries(snapshot).sort((a, b) => {
          const dateA: Date = new Date(a[1].date);
          const dateB = new Date(b[1].date);
          return dateA.getTime() - dateB.getTime();
        });
        setMealData(result);
        setDisplayData(result);
      }
    );
  }, [currentUser]);

  useEffect(() => {
    searchWithInput();
  }, [selected]);

  useEffect(() => {
    setDisplayData(foodData);
  }, [open]);

  const searchWithInput = () => {
    const fitleredData =
      selected === "Foods"
        ? foodData.filter((food) => {
            const normalizedInput = searchInput.toLowerCase();
            return food[1].name.toLowerCase().includes(normalizedInput);
          })
        : mealData.filter((food) => {
            const normalizedInput = searchInput.toLowerCase();
            return food[1].name.toLowerCase().includes(normalizedInput);
          });
    setDisplayData(fitleredData);
  };

  const addFoodToSelected = (food: [string, foodDetails]) => {
    if (currentSelectedFoods.some((item: any) => item[0] === food[0])) {
      return alert(`${food[1].name} has already been added`);
    }
    const newFood: any = [...currentSelectedFoods, food];
    setCurrentSelecetedFoods(newFood);
  };

  const addMealToSelected = (meal: [string, mealDetails]) => {
    setCurrentSelecetedFoods(meal[1].ingredients);
    setMealName(meal[1].name);
  };

  const handleAddToSelected = (item: [string, any]) => {
    selected === "Foods" && addFoodToSelected(item);
    selected === "Meals" && addMealToSelected(item);
    setSearchInput("");
    setDisplayData([]);
    closeModal();
  };

  const closeModal = () => {
    setOpen(false);
    setSearchInput("");
    setDisplayData([]);
    setSelected("Foods");
  };

  return (
    <>
      <View style={styles.openModal}>
        <TouchableWithoutFeedback onPress={() => setOpen(true)}>
          <Button title="Add Food" onPress={() => setOpen(true)} />
        </TouchableWithoutFeedback>
      </View>
      <Modal visible={open} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.centered}>
            <View style={styles.header}>
              <Text style={{ fontSize: 28 }}> Select from {selected}</Text>
              <View style={styles.closeIcon}>
                <AntDesign
                  name="closecircleo"
                  size={38}
                  color="black"
                  onPress={closeModal}
                />
              </View>
            </View>
            <View style={styles.horizontalStackContainer}>
              <FoodMealSelector setSelected={setSelected} />
              <TextInput
                style={styles.textInput}
                value={searchInput}
                onChange={(val) => {
                  setSearchInput(val.nativeEvent.text);
                }}
              />
              <View style={styles.searchIcon}>
                <FontAwesome
                  name="search"
                  size={24}
                  color="black"
                  onPress={searchWithInput}
                />
              </View>
            </View>
            <View style={styles.itemContainer}>
              {displayData.map((item: [string, foodDetails]) => (
                <TouchableWithoutFeedback
                  onPress={() => handleAddToSelected(item)}
                  key={item[0]}
                >
                  <View style={styles.itemText}>
                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 30,
                      }}
                    >
                      {item[1].name}
                    </Text>
                    <MacrosIfno data={item[1]} />
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SelectFoodModal;

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
  },
  horizontalStackContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 60,
    marginBottom: 120,
    alignItems: "center",
  },
  textInput: {
    paddingLeft: 15,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: 3,
    width: "79.95%",
    height: 50,
    fontSize: 22,
  },
  itemContainer: {
    top: 150,
    width: "100%",
  },
  itemText: {
    padding: 10,
    flexDirection: "row",
    margin: 5,
    marginHorizontal: 15,
    borderColor: "black",
    backgroundColor: "#ddd",
    borderRadius: 4,
    justifyContent: "space-between",
  },
  searchIcon: {
    position: "absolute",
    right: 10,
  },
  closeIcon: {
    position: "absolute",
    right: 10,
  },
  header: {
    marginTop: 10,
    width: "100%",
    height: 52,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  openModal: {
    position: "absolute",
    top: 5,
  },
});
