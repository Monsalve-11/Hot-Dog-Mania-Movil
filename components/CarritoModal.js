import React, { useState, useCallback, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Modal de opciones de pago
const PaymentOptionsModal = ({ visible, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Opciones de Pago</Text>

          <TouchableOpacity style={styles.paymentOption}>
            <Image
              source={require("../assets/nequi.jpeg")}
              style={styles.paymentImage}
            />
            <Text style={styles.paymentText}>Nequi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentOption}>
            <Image
              source={require("../assets/bancolombia.jpeg")}
              style={styles.paymentImage}
            />
            <Text style={styles.paymentText}>Bancolombia</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentOption}>
            <Image
              source={require("../assets/paypal.jpeg")}
              style={styles.paymentImage}
            />
            <Text style={styles.paymentText}>PayPal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const CarritoModal = ({ visible, onClose, carrito, setCarrito }) => {
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Obtener los datos del usuario al cargar el componente
    const obtenerUsuario = async () => {
      try {
        const response = await fetch("http://192.168.101.5:3001/me", {
          method: "GET",
          credentials: "include", // Asegúrate de enviar la cookie de la sesión
        });
        if (response.ok) {
          const data = await response.json();
          setUserId(data.id); // Asumimos que el backend envía el id del usuario
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

  // Función para eliminar producto
  const eliminarProducto = useCallback(
    (productoId) => {
      console.log("Intentando eliminar el producto con ID:", productoId);
      // Filtrar el carrito, sin modificar el estado original
      const nuevoCarrito = carrito.filter(
        (item) => item.producto.id !== productoId
      );
      console.log("Carrito actualizado:", nuevoCarrito); // Verificar el carrito después de eliminar
      setCarrito([...nuevoCarrito]); // Crear una nueva copia para asegurar la reactividad de React
    },
    [carrito, setCarrito]
  );



  // Función para procesar el pago
 const procesarPago = async () => {
  if (!userId) {
    console.error("Usuario no autenticado");
    return;
  }

  console.log("Mostrando opciones de pago"); // Agrega este log

  const datosFactura = {
    userId: userId,
    productos: carrito.map((item) => ({
      id: item.producto.id,
      nombre: item.producto.nombre,
      sin: item.opciones.sin,
      cantidad: item.opciones.cantidad,
      precio: item.producto.precio,
    })),
    total: total,
  };

  try {
    const response = await fetch("http://192.168.101.5:3001/factura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosFactura),
    });

    if (response.ok) {
      console.log("Factura enviada correctamente");
      setPaymentModalVisible(true); // Abre el modal de pago
    } else {
      console.error("Error al enviar la factura");
    }
  } catch (error) {
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
                  <Text style={styles.desc}>
                    {item.opciones.cantidad} - {item.producto.nombre}
                  </Text>
                  {opcionesSin ? (
                    <Text style={styles.opcionesSin}>{opcionesSin}</Text>
                  ) : null}
                  <Text style={styles.precio}>
                    x{" "}
                    {`${(
                      item.producto.precio * item.opciones.cantidad
                    ).toLocaleString()}`}
                  </Text>

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
        </View>
      </View>

      {/* Modal de opciones de pago */}
     <PaymentOptionsModal
  visible={paymentModalVisible}
  onClose={() => setPaymentModalVisible(false)}
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
    width: 380, // Aumento el ancho de la tarjeta para más espacio
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
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
    marginLeft: 10,
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
});
