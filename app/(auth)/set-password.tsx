import { useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { UpdatePasswordForm } from "@/components/auth";
import { KeyboardSafeArea } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function SetPassword() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    // Check if this route was accessed with proper token
    React.useEffect(() => {
        // In a real app, verify the token here
        const token = params.token as string;
        if (!token) {
            setError("Invalid or missing password reset token");
        }
    }, [params]);

    const handleSuccess = () => {
        setIsSuccess(true);
    };

    const handleError = (error: Error) => {
        setError(error.message);
    };

    const navigateToSignIn = () => {
        setTimeout(() => {
            router.replace("/(auth)/sign-in");
        }, 0);
    };

    if (error) {
        return (
            <KeyboardSafeArea contentContainerClassName="px-5 justify-center py-6">
                <View className="mb-6 items-center">
                    <Text className="mb-4 text-center text-3xl font-bold text-foreground">Error</Text>
                    <Text className="mb-6 text-center text-base text-destructive">{error}</Text>
                    <Button onPress={navigateToSignIn} className="mt-2 h-14 w-full">
                        <Text>Return to Sign In</Text>
                    </Button>
                </View>
            </KeyboardSafeArea>
        );
    }

    if (isSuccess) {
        return (
            <KeyboardSafeArea contentContainerClassName="px-5 justify-center py-6">
                <View className="mb-6 items-center">
                    <Text className="mb-4 text-center text-3xl font-bold text-foreground">Password Updated</Text>
                    <Text className="mb-6 text-center text-base text-muted-foreground">
                        Your password has been successfully updated.
                    </Text>
                    <Button onPress={navigateToSignIn} className="mt-2 h-14 w-full">
                        <Text>Sign In</Text>
                    </Button>
                </View>
            </KeyboardSafeArea>
        );
    }

    return (
        <KeyboardSafeArea contentContainerClassName="px-5 justify-center py-6">
            <View className="mb-10 flex flex-col gap-2">
                <Text className="text-center text-4xl font-bold text-foreground">Set New Password</Text>
                <Text className="text-center text-lg text-muted-foreground">
                    Please create a new password for your account
                </Text>
            </View>

            <View className="mb-8">
                <UpdatePasswordForm onSuccess={handleSuccess} onError={handleError} />
            </View>

            <View className="mt-4">
                <Button variant="outline" onPress={navigateToSignIn}>
                    <Text>Cancel</Text>
                </Button>
            </View>
        </KeyboardSafeArea>
    );
}
