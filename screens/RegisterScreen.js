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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    fetch("http://192.168.1.36:3001/register", {
      // ← Cambia esto si usas un dispositivo físico
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: name,
        gmail: email,
        contrasena: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Registro", data.message);
        if (data.message === "Usuario registrado exitosamente") {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
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
          <Text style={styles.welcomeText}>Crear una cuenta</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre y apellido"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
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

          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>REGISTRARSE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
            <Text style={styles.loginLink}>Iniciar Sesión</Text>
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
    paddingTop: 130,
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
    marginTop: 20,
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
  registerButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  loginText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#ff3b30",
    fontSize: 14,
    fontWeight: "bold",
  },
});
