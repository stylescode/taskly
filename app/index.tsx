import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, FlatList } from "react-native";
import { ListItem } from "../components/ListItem";
import { theme } from "../theme";
import { useState, useEffect } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

const storageKey = "shoppingList";

type ShoppingListItemType = {
  id: number;
  itemName: string;
  isCompleted: boolean;
};

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFromStorage(storageKey);
      if (data) {
        setShoppingList(data);
      }
    }
    fetchData();
  }, []);

  const handleAddItem = () => {
    if (newItem.length > 0) {
      const newShoppingList = [
        ...shoppingList,
        { id: Date.now(), itemName: newItem, isCompleted: false },
      ];
      setShoppingList(newShoppingList);
      saveToStorage(storageKey, newShoppingList);
      setNewItem("");
    }
  };

  const handleDelete = (id: number) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(newShoppingList);
    saveToStorage(storageKey, newShoppingList);
  };

  const handleToggleComplete = (id: number) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      } else {
        return item;
      }
    });
    setShoppingList(newShoppingList);
    saveToStorage(storageKey, newShoppingList);
  };

  const sortList = (list: ShoppingListItemType[]) => {
    return list.sort((a, b) => {
      return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
    });
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
      data={sortList(shoppingList)}
      renderItem={({ item }) => {
        return (
          <ListItem
            itemName={item.itemName}
            isCompleted={item.isCompleted}
            deleteItem={() => handleDelete(item.id)}
            toggleComplete={() => handleToggleComplete(item.id)}
          />
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
