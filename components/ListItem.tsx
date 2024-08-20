import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { theme } from "../theme";

type Props = {
  itemName: string;
  isCompleted: boolean;
};

export const ListItem = ({ itemName, isCompleted }: Props) => {
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
    <View
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {itemName}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          isCompleted ? styles.completedButton : undefined,
        ]}
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
    borderBottomColor: theme.colorCerulean,
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
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  completedContainer: {
    backgroundColor: theme.colorDarkGrey,
    borderBottomColor: theme.colorGrey,
  },
  completedButton: {
    backgroundColor: theme.colorGrey,
  },
  completedText: {
    textDecorationLine: "line-through",
  },
});
