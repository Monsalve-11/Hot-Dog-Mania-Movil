import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Axios from "axios";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (!email || !password) {
      Alert.alert("Campos vacíos", "Por favor, completa todos los campos.");
      return;
    }

    Axios.post("http://192.168.1.33:3001/login", {
      gmail: email,
      contrasena: password,
    })
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        navigation.navigate("MainMenu");
        if (response.data.success) {
          Alert.alert("Bienvenido", response.data.message || "Inicio exitoso");
          navigation.navigate("MainMenu");
        } else {
          Alert.alert(
            "Error",
            response.data.message || "Credenciales incorrectas"
          );
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        Alert.alert("Error", "No se pudo conectar con el servidor");
      });
  };

  return (
    <LinearGradient colors={["#1a1a1a", "#2d2d2d"]} style={styles.container}>
      <Image
        source={require("../assets/fondo.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.title}>HOT DOG</Text>
          <Text style={styles.star}>★</Text>
        </View>
        <Text style={styles.subtitle}>MANIA</Text>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Bienvenido a Hot Dog Mania</Text>

          <TextInput
            style={styles.input}
            placeholder="G-mail"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.createAccountText}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 200,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    marginHorizontal: 15,
  },
  subtitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 40,
  },
  star: {
    fontSize: 32,
    color: "#ff3b30",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  loginButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordContainer: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: "#666",
    fontSize: 14,
  },
  createAccountButton: {
    marginTop: 15,
  },
  createAccountText: {
    color: "#ff3b30",
    fontSize: 16,
    fontWeight: "bold",
  },
});
