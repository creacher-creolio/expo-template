import { useRouter } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { AuthLayout, AuthFooter } from "@/components/auth";
import { EmailInput, PasswordInput, FormError, SubmitButton } from "@/components/auth/common";
import { useAuthForm } from "@/hooks/useAuthForm";
import { validateConfirmPassword, validateEmail, validatePassword } from "@/lib/validation";
import { signUp } from "@/services/auth";

export default function SignUp() {
    const router = useRouter();
    const [successMessage, setSuccessMessage] = React.useState("");

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
        return focusFirstField();
    }, [focusFirstField]);

    const handleSignUp = async () => {
        try {
            await handleSubmit(async () => {
                await signUp(fieldState.email.value, fieldState.password.value);
                setSuccessMessage("Account created successfully. Please check your email to confirm your account.");

                // Navigate after showing success message
                setTimeout(() => {
                    setTimeout(() => {
                        router.replace("/(auth)/sign-in");
                    }, 0);
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
            <View className="flex flex-col gap-5">
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

                <FormError error={formError} />
            </View>

            <SubmitButton
                onPress={handleSignUp}
                isLoading={isLoading}
                text="Sign Up"
                loadingText="Creating Account..."
            />
        </AuthLayout>
    );
}
