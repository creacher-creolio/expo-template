import { useRouter } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { AuthLayout, AuthFooter } from "@/components/auth";
import { EmailInput, FormError, SubmitButton } from "@/components/auth/common";
import { Form } from "@/components/common";
import { useAuthForm } from "@/hooks/useAuthForm";
import { CheckCircleIcon } from "@/lib/icons";
import { resetPassword } from "@/lib/services/auth";
import { validateEmail } from "@/lib/validation";

export default function PasswordReset() {
    const router = useRouter();
    const [resetEmailSent, setResetEmailSent] = React.useState(false);

    const { fieldState, isLoading, formError, handleSubmit, focusFirstField } = useAuthForm({
        email: {
            validationFn: validateEmail,
        },
    });

    React.useEffect(() => {
        return focusFirstField();
    }, [focusFirstField]);

    const handleResetPassword = async () => {
        try {
            await handleSubmit(async () => {
                await resetPassword(fieldState.email.value);
                setResetEmailSent(true);
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
            // Error already handled by useAuthForm
        }
    };

    if (resetEmailSent) {
        return (
            <AuthLayout
                title="Check Your Email"
                subtitle={`We've sent password reset instructions to ${fieldState.email.value}.
                Please check your inbox.`}>
                <View className="items-center">
                    <CheckCircleIcon size={64} className="text-primary" />
                </View>

                <SubmitButton
                    onPress={() => router.replace("/(auth)/sign-in")}
                    isLoading={false}
                    text="Back to Sign In"
                    className="h-14"
                />
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Reset Password"
            subtitle="We'll send you instructions to reset your password"
            footer={<AuthFooter promptText="Remember your password?" linkText="Sign In" linkPath="/(auth)/sign-in" />}>
            <Form onSubmit={handleResetPassword}>
                <EmailInput
                    ref={fieldState.email.ref}
                    value={fieldState.email.value}
                    onChangeText={fieldState.email.setValue}
                    error={fieldState.email.error || ""}
                    onClear={fieldState.email.clearValue}
                    onBlur={fieldState.email.handleBlur}
                    onSubmitEditing={handleResetPassword}
                    returnKeyType="done"
                />

                <FormError error={formError} />

                <SubmitButton
                    onPress={handleResetPassword}
                    isLoading={isLoading}
                    text="Send Reset Instructions"
                    loadingText="Sending..."
                />
            </Form>
        </AuthLayout>
    );
}
