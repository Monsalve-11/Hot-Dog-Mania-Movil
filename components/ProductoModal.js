import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Función para enviar el favorito a la base de datos
const actualizarFavorito = async (userId, productId, esFavorito) => {
  const url = esFavorito
    ? `http://192.168.1.6:3001/favoritos/agregar` // Cambiar la URL según tu API
    : `http://192.168.1.6:3001/favoritos/eliminar`; // Cambiar la URL según tu API

  const body = JSON.stringify({
    user_id: userId,
    product_id: productId,
  });

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el favorito");
    }
    console.log(
      `Producto ${esFavorito ? "agregado" : "eliminado"} de favoritos.`
    );
  } catch (error) {
    console.error(error);
  }
};

// Función para obtener el estado de favorito del producto
const obtenerFavorito = async (productId) => {
  try {
    const response = await fetch(
      `http://192.168.1.6:3001/productos/${productId}`
    );
    const data = await response.json();
    return data.favorito === "si"; // Devuelve true si el producto es favorito
  } catch (error) {
    console.error("Error al obtener el estado de favorito", error);
    return false;
  }
};

const ProductoModal = ({ visible, onClose, producto, onAgregar, userId }) => {
  const [cantidad, setCantidad] = useState(1);
  const [sinSalsas, setSinSalsas] = useState(false);
  const [sinVegetales, setSinVegetales] = useState(false);
  const [sinQueso, setSinQueso] = useState(false);
  const [favorito, setFavorito] = useState(false);

  // Cargar el estado inicial del favorito
  useEffect(() => {
    const cargarFavorito = async () => {
      const esFavorito = await obtenerFavorito(producto.id);
      setFavorito(esFavorito);
    };
    cargarFavorito();
  }, [producto]);

  const aumentar = () => {
    if (cantidad < producto.cantidad) setCantidad(cantidad + 1);
  };

  const disminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const agregarProducto = () => {
    const opciones = {
      sinSalsas,
      sinVegetales,
      sinQueso,
      cantidad,
    };
    onAgregar(producto, opciones);
    onClose();
  };

  const handleFavorito = async () => {
    setFavorito(!favorito); // Cambiar el estado del corazón
    await actualizarFavorito(userId, producto.id, !favorito); // Llamada para agregar o eliminar
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Botón cerrar */}
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          {/* Botón corazón */}
          <TouchableOpacity style={styles.heart} onPress={handleFavorito}>
            <Text style={{ fontSize: 24, color: favorito ? "red" : "gray" }}>
              ♥
            </Text>
          </TouchableOpacity>

          {/* Imagen circular */}
          <Image source={{ uri: producto.imagen_url }} style={styles.imagen} />

          {/* Nombre con línea debajo */}
          <View style={styles.nombreContainer}>
            <Text style={styles.nombre}>{producto.nombre}</Text>
            <View style={styles.linea} />
          </View>

          {/* Mostrar "SIN:" solo si el producto es de la categoría "Perros" */}
          {producto.seccion === "Perros" && (
            <>
              <Text style={styles.subtitulo}>SIN:</Text>

              <View style={styles.checkboxRow}>
                <CheckBox value={sinSalsas} onValueChange={setSinSalsas} />
                <Text>Salsas</Text>
              </View>

              <View style={styles.checkboxRow}>
                <CheckBox
                  value={sinVegetales}
                  onValueChange={setSinVegetales}
                />
                <Text>Vegetales</Text>
              </View>

              <View style={styles.checkboxRow}>
                <CheckBox value={sinQueso} onValueChange={setSinQueso} />
                <Text>Queso</Text>
              </View>
            </>
          )}

          <View style={styles.cantidad}>
            <TouchableOpacity onPress={disminuir}>
              <Text style={styles.btn}>-</Text>
            </TouchableOpacity>
            <Text>{cantidad}</Text>
            <TouchableOpacity onPress={aumentar}>
              <Text style={styles.btn}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.botonAgregar}
            onPress={agregarProducto}
          >
            <Text style={styles.botonTexto}>${producto.precio * cantidad}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    position: "relative",
  },
  close: {
    position: "absolute",
    top: 10,
    right: 15,
    zIndex: 1,
  },
  closeText: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
  heart: {
    position: "absolute",
    top: 10,
    left: 15,
    zIndex: 1,
  },
  imagen: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginTop: 10,
  },
  nombreContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  linea: {
    width: 150,
    height: 1,
    backgroundColor: "#000",
    marginTop: 5,
  },
  subtitulo: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginTop: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginVertical: 3,
  },
  cantidad: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    gap: 10,
  },
  btn: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  botonAgregar: {
    backgroundColor: "#ff3d00",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
