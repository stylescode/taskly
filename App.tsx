import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>COFFEE</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#1a759f",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: "200",
  },
});
