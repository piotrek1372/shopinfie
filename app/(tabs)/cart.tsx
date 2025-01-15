import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../../context/cartContext";


const CartScreen = () => {
    const { cartItems, removeFromCart } = useCart();
  
    const calculateTotalPrice = () =>
      cartItems.reduce((total, item) => total + item.price, 0);
  
    const renderCartItem = ({ item }) => (
      <View style={styles.cartItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price.toFixed(2)} zł</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFromCart(item.id)}
          >
            <Text style={styles.removeButtonText}>Usuń</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Koszyk</Text>
        {cartItems.length > 0 ? (
          <>
            <FlatList
              data={cartItems}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.summaryContainer}>
              <Text style={styles.totalText}>
                Łączna cena: {calculateTotalPrice().toFixed(2)} zł
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.emptyCartText}>Twój koszyk jest pusty</Text>
        )}
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  productDetails: {
    flex: 1,
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
  removeButton: {
    backgroundColor: "#ff6666",
    borderRadius: 4,
    padding: 5,
  },
  removeButtonText: {
    color: "#fff",
  },
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
});

export default CartScreen;
