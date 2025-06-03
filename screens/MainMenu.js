import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import BottomNav from "../components/barraInferior";
import ProductoModal from "../components/ProductoModal";
import CarritoModal from "../components/CarritoModal";
import Categorias from "../components/Categorias";

// Importación correcta para Expo
import { LinearGradient } from "expo-linear-gradient";

const categorias = ["Perros", "Bebidas", "Combos", "Promociones"];

export default function MainMenu() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Perros");
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [favoritosIds, setFavoritosIds] = useState([]);

  const [paramProductoId, setParamProductoId] = useState(null);
  const [paramCategoria, setParamCategoria] = useState(null);

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  // Estado para el modal de éxito sesión iniciada
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const animacionCarrito = useState(new Animated.Value(1))[0];

  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://192.168.1.34:3001/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => {
        setUserId(data.id);
      })
      .catch(() => setUserId(null));
  }, []);

  useEffect(() => {
    fetch("http://192.168.1.34:3001/productos")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const productosSinFavorito = data.map(({ favorito, ...rest }) => rest);
        setProductos(productosSinFavorito);
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
      });
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch("http://192.168.1.34:3001/favoritos", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const ids = data.map((item) => item.id);
        setFavoritosIds(ids);
      })
      .catch((err) => {
        console.error("Error cargando favoritos:", err);
      });
  }, [userId]);

  useFocusEffect(
    React.useCallback(() => {
      const routes = navigation.getState().routes;
      const currentRoute = routes.find((r) => r.name === "MainMenu");
      const params = currentRoute?.params;

      if (params?.productoId) {
        setParamProductoId(params.productoId);
        setParamCategoria(params.categoria || null);
        navigation.setParams({ productoId: null, categoria: null });
      }

      // Detectar si se debe mostrar el modal de éxito
      if (params?.showSuccessModal) {
        mostrarSuccessModal();
        navigation.setParams({ showSuccessModal: false });
      }
    }, [navigation])
  );

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalVisible(true);
  };

  useEffect(() => {
    if (paramProductoId && productos.length > 0) {
      if (paramCategoria) {
        setCategoriaSeleccionada(paramCategoria);
      }

      const productoEncontrado = productos.find(
        (p) => p.id === paramProductoId
      );

      if (productoEncontrado) {
        abrirModal(productoEncontrado);
      }

      setParamProductoId(null);
      setParamCategoria(null);
    }
  }, [paramProductoId, paramCategoria, productos]);

  const productosFiltrados = productos.filter(
    (prod) => prod.seccion === categoriaSeleccionada
  );

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

  const actualizarFavoritoDesdeMain = (productId, esFavorito) => {
    setFavoritosIds((prev) => {
      if (esFavorito) {
        if (!prev.includes(productId)) {
          return [...prev, productId];
        }
        return prev;
      } else {
        return prev.filter((id) => id !== productId);
      }
    });
  };

  const cerrarSesion = async () => {
    try {
      const response = await fetch("http://192.168.1.34:3001/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setLogoutModalVisible(false);
        navigation.replace("Login");
      } else {
        alert("Error al cerrar sesión");
      }
    } catch (error) {
      alert("Error de red al cerrar sesión");
    }
  };

  // Función para mostrar el modal de éxito sesión iniciada
  const mostrarSuccessModal = () => {
    setSuccessModalVisible(true);
    setTimeout(() => {
      setSuccessModalVisible(false);
    }, 2000);
  };

  return (
    <LinearGradient colors={["#ffffff", "#f04720"]} style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Icon
            name="bars"
            size={24}
            onPress={() => setLogoutModalVisible(true)}
          />
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

        {mensajeVisible && (
          <View style={styles.toast}>
            <Icon name="check" size={40} color="green" />
            <Text style={styles.toastText}>Producto agregado al carrito.</Text>
          </View>
        )}

        <Text style={styles.question}>¿Qué hay para comer hoy?</Text>

        <Categorias
          categorias={categorias}
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
        />

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardContainer}
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
                <Text style={styles.buyButtonText}>COMPRAR</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {productoSeleccionado && (
          <ProductoModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            producto={productoSeleccionado}
            onAgregar={agregarAlCarrito}
            userId={userId}
            favoritosIds={favoritosIds}
            actualizarFavoritoDesdeMain={actualizarFavoritoDesdeMain}
          />
        )}

        <CarritoModal
          visible={carritoVisible}
          onClose={() => setCarritoVisible(false)}
          carrito={carrito}
          setCarrito={setCarrito}
        />

        {/* Modal para cerrar sesión */}
        <Modal
          visible={logoutModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setLogoutModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.logoutModal}>
              <Text style={styles.logoutText}>Cerrar sesión</Text>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={cerrarSesion}
              >
                <Text style={styles.confirmButtonText}>CONFIRMAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal para sesión iniciada correctamente */}
        <Modal
          visible={successModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setSuccessModalVisible(false)}
        >
          <View style={styles.successModalOverlay}>
            <View style={styles.successModalContent}>
              <Icon name="thumbs-up" size={60} color="#4BB543" />
              <Text style={styles.successModalText}>
                Sesión iniciada correctamente
              </Text>
            </View>
          </View>
        </Modal>

        <BottomNav />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginTop: 30,
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
  cardContainer: {
    marginTop: 5,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingEnd: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 40,
    padding: 10,
    width: 320,
    height: 525,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
    paddingTop: 10,
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 15,
    position: "relative",
  },
  image: {
    width: "80%",
    height: 240,
    borderRadius: 120,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 0,
    textAlign: "center",
    width: "100%",
  },
  productDesc: {
    fontSize: 15,
    color: "gray",
    textAlign: "center",
    marginBottom: 30,
    width: "100%",
  },
  productPrice: {
    fontSize: 30,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0,
    width: "100%",
  },
  buyButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 0,
    width: "80%",
    shadowColor: "red",
  },
  buyButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    shadowColor: "red",
  },
  toast: {
    position: "absolute",
    top: 100,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 30,
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
  heartContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutModal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    width: 300,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#ff3d00",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: "#ff3d00",
    fontWeight: "bold",
    fontSize: 16,
  },

  successModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  successModalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  successModalText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#4BB543",
    textAlign: "center",
  },
});
