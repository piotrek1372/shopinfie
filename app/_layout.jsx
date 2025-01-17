import { CartProvider } from "@/context/cartContext";
import { UserProvider } from "@/context/userContext";
import { Stack } from "expo-router";


export default function Layout() {
  return (
    <UserProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)/_layout" options={{ headerShown: false }} />
          <Stack.Screen name="(stack)/product" options={{ title: "Szczegóły produktu" }} />
        </Stack>
      </CartProvider>
    </UserProvider>
  );
}