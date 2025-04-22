import * as React from "react";
import { View } from "react-native";

import { PasswordInput, FormError, SubmitButton } from "@/components/auth";
import { useAuthForm } from "@/hooks/useAuthForm";
import { validateConfirmPassword, validatePassword } from "@/lib/validation";
import { updatePassword } from "@/services/auth";

interface UpdatePasswordFormProps {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export const UpdatePasswordForm = ({ onSuccess, onError }: UpdatePasswordFormProps) => {
    const validateConfirmPasswordWithContext = (value: string) => {
        return validateConfirmPassword(fieldState.password.value, value);
    };

    const { fieldState, isLoading, formError, handleSubmit, focusFirstField } = useAuthForm({
        password: {
            validationFn: validatePassword,
        },
        confirmPassword: {
            validationFn: validateConfirmPasswordWithContext,
        },
    });

    React.useEffect(() => {
        return focusFirstField();
    }, [focusFirstField]);

    const handleUpdatePassword = async () => {
        try {
            await handleSubmit(async () => {
                await updatePassword(fieldState.password.value);
                // Reset form
                fieldState.password.setValue("");
                fieldState.confirmPassword.setValue("");
                if (onSuccess) onSuccess();
            });
        } catch (error: any) {
            if (onError) onError(error);
        }
    };

    return (
        <View className="flex flex-col gap-5">
            <PasswordInput
                ref={fieldState.password.ref}
                value={fieldState.password.value}
                onChangeText={fieldState.password.setValue}
                placeholder="New Password"
                error={fieldState.password.error || ""}
                onClear={fieldState.password.clearValue}
                onBlur={fieldState.password.handleBlur}
                onSubmitEditing={() => fieldState.confirmPassword.ref.current?.focus()}
            />

            <PasswordInput
                ref={fieldState.confirmPassword.ref}
                value={fieldState.confirmPassword.value}
                onChangeText={fieldState.confirmPassword.setValue}
                placeholder="Confirm Password"
                error={fieldState.confirmPassword.error || ""}
                onClear={fieldState.confirmPassword.clearValue}
                onBlur={fieldState.confirmPassword.handleBlur}
                onSubmitEditing={handleUpdatePassword}
                returnKeyType="done"
            />

            <FormError error={formError} />

            <SubmitButton
                onPress={handleUpdatePassword}
                isLoading={isLoading}
                text="Update Password"
                className="h-14"
            />
        </View>
    );
};
