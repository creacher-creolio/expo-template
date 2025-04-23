import { User } from "@supabase/supabase-js";
import * as React from "react";
import { View } from "react-native";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";

interface ProfileHeaderProps {
    user: User | null;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
    // Helper to get user initials for avatar fallback
    const getUserInitials = () => {
        if (!user?.email) return "?";
        return user.email.charAt(0).toUpperCase();
    };

    return (
        <View className="mb-6 flex-row items-center">
            <Avatar className="mr-4 h-16 w-16" alt={user?.email || "User avatar"}>
                <AvatarImage source={{ uri: user?.user_metadata?.avatar_url }} />
                <AvatarFallback>
                    <Text className="text-xl font-semibold">{getUserInitials()}</Text>
                </AvatarFallback>
            </Avatar>
            <View>
                <Text className="text-3xl font-bold">Profile</Text>
                <Text className="text-muted-foreground">{user?.email}</Text>
            </View>
        </View>
    );
};
