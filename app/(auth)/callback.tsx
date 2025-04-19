import { useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { ActivityIndicator, View } from "react-native";

import { Text } from "@/components/ui/text";
import { supabase } from "@/services/supabase";

export default function AuthCallback() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const handleDeepLink = async () => {
            // Process the URL params for auth callback
            try {
                // Extract the necessary parts from the URL
                const refreshToken = params.refresh_token as string;
                const accessToken = params.access_token as string;
                const type = params.type as string;

                if (!refreshToken && !accessToken) {
                    throw new Error("No authentication tokens found");
                }

                if (refreshToken && type === "recovery") {
                    // This is a password reset
                    router.replace({
                        pathname: "/(auth)/set-password",
                        params: { token: refreshToken },
                    });
                    return;
                }

                // For other auth flows, try to set the session
                if (refreshToken && accessToken) {
                    const { error } = await supabase.auth.setSession({
                        refresh_token: refreshToken,
                        access_token: accessToken,
                    });

                    if (error) throw error;

                    // Navigate to the main app
                    router.replace("/(tabs)");
                    return;
                }

                // If we get here, try to exchange auth code
                const { data, error } = await supabase.auth.getSession();

                if (error) throw error;
                if (data?.session) {
                    router.replace("/(tabs)");
                } else {
                    router.replace("/(auth)/sign-in");
                }
            } catch (err: any) {
                console.error("Deep link error:", err);
                setError(err.message || "An error occurred during authentication");
            }
        };

        handleDeepLink();
    }, [params, router]);

    if (error) {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <Text className="mb-2 text-lg font-semibold text-destructive">Authentication Error</Text>
                <Text className="mb-4 text-center text-base">{error}</Text>
                <Text className="font-medium text-primary" onPress={() => router.replace("/(auth)/sign-in")}>
                    Return to Sign In
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="mt-4 text-muted-foreground">Processing authentication...</Text>
        </View>
    );
}
