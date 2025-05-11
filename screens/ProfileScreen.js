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
  // Estado para almacenar los datos del usuario
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hacemos la solicitud GET para obtener los datos del usuario
    axios
      .get("http://192.168.101.5:3001/me", { withCredentials: true })
      .then((response) => {
        setUser(response.data); // Guardamos los datos del usuario en el estado
        console.log("Datos de usuario:", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });

    // Verificar las cookies
    CookieManager.get("http://192.168.101.5:3001").then((cookies) => {
      console.log("Cookies disponibles:", cookies);
    });
  }, []); // Este useEffect se ejecuta solo una vez cuando la pantalla se monta

  const handleLogout = () => {
    axios
      .post("http://192.168.101.5:3001/logout", {}, { withCredentials: true })
      .then(() => {
        navigation.replace("Login"); // Redirigir a la pantalla de login
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
      <Text style={styles.text}>Email: {user.gmail}</Text>{" "}
      {/* Mostrar el correo aquí */}
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
