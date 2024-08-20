import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { theme } from "../theme";

type Props = {
  itemName: string;
};

export const ListItem = ({ itemName }: Props) => {
  const handleDelete = () => {
    Alert.alert(`Are you sure you want to delete ${itemName}?`, "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => console.log("Item deleted"),
      },
    ]);
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{itemName}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleDelete}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>DELETE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1a759f",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: "200",
  },
  button: {
    backgroundColor: theme.colorBlack,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  buttonText: {
    color: theme.colorWhite,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
