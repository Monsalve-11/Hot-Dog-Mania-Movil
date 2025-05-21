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

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateName = (text) => {
    setName(text);
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!regex.test(text.trim())) {
      setNameError("El nombre solo debe contener letras.");
    } else {
      setNameError("");
    }
  };

  const validateEmail = (text) => {
    setEmail(text);
    if (!text.includes("@")) {
      setEmailError("El correo debe contener '@'.");
    } else {
      setEmailError("");
    }
  };

  const validateConfirmPassword = (text) => {
    setConfirmPassword(text);
    if (password && text !== password) {
      setConfirmPasswordError("Las contraseñas no coinciden.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleRegister = () => {
    const errors = [];

    if (!name.trim()) {
      errors.push("• El nombre y apellido es obligatorio");
      setNameError("El nombre es obligatorio.");
    }

    if (!email.trim()) {
      errors.push("• El correo electrónico es obligatorio");
      setEmailError("El correo es obligatorio.");
    }

    if (!password) {
      errors.push("• La contraseña es obligatoria");
    }

    if (!confirmPassword) {
      errors.push("• Confirmar la contraseña es obligatorio");
      setConfirmPasswordError("Confirmar la contraseña es obligatorio.");
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errors.push("• Las contraseñas no coinciden");
      setConfirmPasswordError("Las contraseñas no coinciden.");
    }

    if (errors.length > 0) {
      Alert.alert("Errores encontrados", errors.join("\n"));
      return;
    }

    // Si pasa la validación, registrar
    fetch("http://192.168.1.6:3001/register", {
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
            onChangeText={validateName}
            autoCapitalize="words"
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#666"
            value={email}
            onChangeText={validateEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

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
            onChangeText={validateConfirmPassword}
            secureTextEntry
          />
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}

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
    marginBottom: 10,
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
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
});
