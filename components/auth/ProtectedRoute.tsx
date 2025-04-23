import { useRouter } from "expo-router";
import * as React from "react";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "@/lib/contexts/AuthContext";

type ProtectedRouteProps = {
    children: React.ReactNode;
    redirectPath?: string;
};

export function ProtectedRoute({ children, redirectPath = "/(auth)/sign-in" }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace(redirectPath as any);
        }
    }, [isAuthenticated, isLoading, redirectPath, router]);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return children;
}
