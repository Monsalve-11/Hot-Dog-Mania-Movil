import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/barraInferior";

const categorias = ["Perros", "Bebidas", "Combos", "Promociones"];

export default function MainMenu() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Perros");
  const [productos, setProductos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://192.168.101.5:3001/productos")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProductos(data);
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
      });
  }, []);

  const productosFiltrados = productos.filter(
    (prod) => prod.seccion === categoriaSeleccionada
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="bars" size={24} onPress={() => alert("Menú")} />
        <Text style={styles.logoText}>HOT DOG {"\n"}MANIA</Text>
        <Icon name="shopping-cart" size={24} onPress={() => alert("Carrito")} />
      </View>

      {/* Pregunta */}
      <Text style={styles.question}>¿Qué hay para comer hoy?</Text>

      {/* Categorías */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
      >
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategoriaSeleccionada(cat)}
            style={styles.tabButton}
            activeOpacity={0.6}
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
        {productosFiltrados.map((prod) => (
          <View key={prod.id} style={styles.card}>
            <Image
              source={{ uri: prod.imagen_url }} // se usa imagen_url desde DB
              style={styles.image}
              resizeMode="cover"
            />
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
    paddingHorizontal: 16,
    paddingTop: 16,
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
    maxHeight: 40, // Limita altura para evitar zona de toque extra
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tab: {
    fontSize: 14,
    color: "gray",
  },
  tabSelected: {
    color: "red",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },

  cardScroll: {
    marginTop: 5,
    paddingBottom: 10,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 160,
    height: 290, // más bajo para recortar verticalmente
    justifyContent: 'space-between', // distribuye bien los elementos
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
    backgroundColor: 'red',
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 8, // controlado
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
