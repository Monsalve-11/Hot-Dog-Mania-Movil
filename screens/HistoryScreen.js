import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomNav from "../components/barraInferior";

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Historial</Text>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20 },
});
