import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/expo";

export default function profile() {
  const { signOut } = useAuth();
  return (
    <SafeAreaView className="bg-surface text-white flex-1">
      <ScrollView className="flex-1">
        <Text className="text-white">profile</Text>
        <Pressable onPress={() => signOut()}>
          <Text className="text-white">Signout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
