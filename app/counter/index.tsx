import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { registerForPushNotifications } from "../../utils/registerForPushNotifications";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Duration, isBefore, intervalToDuration } from "date-fns";
import { TimeSegment } from "../../components/TimeSegment";
import { getFromStorage, saveToStorage } from "../../utils/storage";
import { theme } from "../../theme";
import * as Haptics from "expo-haptics";
import ConfettiCannon from "react-native-confetti-cannon";

const frequency = 24 * 60 * 60 * 1000;

export const countdownStorageKey = "tasklyCountdown";

export type PersistedCountdownState = {
  currentNotificationId: string | undefined;
  completedAtTimestamps: number[];
};

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const confettiRef = useRef<any>(null);
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();
  const [countdownStatus, setCountdownStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  const lastCompletedTimestamp = countdownState?.completedAtTimestamps[0];

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      setCountdownState(value);
    };
    init();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timestamp = lastCompletedTimestamp
        ? lastCompletedTimestamp + frequency
        : Date.now();
      const isOverdue = isBefore(timestamp, Date.now());
      const distance = intervalToDuration(
        isOverdue
          ? { start: timestamp, end: Date.now() }
          : { start: Date.now(), end: timestamp },
      );
      setCountdownStatus({ isOverdue, distance });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [lastCompletedTimestamp]);

  const scheduleNotification = async () => {
    confettiRef?.current?.start();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    let pushNotificationId;
    const result = await registerForPushNotifications();
    if (result === "granted") {
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Taskly Reminder",
          body: "Countdown has reached 0!",
        },
        trigger: {
          seconds: frequency / 1000,
        },
      });
    } else {
      if (Device.isDevice)
        Alert.alert(
          "Notifications not permitted",
          "Enable notifications in settings",
        );
    }
    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState.currentNotificationId,
      );
    }

    const newCountdownState: PersistedCountdownState = {
      currentNotificationId: pushNotificationId,
      completedAtTimestamps: countdownState
        ? [Date.now(), ...countdownState.completedAtTimestamps]
        : [Date.now()],
    };
    setCountdownState(newCountdownState);
    await saveToStorage(countdownStorageKey, newCountdownState);
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
      <ConfettiCannon
        ref={confettiRef}
        count={50}
        origin={{ x: Dimensions.get("window").width / 2, y: -20 }}
        fadeOut
        autoStart={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  button: {
    backgroundColor: theme.colorBlack,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
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
    backgroundColor: theme.colorRed,
  },
  whiteText: {
    color: theme.colorWhite,
  },
});
