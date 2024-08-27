import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveToStorage(key: string, data: object) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch {
    console.error("Error saving data to storage");
  }
}

export async function getFromStorage(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
