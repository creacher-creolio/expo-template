import * as React from "react";
import { View } from "react-native";

import { InputWithIcon } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { AlertTriangleIcon, MailIcon } from "@/lib/icons";
import { validateEmail } from "@/lib/validation";
import { updateEmail } from "@/services/auth";

interface UpdateEmailFormProps {
    currentEmail: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export const UpdateEmailForm = ({ currentEmail, onSuccess, onError }: UpdateEmailFormProps) => {
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
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
        if (value === currentEmail) {
            const error = "New email must be different from current email";
            setErrors(prev => ({ ...prev, email: error }));
            return false;
        }

        const error = validateEmail(value);
        setErrors(prev => ({ ...prev, email: error }));
        return !error;
    };

    const handleEmailBlur = () => {
        if (wasSubmitted) {
            validateEmailField(email);
        }
    };

    const handleUpdateEmail = async () => {
        setWasSubmitted(true);
        const isEmailValid = validateEmailField(email);

        if (!isEmailValid) {
            return;
        }

        setIsLoading(true);
        try {
            await updateEmail(email);
            setIsSuccess(true);
            setErrors({});
            if (onSuccess) onSuccess();
        } catch (error: any) {
            const errorMessage = error.message || "Failed to update email";
            setErrors(prev => ({ ...prev, form: errorMessage }));
            if (onError) onError(error);
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

    if (isSuccess) {
        return (
            <View className="flex flex-col items-center gap-4">
                <Text className="text-center text-lg font-semibold text-foreground">Email Update Sent</Text>
                <Text className="text-center text-base text-muted-foreground">
                    We've sent a confirmation link to {email}. Please check your inbox to confirm your new email
                    address.
                </Text>
            </View>
        );
    }

    return (
        <View className="flex flex-col gap-5">
            <Text className="text-base text-muted-foreground">
                Current email: <Text className="font-medium text-foreground">{currentEmail}</Text>
            </Text>

            <InputWithIcon
                ref={emailInputRef}
                value={email}
                onChangeText={setEmail}
                placeholder="New Email Address"
                autoCapitalize="none"
                keyboardType="email-address"
                startIcon={<MailIcon className="text-muted-foreground" />}
                returnKeyType="done"
                onSubmitEditing={handleUpdateEmail}
                error={errors.email || ""}
                showClearButton
                onClear={clearEmail}
                onBlur={handleEmailBlur}
            />

            {errors.form && (
                <View className="flex-row items-center px-1">
                    <AlertTriangleIcon size={16} className="mr-2 text-destructive" />
                    <Text className="text-sm text-destructive">{errors.form}</Text>
                </View>
            )}

            <Button onPress={handleUpdateEmail} disabled={isLoading} className="mt-2 h-14">
                <Text>{isLoading ? "Updating..." : "Update Email"}</Text>
            </Button>
        </View>
    );
};
