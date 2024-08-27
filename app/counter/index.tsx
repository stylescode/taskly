import { Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { registerForPushNotifications } from "../../utils/registerForPushNotifications";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default function CounterScreen() {
  const scheduleNotification = async () => {
    const result = await registerForPushNotifications();
    if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Taskly Reminder",
          body: "Make sure your list up to date!",
        },
        trigger: {
          hour: 9,
          minute: 0,
          repeats: true,
        },
      });
    } else {
      if (Device.isDevice)
        Alert.alert(
          "Notifications not permitted",
          "Enable notifications in settings",
        );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={scheduleNotification}>
        <Text style={styles.buttonText}>Schedule Notification</Text>
      </TouchableOpacity>
      <Text>Counter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});