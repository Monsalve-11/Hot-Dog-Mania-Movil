import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import BottomNav from "../components/barraInferior";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://192.168.1.33:3001/me")
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
      .post("http://192.168.1.33:3001/logout")
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
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No hay datos de usuario</Text>
        <BottomNav />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nombre: {user.nombre}</Text>
      <Text style={styles.text}>ID: {user.id}</Text>
      <Text style={styles.text}>Email: {user.gmail}</Text>
      <View style={styles.button}>
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginVertical: 4 },
  button: { marginTop: 20, width: "60%" },
});
