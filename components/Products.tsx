import React, { useState, useEffect } from "react";
import { View, FlatList, Text, ActivityIndicator, Alert, Image, StyleSheet, TouchableOpacity } from "react-native";
import { fetchProducts } from "@/api/api";
import he from "he";
import { useNavigation } from "@react-navigation/native";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        Alert.alert("Błąd", "Nie udało się załadować produktów.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0a84ff" />
      </View>
    );
  }

  if (!products.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Brak dostępnych produktów.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.gridContainer}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("(stack)/product", { product: item })}>
          <View style={styles.gridItem}>
            <Image
              source={{ uri: item.images?.[0]?.src || "https://example.com/default-image.jpg" }}
              style={styles.productImage}
            />
            <Text style={styles.productName} numberOfLines={1}>
              {he.decode(item.name)}
            </Text>
            <Text style={styles.productPrice}>{item.price} zł</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    padding: 10,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 10,
  },
});
