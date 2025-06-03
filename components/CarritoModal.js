import React, { useState, useCallback, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const PaymentOptionsModal = ({ visible, onClose, onSelectMetodo }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Opciones de Pago</Text>

          {["Nequi", "Bancolombia", "PayPal"].map((metodo) => (
            <TouchableOpacity
              key={metodo}
              style={styles.paymentOption}
              onPress={() => onSelectMetodo(metodo)}
            >
              <Image
                source={
                  metodo === "Nequi"
                    ? require("../assets/nequi.jpeg")
                    : metodo === "Bancolombia"
                    ? require("../assets/bancolombia.jpeg")
                    : require("../assets/paypal.jpeg")
                }
                style={styles.paymentImage}
              />
              <Text style={styles.paymentText}>{metodo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const CarritoModal = ({ visible, onClose, carrito, setCarrito }) => {
  const navigation = useNavigation();

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  // Estados para mostrar mensaje de éxito
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await fetch("http://192.168.1.34:3001/me", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserId(data.id);
        } else {
          console.error("No se pudo obtener el usuario");
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };
    obtenerUsuario();
  }, []);

  const total = carrito.reduce(
    (sum, item) => sum + item.producto.precio * item.opciones.cantidad,
    0
  );

  const eliminarProducto = useCallback(
    (productoId) => {
      const nuevoCarrito = carrito.filter(
        (item) => item.producto.id !== productoId
      );
      setCarrito([...nuevoCarrito]);
    },
    [carrito, setCarrito]
  );

  const procesarPago = () => {
    if (!userId) {
      Alert.alert("Error", "Debes iniciar sesión para realizar un pago.");
      return;
    }
    if (!carrito || carrito.length === 0) {
      Alert.alert("Carrito vacío", "No hay productos para pagar.");
      return;
    }
    setPaymentModalVisible(true);
  };

  const confirmarPago = async (metodo, carritoLocal = carrito) => {
    if (!userId) {
      Alert.alert("Error", "Debes iniciar sesión para realizar un pago.");
      return;
    }
    if (!carritoLocal || carritoLocal.length === 0) {
      Alert.alert("Carrito vacío", "No hay productos para pagar.");
      setPaymentModalVisible(false);
      return;
    }

    const productosValidos = carritoLocal.filter(
      (item) => item.producto && item.opciones
    );

    const datosFactura = {
      productos: productosValidos.map((item) => ({
        id: item.producto.id,
        nombre: item.producto.nombre,
        cantidad: item.opciones.cantidad,
        precio: item.producto.precio,
      })),
      total: productosValidos.reduce(
        (sum, item) => sum + item.producto.precio * item.opciones.cantidad,
        0
      ),
      metodo_pago: metodo,
    };

    try {
      const response = await fetch("http://192.168.1.34:3001/factura", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosFactura),
        credentials: "include",
      });

      if (response.ok) {
        setPaymentModalVisible(false);
        setCarrito([]); // Vaciar carrito tras pago exitoso

        // Mostrar mensaje personalizado con loader
        setSuccessMessage(`Pago realizado con éxito mediante ${metodo}`);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          onClose(); // Cierra modal carrito
          navigation.navigate("MainMenu"); // Navega a MainMenu
        }, 3000);
      } else {
        Alert.alert("Error", "Error al procesar el pago");
        console.error("Error al enviar la factura");
      }
    } catch (error) {
      Alert.alert("Error", "Error de red al procesar el pago");
      console.error("Error de red:", error);
    }
  };

  return (
    <Modal transparent={false} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          <Icon name="shopping-cart" size={40} style={styles.icon} />

          <Text style={styles.title}>FACTURA</Text>

          <FlatList
            data={carrito}
            keyExtractor={(item) => item.producto.id.toString()}
            renderItem={({ item }) => {
              const opcionesSin =
                item.producto.seccion === "Perros"
                  ? `SIN: ${[
                      item.opciones.sinSalsas && "Salsas",
                      item.opciones.sinVegetales && "Vegetales",
                      item.opciones.sinQueso && "Queso",
                    ]
                      .filter(Boolean)
                      .join(", ")}`
                  : "";

              return (
                <View style={styles.item}>
                  <View style={styles.itemRow}>
                    <Text style={styles.desc}>
                      {item.opciones.cantidad} - {item.producto.nombre}
                    </Text>
                    <Text style={styles.precio}>
                      x{" "}
                      {(
                        item.producto.precio * item.opciones.cantidad
                      ).toLocaleString()}
                    </Text>
                  </View>
                  {opcionesSin ? (
                    <Text style={styles.opcionesSin}>{opcionesSin}</Text>
                  ) : null}
                  <TouchableOpacity
                    style={styles.eliminarBtn}
                    onPress={() => eliminarProducto(item.producto.id)}
                  >
                    <Text style={styles.eliminarText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>TOTAL:</Text>
            <Text style={styles.totalValue}>x {total.toLocaleString()}</Text>
          </View>

          <TouchableOpacity style={styles.pagarBtn} onPress={procesarPago}>
            <Text style={styles.pagarText}>PAGAR</Text>
          </TouchableOpacity>

          {showSuccess && (
            <View style={styles.successContainer}>
              <Icon
                name="spinner"
                size={40}
                color="#ff3d00"
                style={{ marginBottom: 10 }}
                spin
              />
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          )}
        </View>
      </View>

      <PaymentOptionsModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        onSelectMetodo={(metodo) => confirmarPago(metodo, carrito)}
      />
    </Modal>
  );
};

export default CarritoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    width: 380,
    alignItems: "center",
  },
  close: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  closeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  icon: {
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  item: {
    flexDirection: "column",
    width: "100%",
    marginVertical: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  desc: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  precio: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  opcionesSin: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
    fontStyle: "italic",
  },
  eliminarBtn: {
    backgroundColor: "#ff3d00",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 8,
    alignSelf: "center",
  },
  eliminarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  totalContainer: {
    borderTopWidth: 1,
    marginTop: 15,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  pagarBtn: {
    backgroundColor: "#ff3d00",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 20,
  },
  pagarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  paymentImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  paymentText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  successContainer: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ff3d00",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  successText: {
    color: "#ff3d00",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
