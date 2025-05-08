import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";

const Categorias = ({
  categorias,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  tabScroll: {
    marginTop: 20,
    maxHeight: 40,
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
});

export default Categorias;
