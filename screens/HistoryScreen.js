import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import BottomNav from "../components/barraInferior";

// Importa LinearGradient para Expo
import { LinearGradient } from "expo-linear-gradient";

export default function HistoryScreen({ navigation }) {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Obtener usuario actual
  useEffect(() => {
    axios
      .get("http://192.168.1.34:3001/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener usuario:", err);
      });
  }, []);

  // Obtener facturas solo cuando ya se tiene el usuario
  useEffect(() => {
    if (!user) return;

    axios
      .get("http://192.168.1.34:3001/misfacturas", {
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
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (facturas.length === 0) {
    return (
      <LinearGradient colors={["#ffffff", "#f04720"]} style={styles.container}>
        <View style={styles.center}>
          <Text>No tienes facturas.</Text>
        </View>
        <BottomNav />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#ffffff", "#f04720"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.logoText}>HOT DOG MANIA</Text>
          <Text style={styles.star}>★</Text>
        </View>
      </View>

      <Text style={styles.title}>HISTORIAL DE FACTURAS</Text>
      <View style={styles.separator} />

      <FlatList
        data={facturas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.facturaItem}>
            <Text style={styles.fecha}>
              FECHA: {new Date(item.fecha_emision).toLocaleDateString()}
            </Text>

            <Text style={styles.subTitle}>Productos:</Text>

            {item.detalles && item.detalles.length > 0 ? (
              item.detalles.map((producto, index) => (
                <View key={index} style={styles.productRow}>
                  <Text style={styles.cantidad}>{producto.cantidad}x</Text>
                  <Text style={styles.bulletPoint}>{producto.nombre}</Text>
                  <Text style={styles.precio}>
                    ${producto.precio.toLocaleString()}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.detallesText}>
                No hay detalles disponibles.
              </Text>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalText}>TOTAL</Text>
              <Text style={styles.totalPrecio}>
                ${item.total.toLocaleString()}
              </Text>
            </View>
          </View>
        )}
      />

      <BottomNav />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 15,
    justifyContent: "flex-start",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 4,
  },
  star: {
    fontSize: 60,
    color: "black",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    height: 2,
    backgroundColor: "#000",
    marginVertical: 15,
    width: "80%",
    alignSelf: "center",
  },

  facturaItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  fecha: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  subTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 15,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  bulletPoint: {
    flex: 3,
    fontSize: 16,
    color: "#333",
  },
  cantidad: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  precio: {
    flex: 2,
    textAlign: "right",
    fontSize: 16,
    color: "#333",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 8,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  totalPrecio: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "right",
  },

  detallesText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    lineHeight: 22,
  },
});
