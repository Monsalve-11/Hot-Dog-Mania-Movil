import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// Componente Checkbox simple personalizado
const MyCheckbox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      style={[styles.checkboxBase, value && styles.checkboxChecked]}
      onPress={() => onValueChange(!value)}
    >
      {value && <Text style={styles.checkboxTick}>✓</Text>}
    </TouchableOpacity>
  );
};

// Función para enviar el favorito a la base de datos
const actualizarFavorito = async (userId, productId, esFavorito) => {
  const url = esFavorito
    ? `http://192.168.1.34:3001/favoritos/agregar`
    : `http://192.168.1.34:3001/favoritos/eliminar`;

  const body = JSON.stringify({
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
      credentials: "include",
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Error al actualizar el favorito: ${response.status} - ${text}`
      );
    }
    console.log(
      `Producto ${esFavorito ? "agregado" : "eliminado"} de favoritos.`
    );
  } catch (error) {
    console.error(error);
  }
};

const ProductoModal = ({
  visible,
  onClose,
  producto,
  onAgregar,
  userId,
  favoritosIds = [],
  actualizarFavoritoDesdeMain,
}) => {
  const [cantidad, setCantidad] = useState(1);
  const [sinSalsas, setSinSalsas] = useState(false);
  const [sinVegetales, setSinVegetales] = useState(false);
  const [sinQueso, setSinQueso] = useState(false);
  const [favorito, setFavorito] = useState(false);

  // Estado para mostrar mensaje toast (texto dinámico)
  const [mensajeFavorito, setMensajeFavorito] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(false);

  // Sincroniza estado favorito con la lista que viene desde MainMenu
  useEffect(() => {
    if (producto) {
      setFavorito(favoritosIds.includes(producto.id));
    }
  }, [producto, favoritosIds]);

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
    const nuevoEstado = !favorito;
    setFavorito(nuevoEstado);

    // Llamar backend
    await actualizarFavorito(userId, producto.id, nuevoEstado);

    // Actualizar estado en MainMenu si existe función
    if (actualizarFavoritoDesdeMain) {
      actualizarFavoritoDesdeMain(producto.id, nuevoEstado);
    }

    // Mostrar mensaje dinámico
    setMensajeFavorito(
      nuevoEstado
        ? "Producto agregado a Favoritos"
        : "Producto eliminado de Favoritos"
    );
    setMensajeVisible(true);

    // Ocultar mensaje luego de 3 segundos
    setTimeout(() => {
      setMensajeVisible(false);
    }, 3000);
  };

  if (!producto) return null;

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
            <Text style={{ fontSize: 30, color: favorito ? "red" : "gray" }}>
              ♥
            </Text>
          </TouchableOpacity>

          {/* Imagen circular */}
          <Image
            source={{ uri: producto.imagen_url }}
            style={styles.imagen}
            resizeMode="contain"
          />

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
                <MyCheckbox value={sinSalsas} onValueChange={setSinSalsas} />
                <Text>Salsas</Text>
              </View>

              <View style={styles.checkboxRow}>
                <MyCheckbox
                  value={sinVegetales}
                  onValueChange={setSinVegetales}
                />
                <Text>Vegetales</Text>
              </View>

              <View style={styles.checkboxRow}>
                <MyCheckbox value={sinQueso} onValueChange={setSinQueso} />
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

          {/* Mensaje toast para favoritos */}
          {mensajeVisible && (
            <View style={styles.toastFavorito}>
              <Text style={styles.toastText}>{mensajeFavorito}</Text>
            </View>
          )}
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
    width: 320,
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
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 10,
  },
  nombreContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  nombre: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
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
    marginTop: 5,
    minWidth: 120,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },

  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "red",
    borderColor: "red",
  },
  checkboxTick: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  toastFavorito: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10,
    zIndex: 10,
  },

  toastText: {
    fontSize: 16,
    color: "#333",
  },
});
