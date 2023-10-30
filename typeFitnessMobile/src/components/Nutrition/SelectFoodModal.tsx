import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import readData from "../../utils/readData";

type propType = {
  open: boolean;
  setOpen: (_: boolean) => void;
  currentUser: string;
};

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

type dataType = [string, foodDetails][];

const SelectFoodModal = ({ open, setOpen, currentUser }: propType) => {
  const [selected, setSelected] = useState("foods");
  const [foodData, setFoodData] = useState<dataType>([]);
  const [mealData, setMealData] = useState<dataType>([]);
  const [searchInput, setSearchInput] = useState("");
  const [displayData, setDisplayData] = useState<dataType>([]);

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
      }
    );
  }, [currentUser]);

  const searchWithInput = () => {
    if (!searchInput) return setDisplayData([])
    const fitleredData =
      selected === "foods"
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

  console.log(displayData)
  return (
    <Modal visible={open} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.centered}>
          <View style={styles.horizontalStackContainer}>
            <TouchableOpacity onPress={() => setSelected("foods")}>
              <Text style={{ paddingHorizontal: 20 }}>foods</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelected("meals")}>
              <Text style={{ paddingHorizontal: 20 }}>meals</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalStackContainer}>
            <TextInput
              style={styles.textInput}
              onChange={(val) => {
                setSearchInput(val.nativeEvent.text);
              }}
            />
            <Button title={searchInput} onPress={searchWithInput}/>
          </View>
          {
            displayData.map((item: any) => (
              <Text key={item[0]}>{item[1].name}</Text>
            ))
          }
          <Button title="close modal" onPress={() => setOpen(false)} />
        </View>
      </View>
    </Modal>
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
    backgroundColor: "coral",
    justifyContent: "center",
  },
  horizontalStackContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    padding: 2,
    margin: 2,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 3,
    width: 150,
  },
});
