import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Asegúrate de tener esta lib instalada
import { useNavigation } from "@react-navigation/native";

const BottomNav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate("MainMenu")}>
        <Icon name="home" size={30} color="#ff5e57" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("FavoritesScreen")}>
        <Icon name="heart" size={30} color="#ff5e57" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("HistoryScreen")}>
        <Icon name="clock-o" size={30} color="#ff5e57" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
        <Icon name="user" size={30} color="#ff5e57" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default BottomNav;
