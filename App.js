import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainMenu from "./screens/MainMenu";
import FavoritesScreen from "./screens/FavoritesScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <LinearGradient colors={["#1a1a1a", "#2d2d2d"]} style={styles.container}>
      <Image
        source={require("./assets/fondo.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.title}>HOT DOG</Text>
          <Text style={styles.star}>★</Text>
        </View>
        <Text style={styles.subtitle}>MANIA</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerLink}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="light" />
    </LinearGradient>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
    paddingTop: 60,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 50,
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
    marginBottom: 60,
  },
  star: {
    fontSize: 32,
    color: "#ff3b30",
  },
  hotDogImage: {
    width: 300,
    height: 200,
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  registerText: {
    color: "#ffffff",
    fontSize: 16,
  },
  registerLink: {
    color: "#ff3b30",
    fontSize: 16,
    fontWeight: "bold",
  },
});
