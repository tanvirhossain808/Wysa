import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function index() {
  return (
    <SafeAreaView className="bg-surface text-white flex-1">
      <ScrollView className="flex-1">
        <Text className="text-white">Chats</Text>
        {/*     <Button
          title="Try!"
          onPress={() => {
            Sentry.captureException(new Error("First error"));
          }}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
