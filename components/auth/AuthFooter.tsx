import { useRouter } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { Text } from "@/components/ui/text";

interface AuthFooterProps {
    promptText: string;
    linkText: string;
    linkPath: string;
    secondaryLinkText?: string;
    secondaryLinkPath?: string;
}

export const AuthFooter = ({
    promptText,
    linkText,
    linkPath,
    secondaryLinkText,
    secondaryLinkPath,
}: AuthFooterProps) => {
    const router = useRouter();

    const navigateTo = (path: string) => {
        setTimeout(() => {
            router.replace(path as any);
        }, 0);
    };

    return (
        <View className="flex flex-col">
            <View className="mb-4 mt-2 flex-row justify-center">
                <Text className="text-muted-foreground">{promptText} </Text>
                <Text className="font-semibold text-primary" onPress={() => navigateTo(linkPath)}>
                    {linkText}
                </Text>
            </View>

            {secondaryLinkText && secondaryLinkPath && (
                <Text className="text-center font-medium text-primary" onPress={() => navigateTo(secondaryLinkPath)}>
                    {secondaryLinkText}
                </Text>
            )}
        </View>
    );
};
