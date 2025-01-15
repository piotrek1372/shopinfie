import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function ProductScreen() {
  const route = useRoute();
  const { product } = route.params; // Odbieramy dane produktu

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.images[0]?.src }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price} zł</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => console.log("Dodano do koszyka")}>
        <Text style={styles.addButtonText}>Dodaj do koszyka</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 18,
    color: "#888",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#0a84ff",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});