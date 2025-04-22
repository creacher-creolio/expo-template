import * as React from "react";

import { InputWithIcon } from "@/components/common";
import { EyeIcon, EyeOffIcon, LockIcon } from "@/lib/icons";

interface PasswordInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    error?: string;
    onClear?: () => void;
    onBlur?: () => void;
    onSubmitEditing?: () => void;
    returnKeyType?: "done" | "next";
    ref?: React.RefObject<any>;
    textContentType?: "password" | "newPassword";
}

export const PasswordInput = React.forwardRef<any, PasswordInputProps>(
    (
        {
            value,
            onChangeText,
            placeholder = "Password",
            error = "",
            onClear,
            onBlur,
            onSubmitEditing,
            returnKeyType = "next",
            textContentType = "password",
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = React.useState(false);

        const togglePasswordVisibility = () => setShowPassword(!showPassword);

        return (
            <InputWithIcon
                ref={ref}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={!showPassword}
                // autoCapitalize="none"
                // autoComplete="current-password"
                startIcon={<LockIcon className="text-muted-foreground" />}
                endIcon={
                    showPassword ? (
                        <EyeOffIcon className="text-muted-foreground" onPress={togglePasswordVisibility} />
                    ) : (
                        <EyeIcon className="text-muted-foreground" onPress={togglePasswordVisibility} />
                    )
                }
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                error={error}
                showClearButton={!!onClear}
                onClear={onClear}
                onBlur={onBlur}
                textContentType={textContentType}
            />
        );
    }
);

// Add display name
PasswordInput.displayName = "PasswordInput";
