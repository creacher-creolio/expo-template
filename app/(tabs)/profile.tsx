import * as React from "react";
import { ScrollView, View } from "react-native";

import { ProtectedRoute } from "@/components/auth";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/auth-context";

export default function ProfileScreen() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}

function ProfileContent() {
    const { user } = useAuth();

    return (
        <ScrollView className="flex-1 p-4">
            <View className="mb-6 rounded-lg border border-border bg-card p-4">
                <Text className="mb-2 text-xl font-bold text-card-foreground">Profile</Text>
                <Text className="text-muted-foreground">Email: {user?.email}</Text>
                <Text className="text-muted-foreground">ID: {user?.id}</Text>
                <Text className="text-muted-foreground">
                    Last Sign In: {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "N/A"}
                </Text>
            </View>
        </ScrollView>
    );
}
