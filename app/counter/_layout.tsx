import { Link, Stack } from "expo-router";
import { Pressable, Text } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { theme } from "../../theme";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Counter",
          headerRight: () => {
            return (
              <Link href={"/counter/history"} asChild>
                <Pressable hitSlop={30}>
                  <FontAwesome6
                    name="clock-rotate-left"
                    size={26}
                    color={theme.colorDarkGrey}
                  />
                </Pressable>
              </Link>
            );
          },
        }}
      />
    </Stack>
  );
}
