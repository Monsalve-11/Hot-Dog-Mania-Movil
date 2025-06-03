import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import BottomNav from "../components/barraInferior";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

// Import correcto para Expo
import { LinearGradient } from "expo-linear-gradient";

const FavoritesScreen = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFavoritos();
  }, []);

  const fetchFavoritos = () => {
    setLoading(true);
    fetch("http://192.168.1.34:3001/favoritos", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const dataConFavorito = data.map((item) => ({
          ...item,
          esFavorito: true,
        }));
        setFavoritos(dataConFavorito);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener favoritos:", err);
        setLoading(false);
      });
  };

  const toggleFavorito = async (productId) => {
    try {
      await fetch("http://192.168.1.34:3001/favoritos/eliminar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
        credentials: "include",
      });
      setFavoritos((prev) => prev.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

  const irAProducto = (producto) => {
    navigation.navigate("MainMenu", {
      productoId: producto.id,
      categoria: producto.seccion,
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
        <Text>Cargando favoritos...</Text>
      </View>
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

      <Text style={styles.title}>FAVORITOS</Text>
      <View style={styles.separator} />

      {favoritos.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, color: "gray" }}>
            Sin productos favoritos
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
            alignItems: "center",
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => irAProducto(item)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: item.imagen_url }} style={styles.image} />

              <TouchableOpacity
                style={styles.heartContainer}
                onPress={(e) => {
                  e.stopPropagation();
                  toggleFavorito(item.id);
                }}
              >
                <Icon name="heart" size={28} color="red" />
              </TouchableOpacity>

              <Text style={styles.productName}>{item.nombre}</Text>
              <Text style={styles.productDesc}>{item.descripcion}</Text>
              <Text style={styles.productPrice}>
                ${item.precio.toLocaleString()}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <BottomNav />
    </LinearGradient>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  logoText: {
    fontSize: 20,
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
    marginTop: 20,
    textAlign: "center",
  },
  separator: {
    height: 2,
    backgroundColor: "#000",
    marginVertical: 10,
    width: "60%",
    alignSelf: "center",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 8,
    position: "relative",
    width: 320,
    height: 500,
  },
  image: {
    width: 200,
    height: 190,
    borderRadius: 100,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 10,
    textAlign: "center",
  },
  productDesc: {
    fontSize: 18,
    color: "gray",
    marginTop: 5,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 30,
    color: "red",
    marginTop: 10,
    fontWeight: "bold",
  },

  heartContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 20,
  },
});
