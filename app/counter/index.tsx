import { Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { registerForPushNotifications } from "../../utils/registerForPushNotifications";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Duration, isBefore, intervalToDuration } from "date-fns";
import { TimeSegment } from "../../components/TimeSegment";

const timestamp = Date.now() + 10 * 1000;

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const [countdownStatus, setCountdownStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  console.log(countdownStatus);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timestamp, Date.now());
      const distance = intervalToDuration(
        isOverdue
          ? { start: timestamp, end: Date.now() }
          : { start: Date.now(), end: timestamp },
      );
      setCountdownStatus({ isOverdue, distance });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

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
    <View
      style={[
        styles.container,
        countdownStatus.isOverdue ? styles.late : undefined,
      ]}
    >
      {countdownStatus.isOverdue ? (
        <Text style={[styles.heading, styles.whiteText]}>Thing overdue by</Text>
      ) : (
        <Text style={styles.heading}>Thing due in ...</Text>
      )}
      <View style={styles.countdownRow}>
        <TimeSegment
          unit="Days"
          number={countdownStatus.distance.days ?? 0}
          textStyle={countdownStatus.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Hours"
          number={countdownStatus.distance.hours ?? 0}
          textStyle={countdownStatus.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Minutes"
          number={countdownStatus.distance.minutes ?? 0}
          textStyle={countdownStatus.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Seconds"
          number={countdownStatus.distance.seconds ?? 0}
          textStyle={countdownStatus.isOverdue ? styles.whiteText : undefined}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={scheduleNotification}>
        <Text style={styles.buttonText}>I'VE DONE THE THING!</Text>
      </TouchableOpacity>
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
    backgroundColor: "black",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1,
  },
  countdownRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  late: {
    backgroundColor: "red",
  },
  whiteText: {
    color: "white",
  },
});
