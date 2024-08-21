import { Tabs } from "expo-router";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { theme } from "../theme";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colorCerulean,
        tabBarInactiveTintColor: theme.colorGrey,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shopping List",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="list" size={size} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: "Counter",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="plus" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          title: "Idea",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="lightbulb" size={size} color={color} solid />
          ),
        }}
      />
    </Tabs>
  );
}
