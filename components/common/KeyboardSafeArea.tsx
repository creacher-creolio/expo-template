import * as React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    View,
    type ViewProps,
} from "react-native";

import { useKeyboard } from "@/hooks/useKeyboard";
import { cn } from "@/lib/utils";

interface KeyboardSafeAreaProps extends ViewProps {
    children: React.ReactNode;
    bottomOffset?: number;
    avoidKeyboard?: boolean;
    dismissKeyboardOnPress?: boolean;
    contentContainerClassName?: string;
}

/**
 * A component that wraps content in a keyboard-aware container
 * and handles keyboard interactions like dismissing on press
 * Compatible with Expo Go
 */
export function KeyboardSafeArea({
    children,
    className,
    bottomOffset = 100,
    avoidKeyboard = true,
    dismissKeyboardOnPress = true,
    contentContainerClassName,
    ...props
}: KeyboardSafeAreaProps) {
    const { dismissKeyboard } = useKeyboard();
    const isWeb = Platform.OS === "web";

    const Container = avoidKeyboard ? KeyboardAvoidingView : View;

    const content = (
        <Container
            className={cn("flex-1", className)}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={bottomOffset}
            {...props}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                className={cn("flex-1")}
                keyboardShouldPersistTaps="handled">
                <View className={cn(contentContainerClassName)}>{children}</View>
            </ScrollView>
        </Container>
    );

    // Don't use TouchableWithoutFeedback on web as it causes inputs to lose focus
    if (isWeb || !dismissKeyboardOnPress) {
        return content;
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
            {content}
        </TouchableWithoutFeedback>
    );
}
