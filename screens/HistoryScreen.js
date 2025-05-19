import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import BottomNav from "../components/barraInferior";

export default function HistoryScreen({ navigation }) {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.1.33:3001/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener usuario:", err);
      });
  }, []);

  useEffect(() => {
    if (!user) return;

    axios
      .get("http://192.168.1.33:3001/misfacturas", {
        params: { userId: user.id },
      })
      .then((response) => {
        setFacturas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las facturas:", error);
        if (error.response && error.response.status === 401) {
          navigation.replace("Login");
        }
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando facturas...</Text>
        <BottomNav />
      </View>
    );
  }

  if (facturas.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No tienes facturas.</Text>
        <BottomNav />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={facturas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.facturaItem}>
            <Text style={styles.fecha}>{item.fecha_emision}</Text>
            <Text>Total: ${item.total.toLocaleString()}</Text>
            <Text>Estado: {item.estado}</Text>
            <Text>Detalles: {item.detalles}</Text>
          </View>
        )}
      />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  facturaItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  fecha: {
    fontWeight: "bold",
  },
});
