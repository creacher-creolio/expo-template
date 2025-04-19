import * as React from "react";
import { View } from "react-native";

import { InputWithIcon } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { AlertTriangleIcon, CheckCircleIcon, MailIcon } from "@/lib/icons";
import { validateEmail } from "@/lib/validation";
import { inviteUser } from "@/services/auth";

interface InviteUserFormProps {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export const InviteUserForm = ({ onSuccess, onError }: InviteUserFormProps) => {
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [inviteSent, setInviteSent] = React.useState(false);
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

    const handleSendInvite = async () => {
        setWasSubmitted(true);
        const isEmailValid = validateEmailField(email);

        if (!isEmailValid) {
            return;
        }

        setIsLoading(true);
        try {
            await inviteUser(email);
            setInviteSent(true);
            setErrors({});
            setEmail("");
            if (onSuccess) onSuccess();
        } catch (error: any) {
            const errorMessage = error.message || "Failed to send invitation";
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

    const handleReset = () => {
        setInviteSent(false);
        setErrors({});
        setWasSubmitted(false);

        // Focus on email input after reset
        setTimeout(() => {
            emailInputRef.current?.focus();
        }, 300);
    };

    if (inviteSent) {
        return (
            <View className="flex flex-col items-center gap-4">
                <CheckCircleIcon size={40} className="mb-2 text-primary" />
                <Text className="text-center text-lg font-semibold text-foreground">Invitation Sent</Text>
                <Text className="mb-4 text-center text-base text-muted-foreground">
                    We've sent an invitation to {email}.
                </Text>
                <Button onPress={handleReset} variant="outline">
                    <Text>Invite Another User</Text>
                </Button>
            </View>
        );
    }

    return (
        <View className="flex flex-col gap-5">
            <InputWithIcon
                ref={emailInputRef}
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                autoCapitalize="none"
                keyboardType="email-address"
                startIcon={<MailIcon className="text-muted-foreground" />}
                returnKeyType="done"
                onSubmitEditing={handleSendInvite}
                error={errors.email || ""}
                showClearButton
                onClear={clearEmail}
                onBlur={handleEmailBlur}
                textContentType="emailAddress"
            />

            {errors.form && (
                <View className="flex-row items-center px-1">
                    <AlertTriangleIcon size={16} className="mr-2 text-destructive" />
                    <Text className="text-sm text-destructive">{errors.form}</Text>
                </View>
            )}

            <Button onPress={handleSendInvite} disabled={isLoading} className="mt-2 h-12">
                <Text>{isLoading ? "Sending..." : "Send Invitation"}</Text>
            </Button>
        </View>
    );
};
