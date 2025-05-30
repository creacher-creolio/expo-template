import { useRouter } from "expo-router";
import * as React from "react";

import { AuthFooter, AuthLayout, BaseAuthForm } from "@/components/auth";
import { EmailInput, PasswordInput } from "@/components/common";
import { useAuthForm } from "@/hooks/useAuthForm";
import { auth } from "@/lib/services/auth";
import { validateConfirmPassword, validateEmail, validatePassword } from "@/lib/validation";

export default function SignUp() {
    const router = useRouter();
    const [successMessage, setSuccessMessage] = React.useState("");
    const [initialFocusComplete, setInitialFocusComplete] = React.useState(false);

    const validateConfirmPasswordWithContext = (value: string) => {
        return validateConfirmPassword(fieldState.password.value, value);
    };

    const { fieldState, isLoading, formError, handleSubmit, focusFirstField } = useAuthForm({
        email: {
            validationFn: validateEmail,
        },
        password: {
            validationFn: validatePassword,
        },
        confirmPassword: {
            validationFn: validateConfirmPasswordWithContext,
        },
    });

    React.useEffect(() => {
        if (!initialFocusComplete) {
            const cleanup = focusFirstField();
            setInitialFocusComplete(true);
            return cleanup;
        }
    }, [focusFirstField, initialFocusComplete]);

    const handleSignUp = async () => {
        try {
            await handleSubmit(async () => {
                await auth.signUp(fieldState.email.value, fieldState.password.value);
                setSuccessMessage("Account created successfully. Please check your email to confirm your account.");

                // Navigate after showing success message
                setTimeout(() => {
                    router.replace("/(auth)/sign-in");
                }, 2000);
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
            // Error already handled by useAuthForm
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Sign up for a new account"
            successMessage={successMessage}
            footer={<AuthFooter promptText="Already have an account?" linkText="Sign In" linkPath="/(auth)/sign-in" />}>
            <BaseAuthForm
                onSubmit={handleSignUp}
                isSubmitting={isLoading}
                buttonText="Sign Up"
                loadingText="Creating Account..."
                formError={formError}>
                <EmailInput
                    ref={fieldState.email.ref}
                    value={fieldState.email.value}
                    onChangeText={fieldState.email.setValue}
                    error={fieldState.email.error || ""}
                    onClear={fieldState.email.clearValue}
                    onBlur={fieldState.email.handleBlur}
                    onSubmitEditing={() => fieldState.password.ref.current?.focus()}
                />

                <PasswordInput
                    ref={fieldState.password.ref}
                    value={fieldState.password.value}
                    onChangeText={fieldState.password.setValue}
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
                    placeholder="Confirm Password"
                    error={fieldState.confirmPassword.error || ""}
                    onClear={fieldState.confirmPassword.clearValue}
                    onBlur={fieldState.confirmPassword.handleBlur}
                    onSubmitEditing={handleSignUp}
                    returnKeyType="done"
                    textContentType="newPassword"
                />
            </BaseAuthForm>
        </AuthLayout>
    );
}
