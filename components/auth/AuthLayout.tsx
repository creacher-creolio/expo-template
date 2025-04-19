import * as React from "react";
import { View, ViewProps } from "react-native";

import { KeyboardSafeArea } from "@/components/common";
import { Text } from "@/components/ui/text";

interface AuthLayoutProps extends ViewProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    successMessage?: string;
}

export const AuthLayout = ({ title, subtitle, children, footer, successMessage, ...props }: AuthLayoutProps) => {
    return (
        <KeyboardSafeArea contentContainerClassName="px-5 justify-center py-6" {...props}>
            <View className="mb-8 flex flex-col gap-2">
                <Text className="text-center text-4xl font-bold text-foreground">{title}</Text>
                {subtitle && <Text className="text-center text-lg text-muted-foreground">{subtitle}</Text>}
            </View>

            {successMessage && (
                <View className="mb-8 rounded-md border border-border bg-background p-4">
                    <Text className="text-center text-sm font-medium text-primary">{successMessage}</Text>
                </View>
            )}

            <View className="flex flex-col gap-0">{children}</View>

            {footer && <View className="">{footer}</View>}
        </KeyboardSafeArea>
    );
};
