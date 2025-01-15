import { Slot } from "expo-router";
import { CartProvider } from "./context/cartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <Slot />
    </CartProvider>
  );
}
