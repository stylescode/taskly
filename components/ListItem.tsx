import { Alert, StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import { theme } from "../theme";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

type Props = {
  itemName: string;
  isCompleted: boolean;
  deleteItem: () => void;
  toggleComplete: () => void;
};

export const ListItem = ({ itemName, isCompleted, deleteItem, toggleComplete }: Props) => {
  const handleDelete = () => {
    Alert.alert(`Are you sure you want to delete ${itemName}?`, "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteItem(),
      },
    ]);
  };

  const DeleteBtn = (
    <FontAwesome6
      name="circle-xmark"
      size={20}
      color={isCompleted ? theme.colorDarkGrey : theme.colorRed}
      solid
    />
  );

  const notDoneIcon = (
    <FontAwesome6 name="circle" size={20} color={theme.colorCerulean} />
  );

  const doneIcon = (
    <FontAwesome6 name="circle" size={20} color={theme.colorCerulean} solid />
  );

  return (
    <Pressable
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress={toggleComplete}
    >
      <View style={styles.itemInfo}>
        {isCompleted ? doneIcon : notDoneIcon}
        <Text
          numberOfLines={1}
          style={[
            styles.itemText,
            isCompleted ? styles.completedText : undefined,
          ]}
        >
          {itemName}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.9}>
        {DeleteBtn}
      </TouchableOpacity>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colorDarkGrey,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemInfo: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    flex: 1,
  },
  itemText: {
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: "200",
    flex: 1,
  },
  completedContainer: {
    backgroundColor: theme.colorGrey,
    borderBottomColor: theme.colorDarkGrey,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: theme.colorDarkGrey,
  },
});
