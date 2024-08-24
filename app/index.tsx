import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, ScrollView, FlatList } from "react-native";
import { ListItem } from "../components/ListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  itemName: string;
  isCompleted: boolean;
};

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);

  const handleAddItem = () => {
    if (newItem.length > 0) {
      const newShoppingList = [
        ...shoppingList,
        { id: Date.now().toString(), itemName: newItem, isCompleted: false },
      ];
      setShoppingList(newShoppingList);
      setNewItem("");
    }
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={
        <View style={styles.emptyListContainer}>
          <Text>Your shopping list is empty!</Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          placeholder="E.g. Coffee"
          value={newItem}
          onChangeText={setNewItem}
          returnKeyType="done"
          onSubmitEditing={handleAddItem}
        />
      }
      data={shoppingList}
      renderItem={({ item }) => {
        return (
          <ListItem itemName={item.itemName} isCompleted={item.isCompleted} />
        );
      }}
      stickyHeaderIndices={[0]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  textInput: {
    backgroundColor: theme.colorWhite,
    borderColor: theme.colorGrey,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  emptyListContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
