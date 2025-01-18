import { Tabs } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { cartItems } from "../../context/cartContext";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Shopinfie",
          tabBarIcon: ({ color }) => <Entypo size={28} name="shop" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Konto",
          tabBarIcon: ({ color }) => <AntDesign size={28} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Koszyk",
          tabBarIcon: ({ color }) => (
            <View>
            <AntDesign size={28} name="shoppingcart" color={color} />
            {cartItems && cartItems.length > 0 &&(
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItems.length}</Text>
              </View>
            )}
          </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -10,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 2,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
  },
  
})