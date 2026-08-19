import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

const SsoCallback = () => {
  const { isSignedIn, isLoaded } = useAuth();
  if (isSignedIn) return <Redirect href="/(tabs)" />;
  else return <Redirect href="/(auth)" />;
};

export default SsoCallback;
