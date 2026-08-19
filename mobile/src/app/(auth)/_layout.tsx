import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/expo";

const AuthLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    // return (
    //   <View className="flex-1 items-center justify-center">
    //     <ActivityIndicator size="large" />
    //   </View>
    // );
    return null;
  }
  console.log("auth", isSignedIn);
  if (isSignedIn) return <Redirect href="/(tabs)" />;
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
