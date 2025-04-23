import * as React from "react";
import { Pressable } from "react-native";

import { InputField } from "@/components/common";
import { EyeIcon, EyeOffIcon, LockIcon } from "@/lib/icons";

interface PasswordInputProps {
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    onClear?: () => void;
    onBlur?: () => void;
    onSubmitEditing?: () => void;
    returnKeyType?: "done" | "next";
    placeholder?: string;
    textContentType?: "password" | "newPassword" | "none";
}

const PasswordInput = React.forwardRef<any, PasswordInputProps>(
    (
        {
            value,
            onChangeText,
            error = "",
            onClear,
            onBlur,
            onSubmitEditing,
            returnKeyType = "next",
            placeholder = "Password",
            textContentType = "password",
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = React.useState(false);

        const toggleVisibility = React.useCallback(() => {
            setIsVisible(prev => !prev);
        }, []);

        const renderVisibilityIcon = React.useCallback(
            () => (
                <Pressable
                    onPress={toggleVisibility}
                    accessibilityRole="button"
                    accessibilityLabel={isVisible ? "Hide password" : "Show password"}>
                    {isVisible ? (
                        <EyeOffIcon className="text-muted-foreground" size={20} />
                    ) : (
                        <EyeIcon className="text-muted-foreground" size={20} />
                    )}
                </Pressable>
            ),
            [isVisible, toggleVisibility]
        );

        return (
            <InputField
                ref={ref}
                value={value}
                onChangeText={onChangeText}
                label={placeholder}
                placeholder="••••••••"
                secureTextEntry={!isVisible}
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={<LockIcon className="text-muted-foreground" size={20} />}
                rightIcon={renderVisibilityIcon()}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                error={error}
                showClearButton={true}
                onClear={onClear}
                onBlur={onBlur}
                textContentType={textContentType}
                accessibilityLabel={`${placeholder} input field`}
            />
        );
    }
);

PasswordInput.displayName = "PasswordInput";

// Use React.memo for performance optimization
export { PasswordInput };
