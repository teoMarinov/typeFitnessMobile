import React from "react";
import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { auth } from "../../config/firebase.config";


const CustomDrawer = (props: any) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.content}>
        <DrawerItemList {...props} />
        <View style={styles.button}>
          <Button title="Log out" onPress={() => auth.signOut()}/>
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
    // backgroundColor: "rgba(255,90,90,0.1)",
    height: screenHeight - 30,
  },
  button: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    width: "80%",
  },
});
