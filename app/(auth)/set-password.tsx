import { useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { UpdatePasswordForm, AuthLayout } from "@/components/auth";
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
            <AuthLayout title="Error">
                <View className="items-center">
                    <Text className="text-center text-base text-destructive">{error}</Text>
                </View>

                <Button onPress={navigateToSignIn} className="h-14 w-full">
                    <Text>Return to Sign In</Text>
                </Button>
            </AuthLayout>
        );
    }

    if (isSuccess) {
        return (
            <AuthLayout title="Password Updated" subtitle="Your password has been successfully updated.">
                <Button onPress={navigateToSignIn} className="h-14 w-full">
                    <Text>Sign In</Text>
                </Button>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Set New Password"
            subtitle="Please create a new password for your account"
            footer={
                <Button variant="outline" onPress={navigateToSignIn}>
                    <Text>Cancel</Text>
                </Button>
            }>
            <UpdatePasswordForm onSuccess={handleSuccess} onError={handleError} />
        </AuthLayout>
    );
}
