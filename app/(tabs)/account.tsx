import { View, Text, StyleSheet } from "react-native";

export default function ShopScreen() {
    return (
        <View style={styles.container}>
            <Text>Nie jesteś zalogowany</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})