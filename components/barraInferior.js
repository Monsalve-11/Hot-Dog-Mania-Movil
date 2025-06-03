import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const BottomNav = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState(null);

  const handlePress = (screen) => {
    setActive(screen);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => handlePress("MainMenu")}>
        <Icon
          name="home"
          size={30}
          color={active === "MainMenu" ? "#ff3b30" : "#ffffff"}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress("FavoritesScreen")}>
        <Icon
          name="heart"
          size={30}
          color={active === "FavoritesScreen" ? "#ff3b30" : "#ffffff"}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress("HistoryScreen")}>
        <Icon
          name="clock-o"
          size={30}
          color={active === "HistoryScreen" ? "#ff3b30" : "#ffffff"}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress("ProfileScreen")}>
        <Icon
          name="user"
          size={30}
          color={active === "ProfileScreen" ? "#ff3b30" : "#ffffff"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default BottomNav;
