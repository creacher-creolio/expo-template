import { useRouter } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { InputWithIcon, KeyboardSafeArea } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "@/lib/icons";
import { validateConfirmPassword, validateEmail, validatePassword } from "@/lib/validation";
import { signUp } from "@/services/auth";

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string | null>>({});
    const [wasSubmitted, setWasSubmitted] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("");

    // Email input ref to focus on it when the screen loads
    const emailInputRef = React.useRef<any>(null);
    const passwordInputRef = React.useRef<any>(null);
    const confirmPasswordInputRef = React.useRef<any>(null);

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

    const validateConfirmPasswordField = (value: string) => {
        const error = validateConfirmPassword(password, value);
        setErrors(prev => ({ ...prev, confirmPassword: error }));
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

    const handleConfirmPasswordBlur = () => {
        if (wasSubmitted) {
            validateConfirmPasswordField(confirmPassword);
        }
    };

    const handleSignUp = async () => {
        setWasSubmitted(true);
        setSuccessMessage("");

        const isEmailValid = validateEmailField(email);
        const isPasswordValid = validatePasswordField(password);
        const isConfirmPasswordValid = validateConfirmPasswordField(confirmPassword);

        if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
            return;
        }

        setIsLoading(true);
        try {
            await signUp(email, password);
            setSuccessMessage("Account created successfully. Please check your email to confirm your account.");
            // Don't navigate immediately so user can see the success message
            setTimeout(() => {
                router.push("/(auth)/sign-in");
            }, 2000);
        } catch (error: any) {
            setErrors(prev => ({
                ...prev,
                form: error.message || "Failed to create account",
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

    const clearConfirmPassword = () => {
        setConfirmPassword("");
        if (wasSubmitted) {
            validateConfirmPasswordField("");
        }
    };

    return (
        <KeyboardSafeArea contentContainerClassName="px-5 justify-center py-6">
            <View className="mb-10 space-y-2">
                <Text className="text-center text-4xl font-bold text-foreground">Create Account</Text>
                <Text className="text-center text-lg text-muted-foreground">Sign up for a new account</Text>
            </View>

            {successMessage && (
                <View className="mb-6 rounded-md border border-border bg-background p-4">
                    <Text className="text-center text-sm font-medium text-primary">{successMessage}</Text>
                </View>
            )}

            <View className="mb-8 flex-col gap-5">
                <InputWithIcon
                    ref={emailInputRef}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    startIcon={<MailIcon className="text-muted-foreground" />}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    error={errors.email || ""}
                    showClearButton
                    onClear={clearEmail}
                    onBlur={handleEmailBlur}
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
                    onSubmitEditing={handleSignUp}
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
            </View>

            <Button onPress={handleSignUp} disabled={isLoading} className="mb-6 h-14">
                <Text>{isLoading ? "Creating Account..." : "Sign Up"}</Text>
            </Button>

            <View className="flex-row justify-center">
                <Text className="text-muted-foreground">Already have an account? </Text>
                <Text className="font-semibold text-primary" onPress={() => router.push("/(auth)/sign-in")}>
                    Sign In
                </Text>
            </View>
        </KeyboardSafeArea>
    );
}
