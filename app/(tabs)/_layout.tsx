import { Tabs } from "expo-router";
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{tabBarActiveTintColor: 'blue'}}>
            <Tabs.Screen name="index" options={{title: 'Shopinfie', tabBarIcon: ({color}) => <Entypo size={28} name="shop" color={color} />,
            }}
            />
            <Tabs.Screen name="account" options={{title: 'Konto', tabBarIcon: ({color}) => <AntDesign size={28} name="user" color={color} />,
            }} />
            <Tabs.Screen name="cart" options={{title: 'Koszyk', tabBarIcon: ({color}) => <AntDesign size={28} name="shoppingcart" color={color} />,
            }} />
        </Tabs>
    )
}