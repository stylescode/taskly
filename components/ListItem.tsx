import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

type Props = {
  itemName: string;
  isCompleted: boolean;
  onDelete: () => void;
};

export const ListItem = ({ itemName, isCompleted, onDelete }: Props) => {
  const handleDelete = () => {
    Alert.alert(`Are you sure you want to delete ${itemName}?`, "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(),
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
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.9}>
        {DeleteBtn}
      </TouchableOpacity>
    </View>
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
  itemText: {
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: "200",
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
