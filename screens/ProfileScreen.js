import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomNav from "../components/barraInferior";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Perfil</Text>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20 },
});
