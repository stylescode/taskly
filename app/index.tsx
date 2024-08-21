import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { ListItem } from "../components/ListItem";

export default function App() {
  return (
    <View style={styles.container}>
      <ListItem itemName="TEA" isCompleted={false} />
      <ListItem itemName="SUGAR" isCompleted={true} />
      <ListItem itemName="CHOCOLATE" isCompleted={false} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
