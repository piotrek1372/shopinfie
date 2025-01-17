import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";

const CartScreen = () => {
  const { cartItems, removeFromCart } = useCart();
  const { user } = useUser();

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
      <TouchableOpacity onPress={() => updateCart(item.id, item.quantity + 1)}>
  <Text style={styles.quantityButtonText}>+</Text>
</TouchableOpacity>

            <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate("Checkout")}
      >
        <Text style={styles.checkoutButtonText}>Przejdź do kasy</Text>
      </TouchableOpacity>

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Koszyk</Text>
      {user ? (
        cartItems.length > 0 ? (
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
        )
      ) : (
        <Text style={styles.emptyCartText}>
          Zaloguj się, aby korzystać z koszyka
        </Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 16 },
  loginButton: { backgroundColor: "#007bff", padding: 12, borderRadius: 4 },
  loginButtonText: { color: "#fff", textAlign: "center" },
  errorText: { color: "red", marginBottom: 8 },
  welcomeText: { fontSize: 20, marginBottom: 16 },
  logoutButton: { backgroundColor: "red", padding: 12, borderRadius: 4 },
  logoutButtonText: { color: "#fff", textAlign: "center" },
  emptyCartText: {
    flex: 1,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  
});


export default CartScreen;