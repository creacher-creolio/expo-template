import * as React from "react";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

interface ErrorScreenProps {
    errorMessage: string;
    onRetry: () => void;
}

export const ErrorScreen = ({ errorMessage, onRetry }: ErrorScreenProps) => {
    return (
        <View className="flex-1 items-center justify-center p-4">
            <Text className="mb-4 text-lg text-destructive">{errorMessage}</Text>
            <Button onPress={onRetry}>
                <Text>Retry</Text>
            </Button>
        </View>
    );
};
