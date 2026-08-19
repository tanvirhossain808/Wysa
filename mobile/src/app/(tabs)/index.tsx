import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  return (
    <SafeAreaView className="bg-surface text-white flex-1">
      <ScrollView className="flex-1">
        <Text className="text-white">Chats</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
