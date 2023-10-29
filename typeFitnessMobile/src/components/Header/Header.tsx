import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type propType = {
  navigation: DrawerNavigationProp<any, any>; // Use DrawerNavigationProp here
  title: string | null;
};

const Header = ({ navigation, title }: propType) => {
  const openMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.icon}
      />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  header: {
    width: screenWidth,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -16,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 16,
  },
});
