import { useRouter } from "expo-router";
import * as React from "react";

import { AuthLayout, AuthFooter } from "@/components/auth";
import { EmailInput, PasswordInput, FormError, SubmitButton } from "@/components/auth/common";
import { Form } from "@/components/common";
import { Text } from "@/components/ui/text";
import { useAuthForm } from "@/hooks/useAuthForm";
import { signInWithPassword } from "@/lib/services/auth";
import { validateEmail, validatePassword } from "@/lib/validation";

export default function SignIn() {
    const router = useRouter();
    const [initialFocusComplete, setInitialFocusComplete] = React.useState(false);

    const { fieldState, isLoading, formError, handleSubmit, focusFirstField } = useAuthForm({
        email: {
            validationFn: validateEmail,
        },
        password: {
            validationFn: validatePassword,
        },
    });

    React.useEffect(() => {
        if (!initialFocusComplete) {
            const cleanup = focusFirstField();
            setInitialFocusComplete(true);
            return cleanup;
        }
    }, [focusFirstField, initialFocusComplete]);

    const handleSignIn = async () => {
        try {
            await handleSubmit(async () => {
                await signInWithPassword(fieldState.email.value, fieldState.password.value);
                router.replace("/(tabs)");
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
            // Error already handled by useAuthForm
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your account"
            footer={
                <AuthFooter
                    promptText="Don't have an account?"
                    linkText="Sign Up"
                    linkPath="/(auth)/sign-up"
                    secondaryLinkText="Sign in with magic link"
                    secondaryLinkPath="/(auth)/magic-link"
                />
            }>
            <Form onSubmit={handleSignIn}>
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
                    onSubmitEditing={handleSignIn}
                    returnKeyType="done"
                />

                <FormError error={formError} />

                <Text
                    className="-mt-2.5 text-right text-sm font-medium text-primary"
                    onPress={() => router.replace("/(auth)/password-reset")}>
                    Forgot password?
                </Text>

                <SubmitButton onPress={handleSignIn} isLoading={isLoading} text="Sign In" loadingText="Signing in..." />
            </Form>
        </AuthLayout>
    );
}
