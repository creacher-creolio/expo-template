import { Redirect } from "expo-router";
import * as React from "react";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "@/contexts/auth-context";

export default function HomeRedirect() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return isAuthenticated ? <Redirect href="/(tabs)" /> : <Redirect href="/(auth)/sign-in" />;
}
