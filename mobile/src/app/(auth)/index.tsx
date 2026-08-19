import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import useAuthSocial from "@/hooks/useSocailAuth";
const { width, height } = Dimensions.get("window");
export default function AuthScreen() {
  const { loadingStrategy, handleSocialAuth } = useAuthSocial();
  const isLoading = loadingStrategy !== null;
  return (
    <View className="flex-1 bg-surface-dark">
      <View className="absolute inset-0 overflow-hidden"></View>
      <SafeAreaView className="flex-1">
        <View className="items-center pt-10">
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ width: 100, height: 100, marginVertical: -20 }}
          />
          <Text className="text-4xl font-bold mt-5 text-primary font-serif tracking-wider uppercase">
            Wysa
          </Text>
        </View>
        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("../../../assets/images/auth.png")}
            style={{
              width: width - 48,
              height: height * 0.3,
            }}
            contentFit="contain"
          />

          {/* Headline */}
          <View className="mt-6 items-center">
            <Text className="text-5xl font-bold text-foreground text-center font-sans">
              Connect & Chat
            </Text>
            <Text className="text-3xl font-bold text-primary font-mono">
              Seamlessly
            </Text>
          </View>

          {/* AUTH BUTTONS */}
          <View className="flex-row gap-4 mt-10">
            {/* GOOGLE BTN */}
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.97]"
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              onPress={() => !isLoading && handleSocialAuth("oauth_google")}
            >
              {loadingStrategy === "oauth_google" ? (
                <ActivityIndicator size="small" color="#1a1a1a" />
              ) : (
                <>
                  <Image
                    source={require("../../../assets/images/google.png")}
                    style={{ width: 20, height: 20 }}
                    contentFit="contain"
                  />
                  <Text className="text-gray-900 font-semibold text-sm">
                    Google
                  </Text>
                </>
              )}
            </Pressable>

            {/* APPLE BTN */}
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 bg-white/10 py-4 rounded-2xl border border-white/20 active:scale-[0.97]"
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel="Continue with Github"
              onPress={() => !isLoading && handleSocialAuth("oauth_github")}
            >
              {loadingStrategy === "oauth_github" ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="logo-github" size={20} color="#FFFFFF" />
                  <Text className="text-foreground font-semibold text-sm">
                    Github
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
