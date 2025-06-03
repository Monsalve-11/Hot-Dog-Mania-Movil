import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import BottomNav from "../components/barraInferior";

// Importa LinearGradient para Expo
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://192.168.1.34:3001/me")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
        if (error.response && error.response.status === 401) {
          navigation.replace("Login");
        }
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("http://192.168.1.34:3001/logout")
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Error", "No se pudo cerrar sesión");
      });
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
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

        <Text style={styles.text}>No hay datos de usuario</Text>
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

      <Text style={styles.title}>PERFIL</Text>
      <View style={styles.separator} />

      <View style={styles.card}>
        <Text style={styles.text}>Nombre: {user.nombre}</Text>
        <Text style={styles.text}>Email: {user.gmail}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>

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

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    // sombra para Android
    elevation: 4,
    // sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    width: "60%",
    alignSelf: "center",
  },

  text: {
    fontSize: 16,
    marginVertical: 6,
    color: "#333",
  },

  logoutButton: {
    backgroundColor: "#d32f2f",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 430,
    width: "90%",
  },

  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
