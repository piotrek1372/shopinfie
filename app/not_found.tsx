import { Link, Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function NotFoundScreen() {
    return (
        <>
        <Stack.Screen options={{title: "Nie znaleziono strony!"}} />
        <View style={styles.container}>
            <Link href="/">Wróć do sklepu</Link>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})