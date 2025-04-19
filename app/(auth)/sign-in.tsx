import { useRouter } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { InputWithIcon, KeyboardSafeArea } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "@/lib/icons";
import { validateEmail, validatePassword } from "@/lib/validation";
import { signIn } from "@/services/auth";

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string | null>>({});
    const [wasSubmitted, setWasSubmitted] = React.useState(false);

    const emailInputRef = React.useRef<any>(null);
    const passwordInputRef = React.useRef<any>(null);

    React.useEffect(() => {
        // Focus on email input after a short delay to ensure component is fully mounted
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

    const validatePasswordField = (value: string) => {
        const error = validatePassword(value);
        setErrors(prev => ({ ...prev, password: error }));
        return !error;
    };

    const handleEmailBlur = () => {
        if (wasSubmitted) {
            validateEmailField(email);
        }
    };

    const handlePasswordBlur = () => {
        if (wasSubmitted) {
            validatePasswordField(password);
        }
    };

    const handleSignIn = async () => {
        setWasSubmitted(true);

        const isEmailValid = validateEmailField(email);
        const isPasswordValid = validatePasswordField(password);

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        setIsLoading(true);
        try {
            await signIn(email, password);
            router.replace("/(tabs)");
        } catch (error: any) {
            setErrors(prev => ({
                ...prev,
                form: error.message || "Failed to sign in",
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const clearEmail = () => {
        setEmail("");
        if (wasSubmitted) {
            validateEmailField("");
        }
    };

    const clearPassword = () => {
        setPassword("");
        if (wasSubmitted) {
            validatePasswordField("");
        }
    };

    return (
        <KeyboardSafeArea contentContainerClassName="px-5 justify-center py-6">
            <View className="mb-10 flex flex-col gap-2">
                <Text className="text-center text-4xl font-bold text-foreground">Welcome Back</Text>
                <Text className="text-center text-lg text-muted-foreground">Sign in to your account</Text>
            </View>

            <View className="mb-8 flex flex-col gap-5">
                <InputWithIcon
                    autoCapitalize="none"
                    error={errors.email || ""}
                    keyboardType="email-address"
                    onBlur={handleEmailBlur}
                    onChangeText={setEmail}
                    onClear={clearEmail}
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    placeholder="Email"
                    ref={emailInputRef}
                    returnKeyType="next"
                    showClearButton
                    startIcon={<MailIcon className="text-muted-foreground" />}
                    value={email}
                />

                <InputWithIcon
                    ref={passwordInputRef}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    startIcon={<LockIcon className="text-muted-foreground" />}
                    endIcon={
                        showPassword ? (
                            <EyeOffIcon className="text-muted-foreground" onPress={togglePasswordVisibility} />
                        ) : (
                            <EyeIcon className="text-muted-foreground" onPress={togglePasswordVisibility} />
                        )
                    }
                    returnKeyType="done"
                    onSubmitEditing={handleSignIn}
                    error={errors.password || ""}
                    showClearButton
                    onClear={clearPassword}
                    onBlur={handlePasswordBlur}
                />

                {errors.form && (
                    <View className="px-1">
                        <Text className="text-sm text-destructive">{errors.form}</Text>
                    </View>
                )}
            </View>

            <Button onPress={handleSignIn} disabled={isLoading} className="mb-6 h-14">
                <Text>{isLoading ? "Signing in..." : "Sign In"}</Text>
            </Button>

            <View className="flex-row justify-center">
                <Text className="text-muted-foreground">Don't have an account? </Text>
                <Text
                    className="font-semibold text-primary"
                    onPress={() => {
                        // Use setTimeout to allow component to unmount cleanly before navigation
                        setTimeout(() => {
                            router.replace("/(auth)/sign-up");
                        }, 0);
                    }}
                >
                    Sign Up
                </Text>
            </View>
        </KeyboardSafeArea>
    );
}
