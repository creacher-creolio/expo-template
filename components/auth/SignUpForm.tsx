import { useRouter } from "expo-router";
import * as React from "react";

import { Form, FormField, SubmitButton } from "@/components/common";
import { auth } from "@/lib/services/auth";
import { validateConfirmPassword, validateEmail, validatePassword } from "@/lib/validation";

interface SignUpFormProps {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export const SignUpForm = ({ onSuccess, onError }: SignUpFormProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formError, setFormError] = React.useState<string | null>(null);

    const emailRef = React.useRef<any>(null);
    const passwordRef = React.useRef<any>(null);
    const confirmPasswordRef = React.useRef<any>(null);

    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState<string | null>(null);

    const [password, setPassword] = React.useState("");
    const [passwordError, setPasswordError] = React.useState<string | null>(null);

    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState<string | null>(null);

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
        const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);

        setEmailError(emailValidation);
        setPasswordError(passwordValidation);
        setConfirmPasswordError(confirmPasswordValidation);

        return !emailValidation && !passwordValidation && !confirmPasswordValidation;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        setFormError(null);

        try {
            await auth.signUp(email, password);
            if (onSuccess) {
                onSuccess();
            } else {
                // Show success message and redirect after a delay
                setFormError("Account created! Please check your email to confirm your account.");
                setTimeout(() => {
                    router.replace("/(auth)/sign-in");
                }, 2000);
            }
        } catch (error: any) {
            setFormError(error.message || "Failed to create account");
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
                onChangeText={text => {
                    setPassword(text);
                    if (confirmPassword) {
                        setConfirmPasswordError(validateConfirmPassword(text, confirmPassword));
                    }
                }}
                error={passwordError}
                placeholder="••••••••"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                onBlur={() => setPasswordError(validatePassword(password))}
            />

            <FormField
                ref={confirmPasswordRef}
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                error={confirmPasswordError}
                placeholder="••••••••"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                onBlur={() => setConfirmPasswordError(validateConfirmPassword(password, confirmPassword))}
            />

            <SubmitButton
                onPress={handleSubmit}
                isLoading={isSubmitting}
                text="Create Account"
                loadingText="Creating Account..."
                className="mt-4"
            />
        </Form>
    );
};
