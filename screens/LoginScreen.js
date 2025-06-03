import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
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

    Axios.post("http://192.168.1.34:3001/login", {
      gmail: email,
      contrasena: password,
    })
      .then((response) => {
        if (response.data.success) {
          navigation.navigate("MainMenu", { showSuccessModal: true });
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

  const screenHeight = Dimensions.get("window").height;

  return (
    // 1. El LinearGradient funciona como “fondo” de toda la pantalla
    <LinearGradient colors={["#1a1a1a", "#2d2d2d"]} style={styles.flex}>
      {/* 2. Imagen de fondo posicionada absolute para que no se deslice */}
      <Image
        source={require("../assets/fondo.png")}
        style={styles.backgroundImage}
      />

      {/* 3. Contenedor principal: título + formulario */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Título “HOT DOG MANIA” */}
          <View style={styles.titleContainer}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.title}>HOT DOG</Text>
            <Text style={styles.star}>★</Text>
          </View>
          <Text style={styles.subtitle}>MANIA</Text>

          {/* 4. Aquí envuelvo SÓLO el bloque del formulario con KeyboardAvoidingView */}
          <KeyboardAvoidingView
            style={styles.keyboardAvoid}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 120}
          >
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
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // Ajustamos para que el título quede algo arriba
    paddingTop: Platform.OS === "ios" ? 100 : 80,
    alignItems: "center",
    justifyContent: "flex-start",
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
  keyboardAvoid: {
    width: "100%",
    // Usamos pequeño flexGrow para que el formulario pueda empujarse hacia arriba
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 15,
    width: "100%",
    // Pillamos el formulario “pegado” al fondo del contenedor para que suba
    marginBottom: 20,
    // Sombras suaves para que destaque sobre el fondo
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
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
    textAlign: "center",
  },
  createAccountButton: {
    marginTop: 15,
  },
  createAccountText: {
    color: "#ff3b30",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
