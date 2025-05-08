import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/barraInferior";
import ProductoModal from "../components/ProductoModal";
import CarritoModal from "../components/CarritoModal";
import Categorias from "../components/Categorias"; // Importa el componente de categorías

const categorias = ["Perros", "Bebidas", "Combos", "Promociones"];

export default function MainMenu() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Perros");
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const animacionCarrito = useState(new Animated.Value(1))[0];

  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://10.10.13.61:3001/productos")
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

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalVisible(true);
  };

  const animarCarrito = () => {
    Animated.sequence([
      Animated.timing(animacionCarrito, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animacionCarrito, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const agregarAlCarrito = (producto, opciones) => {
    setCarrito((prev) => [...prev, { producto, opciones }]);
    setMensajeVisible(true);
    animarCarrito();

    setTimeout(() => {
      setMensajeVisible(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="bars" size={24} onPress={() => alert("Menú")} />

        <View style={styles.logo}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.logoText}>HOT DOG MANIA</Text>
          <Text style={styles.star}>★</Text>
        </View>

        <Animated.View style={{ transform: [{ scale: animacionCarrito }] }}>
          <View>
            <Icon
              name="shopping-cart"
              size={28}
              onPress={() => setCarritoVisible(true)}
            />
            {carrito.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{carrito.length}</Text>
              </View>
            )}
          </View>
        </Animated.View>
      </View>

      {/* Mensaje temporal */}
      {mensajeVisible && (
        <View style={styles.toast}>
          <Icon name="check" size={40} color="green" />
          <Text style={styles.toastText}>Producto agregado al carrito.</Text>
        </View>
      )}

      {/* Pregunta */}
      <Text style={styles.question}>¿Qué hay para comer hoy?</Text>

      {/* Componente Categorías */}
      <Categorias
        categorias={categorias}
        categoriaSeleccionada={categoriaSeleccionada}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
      />

      {/* Productos */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardScroll}
      >
        {productosFiltrados.map((prod) => (
          <View key={prod.id} style={styles.card}>
            <Image
              source={{ uri: prod.imagen_url }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.productName}>{prod.nombre}</Text>
            <Text style={styles.productDesc}>{prod.descripcion}</Text>
            <Text style={styles.productPrice}>
              ${prod.precio.toLocaleString()}
            </Text>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => abrirModal(prod)}
            >
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal de producto */}
      {productoSeleccionado && (
        <ProductoModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          producto={productoSeleccionado}
          onAgregar={agregarAlCarrito}
        />
      )}

      {/* Modal del carrito */}
      <CarritoModal
        visible={carritoVisible}
        onClose={() => setCarritoVisible(false)}
        carrito={carrito}
      />

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
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },

  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  star: {
    fontSize: 18,
    color: "gold",
    marginHorizontal: 5,
  },

  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },

  question: {
    fontSize: 16,
    marginTop: 20,
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
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 160,
    height: 290, // más bajo para recortar verticalmente
    justifyContent: "space-between", // distribuye bien los elementos
    shadowColor: "#000",
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
    backgroundColor: "red",
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 8, // controlado
  },

  buyButtonText: {
    color: "white",
    textAlign: "center",
  },

  toast: {
    position: "absolute",
    top: 100,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    zIndex: 999,
  },

  toastText: {
    marginTop: 10,
    color: "#333",
    fontSize: 16,
  },

  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
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
