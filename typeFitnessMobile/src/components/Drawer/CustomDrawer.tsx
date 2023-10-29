import React from "react";
import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";



const CustomDrawer = (props: any) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.content}>
        <DrawerItemList {...props} />
        <View style={styles.button}>
          <Button title="Log out" color={"lightgreen"}/>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "rgba(255,90,90,0.1)",
    height: screenHeight,
  },
  button: {
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
    width: "80%",
  },
});
