import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
} from 'react-native';




const ProductoModal = ({ visible, onClose, producto, onAgregar }) => {
  const [cantidad, setCantidad] = useState(1);
  const [sinSalsas, setSinSalsas] = useState(false);
  const [sinVegetales, setSinVegetales] = useState(false);
  const [favorito, setFavorito] = useState(false);

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
      cantidad,
    };
    onAgregar(producto, opciones);
    onClose();
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
          <TouchableOpacity style={styles.heart} onPress={() => setFavorito(!favorito)}>
            <Text style={{ fontSize: 24, color: favorito ? 'red' : 'gray' }}>♥</Text>
          </TouchableOpacity>

          {/* Imagen circular */}
          <Image source={{ uri: producto.imagen_url }} style={styles.imagen} />


          {/* Nombre con línea debajo */}
          <View style={styles.nombreContainer}>
            <Text style={styles.nombre}>{producto.nombre}</Text>
            <View style={styles.linea} />
          </View>

          <Text style={styles.subtitulo}>SIN:</Text>

          <View style={styles.checkboxRow}>
            <CheckBox value={sinSalsas} onValueChange={setSinSalsas} />
            <Text>Salsas</Text>
          </View>

          <View style={styles.checkboxRow}>
            <CheckBox value={sinVegetales} onValueChange={setSinVegetales} />
            <Text>Vegetales</Text>
          </View>

          <View style={styles.cantidad}>
            <TouchableOpacity onPress={disminuir}><Text style={styles.btn}>-</Text></TouchableOpacity>
            <Text>{cantidad}</Text>
            <TouchableOpacity onPress={aumentar}><Text style={styles.btn}>+</Text></TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.botonAgregar} onPress={agregarProducto}>
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
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 1,
  },
  closeText: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  heart: {
    position: 'absolute',
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
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  linea: {
    width: 150,
    height: 1,
    backgroundColor: '#000',
    marginTop: 5,
  },
  subtitulo: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginTop: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 3,
  },
  cantidad: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    gap: 10,
  },
  btn: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  botonAgregar: {
    backgroundColor: '#ff3d00',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
