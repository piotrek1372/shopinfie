import { View, Text, StyleSheet } from "react-native";
import Products from "@/components/Products";
import { CartProvider } from "@/context/cartContext";
export default function ShopScreen() {
    return (
        <Products style={styles.container} />
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
})