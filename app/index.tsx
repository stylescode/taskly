import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, ScrollView } from "react-native";
import { ListItem } from "../components/ListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  itemName: string;
  isCompleted: boolean;
};

const initialItems: ShoppingListItemType[] = [
  {
    id: "1",
    itemName: "TEA",
    isCompleted: false,
  },
  {
    id: "2",
    itemName: "SUGAR",
    isCompleted: true,
  },
  {
    id: "3",
    itemName: "CHOCOLATE",
    isCompleted: false,
  },
];

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [shoppingList, setShoppingList] = useState(initialItems);

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
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="E.g. Coffee"
        value={newItem}
        onChangeText={setNewItem}
        returnKeyType="done"
        onSubmitEditing={handleAddItem}
      />
      {shoppingList.map((item) => (
        <ListItem
          key={item.id}
          itemName={item.itemName}
          isCompleted={item.isCompleted}
        />
      ))}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  textInput: {
    borderColor: theme.colorGrey,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
  },
});
