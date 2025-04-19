import { useRouter } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { InputWithIcon, KeyboardSafeArea } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { AlertTriangleIcon, CheckCircleIcon, MailIcon } from "@/lib/icons";
import { validateEmail } from "@/lib/validation";
import { resetPassword } from "@/services/auth";

export default function PasswordReset() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [resetEmailSent, setResetEmailSent] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string | null>>({});
    const [wasSubmitted, setWasSubmitted] = React.useState(false);

    const emailInputRef = React.useRef<any>(null);

    React.useEffect(() => {
        // Focus on email input after a short delay
        const timer = setTimeout(() => {
            emailInputRef.current?.focus();
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const validateEmailField = (value: string) => {
        const error = validateEmail(value);
        setErrors(prev => ({ ...prev, email: error }));
        return !error;
    };

    const handleEmailBlur = () => {
        if (wasSubmitted) {
            validateEmailField(email);
        }
    };

    const handleResetPassword = async () => {
        setWasSubmitted(true);
        const isEmailValid = validateEmailField(email);

        if (!isEmailValid) {
            return;
        }

        setIsLoading(true);
        try {
            await resetPassword(email);
            setResetEmailSent(true);
            setErrors({});
        } catch (error: any) {
            setErrors(prev => ({
                ...prev,
                form: error.message || "Failed to send reset email",
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const clearEmail = () => {
        setEmail("");
        if (wasSubmitted) {
            validateEmailField("");
        }
    };

    if (resetEmailSent) {
        return (
            <KeyboardSafeArea contentContainerClassName="px-5 justify-center py-6">
                <View className="mb-6 items-center">
                    <CheckCircleIcon size={64} className="mb-4 text-primary" />
                    <Text className="mb-2 text-center text-3xl font-bold text-foreground">Check Your Email</Text>
                    <Text className="text-center text-base text-muted-foreground">
                        We've sent password reset instructions to {email}. Please check your inbox.
                    </Text>
                </View>

                <Button onPress={() => router.replace("/(auth)/sign-in")} variant="outline" className="mb-4 h-14">
                    <Text>Back to Sign In</Text>
                </Button>
            </KeyboardSafeArea>
        );
    }

    return (
        <KeyboardSafeArea contentContainerClassName="px-5 justify-center py-6">
            <View className="mb-10 flex flex-col gap-2">
                <Text className="text-center text-4xl font-bold text-foreground">Reset Password</Text>
                <Text className="text-center text-lg text-muted-foreground">
                    We'll send you instructions to reset your password
                </Text>
            </View>

            <View className="mb-8 flex flex-col gap-5">
                <InputWithIcon
                    autoCapitalize="none"
                    error={errors.email || ""}
                    keyboardType="email-address"
                    onBlur={handleEmailBlur}
                    onChangeText={setEmail}
                    onClear={clearEmail}
                    onSubmitEditing={handleResetPassword}
                    placeholder="Email"
                    ref={emailInputRef}
                    returnKeyType="done"
                    showClearButton
                    startIcon={<MailIcon className="text-muted-foreground" />}
                    value={email}
                    textContentType="emailAddress"
                />

                {errors.form && (
                    <View className="flex-row items-center px-1">
                        <AlertTriangleIcon size={16} className="mr-2 text-destructive" />
                        <Text className="text-sm text-destructive">{errors.form}</Text>
                    </View>
                )}
            </View>

            <Button onPress={handleResetPassword} disabled={isLoading} className="mb-6 h-14">
                <Text>{isLoading ? "Sending..." : "Send Reset Instructions"}</Text>
            </Button>

            <View className="flex-row justify-center">
                <Text className="text-muted-foreground">Remember your password? </Text>
                <Text
                    className="font-semibold text-primary"
                    onPress={() => {
                        setTimeout(() => {
                            router.replace("/(auth)/sign-in");
                        }, 0);
                    }}>
                    Sign In
                </Text>
            </View>
        </KeyboardSafeArea>
    );
}
