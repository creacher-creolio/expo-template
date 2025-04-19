import * as React from "react";
import { View } from "react-native";

import { InputWithIcon } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { EyeIcon, EyeOffIcon, LockIcon } from "@/lib/icons";
import { validateConfirmPassword, validatePassword } from "@/lib/validation";
import { updatePassword } from "@/services/auth";

interface UpdatePasswordFormProps {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export const UpdatePasswordForm = ({ onSuccess, onError }: UpdatePasswordFormProps) => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string | null>>({});
    const [wasSubmitted, setWasSubmitted] = React.useState(false);

    const passwordInputRef = React.useRef<any>(null);
    const confirmPasswordInputRef = React.useRef<any>(null);

    React.useEffect(() => {
        // Focus on password input after a short delay
        const timer = setTimeout(() => {
            passwordInputRef.current?.focus();
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const validatePasswordField = (value: string) => {
        const error = validatePassword(value);
        setErrors(prev => ({ ...prev, password: error }));

        // Also validate confirm password if it's been entered
        if (confirmPassword) {
            validateConfirmPasswordField(confirmPassword);
        }

        return !error;
    };

    const validateConfirmPasswordField = (value: string) => {
        const error = validateConfirmPassword(password, value);
        setErrors(prev => ({ ...prev, confirmPassword: error }));
        return !error;
    };

    const handlePasswordBlur = () => {
        if (wasSubmitted) {
            validatePasswordField(password);
        }
    };

    const handleConfirmPasswordBlur = () => {
        if (wasSubmitted) {
            validateConfirmPasswordField(confirmPassword);
        }
    };

    const handleUpdatePassword = async () => {
        setWasSubmitted(true);

        const isPasswordValid = validatePasswordField(password);
        const isConfirmPasswordValid = validateConfirmPasswordField(confirmPassword);

        if (!isPasswordValid || !isConfirmPasswordValid) {
            return;
        }

        setIsLoading(true);
        try {
            await updatePassword(password);
            setPassword("");
            setConfirmPassword("");
            setErrors({});
            if (onSuccess) onSuccess();
        } catch (error: any) {
            const errorMessage = error.message || "Failed to update password";
            setErrors(prev => ({ ...prev, form: errorMessage }));
            if (onError) onError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const clearPassword = () => {
        setPassword("");
        if (wasSubmitted) {
            validatePasswordField("");
        }
    };

    const clearConfirmPassword = () => {
        setConfirmPassword("");
        if (wasSubmitted) {
            validateConfirmPasswordField("");
        }
    };

    return (
        <View className="flex flex-col gap-5">
            <InputWithIcon
                ref={passwordInputRef}
                value={password}
                onChangeText={setPassword}
                placeholder="New Password"
                secureTextEntry={!showPassword}
                startIcon={<LockIcon className="text-muted-foreground" />}
                endIcon={
                    showPassword ? (
                        <EyeOffIcon className="text-muted-foreground" onPress={togglePasswordVisibility} />
                    ) : (
                        <EyeIcon className="text-muted-foreground" onPress={togglePasswordVisibility} />
                    )
                }
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                error={errors.password || ""}
                showClearButton
                onClear={clearPassword}
                onBlur={handlePasswordBlur}
            />

            <InputWithIcon
                ref={confirmPasswordInputRef}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                startIcon={<LockIcon className="text-muted-foreground" />}
                endIcon={
                    showConfirmPassword ? (
                        <EyeOffIcon className="text-muted-foreground" onPress={toggleConfirmPasswordVisibility} />
                    ) : (
                        <EyeIcon className="text-muted-foreground" onPress={toggleConfirmPasswordVisibility} />
                    )
                }
                returnKeyType="done"
                onSubmitEditing={handleUpdatePassword}
                error={errors.confirmPassword || ""}
                showClearButton
                onClear={clearConfirmPassword}
                onBlur={handleConfirmPasswordBlur}
            />

            {errors.form && (
                <View className="px-1">
                    <Text className="text-sm text-destructive">{errors.form}</Text>
                </View>
            )}

            <Button onPress={handleUpdatePassword} disabled={isLoading} className="mt-2 h-14">
                <Text>{isLoading ? "Updating..." : "Update Password"}</Text>
            </Button>
        </View>
    );
};
