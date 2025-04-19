import * as React from "react";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { AlertTriangleIcon } from "@/lib/icons";

interface FormErrorProps {
    error?: string | null;
    showIcon?: boolean;
}

export const FormError = ({ error, showIcon = true }: FormErrorProps) => {
    if (!error) return null;

    return (
        <View className="flex-row items-center px-1">
            {showIcon && <AlertTriangleIcon size={16} className="mr-2 text-destructive" />}
            <Text className="text-sm text-destructive">{error}</Text>
        </View>
    );
};
