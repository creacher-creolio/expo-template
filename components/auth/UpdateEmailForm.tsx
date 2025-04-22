import * as React from "react";
import { View } from "react-native";

import { EmailInput, FormError, SubmitButton } from "@/components/auth/common";
import { Text } from "@/components/ui/text";
import { useAuthForm } from "@/hooks/useAuthForm";
import { validateEmail } from "@/lib/validation";
import { updateEmail } from "@/services/auth";

interface UpdateEmailFormProps {
    currentEmail: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export const UpdateEmailForm = ({ currentEmail, onSuccess, onError }: UpdateEmailFormProps) => {
    const [isSuccess, setIsSuccess] = React.useState(false);

    // Custom validation function that checks against current email
    const validateNewEmail = (value: string) => {
        if (value === currentEmail) {
            return "New email must be different from current email";
        }
        return validateEmail(value);
    };

    const { fieldState, isLoading, formError, handleSubmit, focusFirstField } = useAuthForm({
        email: {
            validationFn: validateNewEmail,
        },
    });

    React.useEffect(() => {
        return focusFirstField();
    }, [focusFirstField]);

    const handleUpdateEmail = async () => {
        try {
            await handleSubmit(async () => {
                await updateEmail(fieldState.email.value);
                setIsSuccess(true);
                if (onSuccess) onSuccess();
            });
        } catch (error: any) {
            if (onError) onError(error);
        }
    };

    if (isSuccess) {
        return (
            <View className="flex flex-col items-center gap-4">
                <Text className="text-center text-lg font-semibold text-foreground">Email Update Sent</Text>
                <Text className="text-center text-base text-muted-foreground">
                    We've sent a confirmation link to {fieldState.email.value}. Please check your inbox to confirm your
                    new email address.
                </Text>
            </View>
        );
    }

    return (
        <View className="flex flex-col gap-5">
            <Text className="text-base text-muted-foreground">
                Current email: <Text className="font-medium text-foreground">{currentEmail}</Text>
            </Text>

            <EmailInput
                ref={fieldState.email.ref}
                value={fieldState.email.value}
                onChangeText={fieldState.email.setValue}
                error={fieldState.email.error || ""}
                onClear={fieldState.email.clearValue}
                onBlur={fieldState.email.handleBlur}
                onSubmitEditing={handleUpdateEmail}
                returnKeyType="done"
            />

            <FormError error={formError} />

            <SubmitButton onPress={handleUpdateEmail} isLoading={isLoading} text="Update Email" className="h-14" />
        </View>
    );
};
