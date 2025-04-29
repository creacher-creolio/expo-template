import { router } from "expo-router";
import * as React from "react";
import { ActivityIndicator } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { LogOutIcon } from "@/lib/icons";
import { auth } from "@/lib/services/auth";

interface SignOutButtonProps {
    onError?: (error: string) => void;
}

export const SignOutButton = ({ onError }: SignOutButtonProps) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSignOut = async () => {
        try {
            setIsLoading(true);
            await auth.signOut();
            router.replace("/");
        } catch (err: any) {
            if (onError) {
                onError(err.message || "Failed to sign out");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="secondary"
            className="w-full flex-row items-center justify-center"
            onPress={handleSignOut}
            disabled={isLoading}>
            {isLoading ? (
                <ActivityIndicator color="white" size="small" />
            ) : (
                <>
                    <LogOutIcon className="mr-2 h-5 w-5 text-foreground" />
                    <Text>Sign Out</Text>
                </>
            )}
        </Button>
    );
};
