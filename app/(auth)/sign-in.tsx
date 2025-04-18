import { useRouter } from "expo-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import * as React from "react";
import { Alert, View } from "react-native";

import { InputWithIcon } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { signIn } from "@/services/auth";

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            await signIn(email, password);
            router.replace("/(tabs)");
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to sign in");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <View className="flex-1 justify-center p-4">
            <View className="mb-8 space-y-2">
                <Text className="text-center text-4xl font-bold text-foreground">Welcome Back</Text>
                <Text className="text-center text-lg text-muted-foreground">Sign in to your account</Text>
            </View>

            <View className="mb-6 space-y-4">
                <InputWithIcon
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    startIcon={<Mail className="h-5 w-5 text-muted-foreground" />}
                />

                <InputWithIcon
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    startIcon={<Lock className="h-5 w-5 text-muted-foreground" />}
                    endIcon={
                        showPassword ? (
                            <EyeOff className="h-5 w-5 text-muted-foreground" onPress={togglePasswordVisibility} />
                        ) : (
                            <Eye className="h-5 w-5 text-muted-foreground" onPress={togglePasswordVisibility} />
                        )
                    }
                />
            </View>

            <Button onPress={handleSignIn} disabled={isLoading} className="mb-4 h-12">
                <Text>{isLoading ? "Signing in..." : "Sign In"}</Text>
            </Button>

            <View className="flex-row justify-center">
                <Text className="text-muted-foreground">Don't have an account? </Text>
                <Text className="font-semibold text-primary" onPress={() => router.push("/(auth)/sign-up")}>
                    Sign Up
                </Text>
            </View>
        </View>
    );
}
