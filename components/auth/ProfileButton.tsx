import { useRouter } from "expo-router";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/lib/contexts/AuthContext";
import { LogOutIcon, UserIcon } from "@/lib/icons";
import { auth } from "@/lib/services/auth";

export function ProfileButton() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <TouchableOpacity
                accessibilityRole="button"
                onPress={() => router.push("/(auth)/sign-in")}
                className="h-8 w-8 items-center justify-center rounded-full bg-primary">
                <UserIcon className="h-5 w-5 text-primary-foreground" />
            </TouchableOpacity>
        );
    }

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            router.replace("/(auth)/sign-in");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const userInitial = user?.email?.[0].toUpperCase() || "U";

    return (
        <Popover>
            <PopoverTrigger asChild>
                <TouchableOpacity accessibilityRole="button" className="h-8 w-8 overflow-hidden rounded-full bg-accent">
                    <View className="h-full w-full items-center justify-center">
                        <Text className="text-sm font-medium text-accent-foreground">{userInitial}</Text>
                    </View>
                </TouchableOpacity>
            </PopoverTrigger>
            <PopoverContent className="w-56">
                <Text className="p-2 text-sm font-medium text-popover-foreground">{user?.email}</Text>

                <TouchableOpacity
                    accessibilityRole="button"
                    onPress={handleSignOut}
                    className="flex-row items-center gap-2 rounded-md p-2 hover:bg-accent">
                    <LogOutIcon className="h-4 w-4 text-popover-foreground" />
                    <Text className="text-sm font-medium text-popover-foreground">Sign Out</Text>
                </TouchableOpacity>
            </PopoverContent>
        </Popover>
    );
}
