import { useRouter } from "expo-router";
import * as React from "react";
import { Alert, View } from "react-native";

import { InputWithIcon, KeyboardSafeArea } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "@/lib/icons";
import { signUp } from "@/services/auth";

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

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

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            await signUp(email, password);
            Alert.alert("Success", "Account created successfully. Please check your email to confirm your account.", [
                { text: "OK", onPress: () => router.push("/(auth)/sign-in") },
            ]);
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to create account");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <KeyboardSafeArea contentContainerClassName="px-4 justify-center">
            <View className="mb-8 space-y-2">
                <Text className="text-center text-4xl font-bold text-foreground">Create Account</Text>
                <Text className="text-center text-lg text-muted-foreground">Sign up for a new account</Text>
            </View>

            <View className="mb-6 space-y-4">
                <InputWithIcon
                    ref={emailInputRef}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    startIcon={<MailIcon className="h-5 w-5 text-muted-foreground" />}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                />

                <InputWithIcon
                    ref={passwordInputRef}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    startIcon={<LockIcon className="h-5 w-5 text-muted-foreground" />}
                    endIcon={
                        showPassword ? (
                            <EyeOffIcon className="h-5 w-5 text-muted-foreground" onPress={togglePasswordVisibility} />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-muted-foreground" onPress={togglePasswordVisibility} />
                        )
                    }
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                />

                <InputWithIcon
                    ref={confirmPasswordInputRef}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm Password"
                    secureTextEntry={!showPassword}
                    startIcon={<LockIcon className="h-5 w-5 text-muted-foreground" />}
                    returnKeyType="done"
                    onSubmitEditing={handleSignUp}
                />
            </View>

            <Button onPress={handleSignUp} disabled={isLoading} className="mb-4 h-12">
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
