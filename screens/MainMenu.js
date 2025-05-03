import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/barraInferior";

const categorias = ["Perros", "Bebidas", "Combos", "Promociones"];

const productosEjemplo = [
  {
    id: 1,
    nombre: "Perro Americano",
    descripcion: "Salchicha americana y salsas.",
    precio: 12000,
    imagen: "../assets/americano.jpeg",
  },
  {
    id: 2,
    nombre: "Perro con maicitos",
    descripcion: "Salchicha, maicitos, queso y tocineta.",
    precio: 15000,
    imagen: "../assets/americano.jpeg",
  },
];

export default function MainMenu() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Perros");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="bars" size={24} onPress={() => alert("Menú")} />
        <Text style={styles.logoText}>HOT DOG {"\n"}MANIA</Text>
        <Icon name="shopping-cart" size={24} onPress={() => alert("Carrito")} />
      </View>

      {/* Buscar */}
      <Text style={styles.question}>¿Qué hay para comer hoy?</Text>
      <TextInput placeholder="Buscar..." style={styles.input} />

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
      >
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategoriaSeleccionada(cat)}
          >
            <Text
              style={[
                styles.tab,
                categoriaSeleccionada === cat && styles.tabSelected,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Productos */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardScroll}
      >
        {productosEjemplo.map((prod) => (
          <View key={prod.id} style={styles.card}>
            <Image source={{ uri: prod.imagen }} style={styles.image} />
            <Text style={styles.productName}>{prod.nombre}</Text>
            <Text style={styles.productDesc}>{prod.descripcion}</Text>
            <Text style={styles.productPrice}>
              ${prod.precio.toLocaleString()}
            </Text>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3f4f6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  question: {
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 10,
  },
  tabScroll: {
    marginTop: 20,
  },
  tab: {
    marginRight: 16,
    fontSize: 14,
    color: "gray",
  },
  tabSelected: {
    color: "red",
    textDecorationLine: "underline",
  },
  cardScroll: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    marginRight: 16,
    width: 180,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 12,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 8,
  },
  productDesc: {
    fontSize: 12,
    color: "gray",
  },
  productPrice: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
    marginTop: 4,
  },
  buyButton: {
    backgroundColor: "red",
    paddingVertical: 6,
    borderRadius: 30,
    marginTop: 8,
  },
  buyButtonText: {
    color: "white",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    height: 70,
    width: "110%",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
