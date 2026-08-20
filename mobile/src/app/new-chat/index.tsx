import UserItem from "@/components/UserItem";
import { useGetOrCreateChat } from "@/hooks/useChats";
import { useUsers } from "@/hooks/useUsers";
import { User } from "@/types";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const NewCharScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allUsers, isLoading, error } = useUsers();
  console.log(isLoading, "isLoading");
  const { mutate: getOrCreateChat, isPending: isCreatingChat } =
    useGetOrCreateChat();
  const users = allUsers?.filter((u) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      u.name?.toLowerCase().includes(query) ||
      u.email?.toLowerCase().includes(query)
    );
  });
  const handleUserSelect = (user: User) => {
    getOrCreateChat(user._id, {
      onSuccess: (chat) => {
        router.dismiss(); // go -1

        setTimeout(() => {
          router.push({
            pathname: "/chat/[id]",
            params: {
              id: chat._id,
              participantId: chat.participant._id,
              name: chat.participant.name,
              avatar: chat.participant.avatar,
            },
          });
        }, 100);
      },
    });
  };
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-black">
      <View className="flex-1 justify-end bg-black/40 ">
        <View className="bg-surface rounded-t-3xl h-[95%] overflow-hidden">
          <View className="px-5 gap-1 pt-3 mb-1 pb-3 bg-surface border-b border-surface-light flex-row items-center">
            <Pressable onPress={() => router.back()}>
              <EvilIcons name="close" size={20} color="#F4A261" />
            </Pressable>
            <View className="flex-1">
              <Text className="text-foreground text-xl font-semibold">
                New chat
              </Text>
              <Text className="text-muted-foreground text-xs mt-0.5">
                Search for a user to start chatting
              </Text>
            </View>
          </View>

          {/* SEARCH BAR */}
          <View className="px-5 pt-3 pb-2 bg-surface">
            <View className="flex-row items-center bg-surface-card rounded-full px-3 py-1.5 gap-2 border border-surface-light">
              <Ionicons name="search" size={18} color="#6B6B70" />
              <TextInput
                placeholder="Search users"
                placeholderTextColor="#6B6B70"
                className="flex-1 text-foreground text-sm"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
              />
            </View>
          </View>
          {/* USERS LIST */}

          <View className="flex-1 bg-surface">
            {isCreatingChat || isLoading ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#F4A261" />
              </View>
            ) : !users || users.length === 0 ? (
              <View className="flex-1 items-center justify-center px-5">
                <Ionicons name="person-outline" size={64} color="#6B6B70" />
                <Text className="text-muted-foreground text-lg mt-4">
                  No users found
                </Text>
                <Text className="text-subtle-foreground text-sm mt-1 text-center">
                  Try a different search term
                </Text>
              </View>
            ) : (
              <ScrollView
                className="flex-1 px-5 pt-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
              >
                <Text className="text-muted-foreground text-xs mb-3">
                  USERS
                </Text>
                {/* {users.map((user) => (
                  // <UserItem
                  //   key={user._id}
                  //   user={user}
                  //   isOnline={onlineUsers.has(user._id)}
                  //   onPress={() => handleUserSelect(user)}
                  // />
                  <Text key={user._id} className="text-white">
                    {user.name}
                  </Text>
                ))} */}
                {users.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    // isOnline={onlineUsers.has(user._id)}
                    isOnline={true}
                    onPress={() => handleUserSelect(user)}
                  />
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default NewCharScreen;
