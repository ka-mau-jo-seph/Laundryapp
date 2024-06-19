import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "../../store";

export { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Provider store={store}>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "white" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Feather name="home" size={24} color="black" />
                
              ) : (
                <Feather name="home" size={24} color="white" />
              ),
            tabBarStyle: { backgroundColor: "#4296fb" }, // Set tab bar background color
          }}
        />

        <Tabs.Screen
          name="basket"
          options={{
            tabBarLabel: "Basket",
            tabBarLabelStyle: { color: "white" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="basket-outline" size={24} color="black" />
              ) : (
                <Ionicons name="basket-outline" size={24} color="white" />
              ),
            tabBarStyle: { backgroundColor: "#4296fb" }, // Set tab bar background color
          }}
        />

        <Tabs.Screen
          name="order"
          options={{
            tabBarLabel: "Orders",
            tabBarLabelStyle: { color: "white" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="account-details"
                  size={24}
                  color="black"
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-details"
                  size={24}
                  color="white"
                />
              ),
            tabBarStyle: { backgroundColor: "4296fb" }, // Set tab bar background color
          }}
        />
      </Tabs>
    </Provider>
  );
}
