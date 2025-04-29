import { useRouter } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { AuthFooter, AuthLayout } from "@/components/auth";
import { EmailInput, Form, FormError, SubmitButton } from "@/components/common";
import { useAuthForm } from "@/hooks/useAuthForm";
import { CheckCircleIcon } from "@/lib/icons";
import { auth } from "@/lib/services/auth";
import { validateEmail } from "@/lib/validation";

export default function MagicLink() {
    const router = useRouter();
    const [emailSent, setEmailSent] = React.useState(false);

    const { fieldState, isLoading, formError, handleSubmit, focusFirstField } = useAuthForm({
        email: {
            validationFn: validateEmail,
        },
    });

    React.useEffect(() => {
        return focusFirstField();
    }, [focusFirstField]);

    const handleSendMagicLink = async () => {
        try {
            await handleSubmit(async () => {
                await auth.sendMagicLink(fieldState.email.value);
                setEmailSent(true);
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
            // Error already handled by useAuthForm
        }
    };

    if (emailSent) {
        return (
            <AuthLayout
                title="Check Your Email"
                // eslint-disable-next-line max-len
                subtitle={`We've sent a magic link to ${fieldState.email.value}. Click the link in the email to sign in.`}>
                <View className="items-center">
                    <CheckCircleIcon size={64} className="text-primary" />
                </View>

                <SubmitButton
                    onPress={() => router.replace("/(auth)/sign-in")}
                    isLoading={false}
                    text="Back to Sign In"
                    className="mt-6 h-14"
                />
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Magic Link"
            subtitle="Sign in with a link sent to your email"
            footer={<AuthFooter promptText="Remember your password?" linkText="Sign In" linkPath="/(auth)/sign-in" />}>
            <Form onSubmit={handleSendMagicLink}>
                <EmailInput
                    ref={fieldState.email.ref}
                    value={fieldState.email.value}
                    onChangeText={fieldState.email.setValue}
                    error={fieldState.email.error || ""}
                    onClear={fieldState.email.clearValue}
                    onBlur={fieldState.email.handleBlur}
                    onSubmitEditing={handleSendMagicLink}
                    returnKeyType="done"
                />

                <FormError error={formError} />

                <SubmitButton
                    onPress={handleSendMagicLink}
                    isLoading={isLoading}
                    text="Send Magic Link"
                    loadingText="Sending..."
                />
            </Form>
        </AuthLayout>
    );
}
