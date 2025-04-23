import { useRouter } from "expo-router";
import * as React from "react";

import { Form, FormField, SubmitButton } from "@/components/common";
import { Text } from "@/components/ui/text";
import { signInWithPassword } from "@/lib/services/auth";
import { validateEmail, validatePassword } from "@/lib/validation";

interface SignInFormProps {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export const SignInForm = ({ onSuccess, onError }: SignInFormProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formError, setFormError] = React.useState<string | null>(null);

    const emailRef = React.useRef<any>(null);
    const passwordRef = React.useRef<any>(null);

    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState<string | null>(null);

    const [password, setPassword] = React.useState("");
    const [passwordError, setPasswordError] = React.useState<string | null>(null);

    // Focus email field on mount
    React.useEffect(() => {
        const timer = setTimeout(() => {
            emailRef.current?.focus();
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const validateForm = () => {
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);

        setEmailError(emailValidation);
        setPasswordError(passwordValidation);

        return !emailValidation && !passwordValidation;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        setFormError(null);

        try {
            await signInWithPassword(email, password);
            if (onSuccess) {
                onSuccess();
            } else {
                router.replace("/(tabs)");
            }
        } catch (error: any) {
            setFormError(error.message || "Failed to sign in");
            if (onError) onError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form formError={formError} onSubmit={handleSubmit}>
            <FormField
                ref={emailRef}
                label="Email"
                value={email}
                onChangeText={setEmail}
                error={emailError}
                placeholder="your.email@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                onBlur={() => setEmailError(validateEmail(email))}
            />

            <FormField
                ref={passwordRef}
                label="Password"
                value={password}
                onChangeText={setPassword}
                error={passwordError}
                placeholder="••••••••"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                onBlur={() => setPasswordError(validatePassword(password))}
            />

            <Text
                className="mt-1 text-right text-sm font-medium text-primary"
                onPress={() => router.replace("/(auth)/password-reset")}>
                Forgot password?
            </Text>

            <SubmitButton onPress={handleSubmit} isLoading={isSubmitting} text="Sign In" loadingText="Signing in..." />
        </Form>
    );
};
