import * as React from "react";

import { Form, FormError, PasswordInput, SubmitButton } from "@/components/common";
import { useAuthForm } from "@/hooks/useAuthForm";
import { auth } from "@/lib/services/auth";
import { validateConfirmPassword, validatePassword } from "@/lib/validation";

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
                await auth.updatePassword(fieldState.password.value);
                // Reset form
                fieldState.password.setValue("");
                fieldState.confirmPassword.setValue("");
                onSuccess?.();
            });
        } catch (error) {
            onError?.(error as Error);
        }
    };

    return (
        <Form onSubmit={handleUpdatePassword}>
            <PasswordInput
                ref={fieldState.password.ref}
                value={fieldState.password.value}
                onChangeText={fieldState.password.setValue}
                placeholder="New Password"
                error={fieldState.password.error || ""}
                onClear={fieldState.password.clearValue}
                onBlur={fieldState.password.handleBlur}
                onSubmitEditing={() => fieldState.confirmPassword.ref.current?.focus()}
                textContentType="newPassword"
            />

            <PasswordInput
                ref={fieldState.confirmPassword.ref}
                value={fieldState.confirmPassword.value}
                onChangeText={fieldState.confirmPassword.setValue}
                placeholder="Confirm New Password"
                error={fieldState.confirmPassword.error || ""}
                onClear={fieldState.confirmPassword.clearValue}
                onBlur={fieldState.confirmPassword.handleBlur}
                onSubmitEditing={handleUpdatePassword}
                returnKeyType="done"
                textContentType="newPassword"
            />

            <FormError error={formError} />

            <SubmitButton
                onPress={handleUpdatePassword}
                isLoading={isLoading}
                text="Update Password"
                loadingText="Updating..."
            />
        </Form>
    );
};
