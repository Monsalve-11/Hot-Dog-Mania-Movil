import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CarritoModal = ({ visible, onClose, carrito }) => {
  const total = carrito.reduce((sum, item) => sum + item.producto.precio * item.opciones.cantidad, 0);

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          <Icon name="shopping-cart" size={40} style={styles.icon} />

          <Text style={styles.title}>FACTURA</Text>

          <FlatList
            data={carrito}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.desc}>
                  • {item.opciones.cantidad} {item.producto.nombre}
                </Text>
                <Text style={styles.precio}>
                  x {`${(item.producto.precio * item.opciones.cantidad).toLocaleString()}`}
                </Text>
              </View>
            )}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>TOTAL:</Text>
            <Text style={styles.totalValue}>x {total.toLocaleString()}</Text>
          </View>

          <TouchableOpacity style={styles.pagarBtn}>
            <Text style={styles.pagarText}>PAGAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CarritoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  closeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
  },
  icon: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 4,
  },
  desc: {
    fontSize: 14,
  },
  precio: {
    fontSize: 14,
  },
  totalContainer: {
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    fontWeight: 'bold',
  },
  pagarBtn: {
    backgroundColor: '#ff3d00',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 15,
  },
  pagarText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
