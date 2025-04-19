import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { deleteAccount, signIn } from "@/services/auth";

type FormData = {
    password: string;
    confirmation: string;
};

type DeleteAccountFormProps = {
    email: string;
    onSuccess: () => void;
    onError: (error: Error) => void;
    onCancel: () => void;
};

export function DeleteAccountForm({ email, onSuccess, onError, onCancel }: DeleteAccountFormProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            password: "",
            confirmation: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        if (data.password !== data.confirmation) {
            return onError(new Error("Confirmation does not match"));
        }

        try {
            setIsSubmitting(true);

            // First verify the password is correct
            await signIn(email, data.password);

            // Then delete the account
            await deleteAccount();

            onSuccess();
        } catch (error: any) {
            onError(new Error(error.message || "Failed to delete account"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="space-y-4">
            <Text className="font-medium text-destructive">
                Deleting your account is permanent and cannot be undone. All your data will be removed.
            </Text>

            <View className="space-y-2">
                <Label htmlFor="password">Current Password</Label>
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: "Password is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            id="password"
                            placeholder="Enter your password"
                            secureTextEntry
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoCapitalize="none"
                            autoComplete="password"
                        />
                    )}
                />
                {errors.password && <Text className="text-sm text-destructive">{errors.password.message}</Text>}
            </View>

            <View className="space-y-2">
                <Label htmlFor="confirmation">Type 'delete' to confirm</Label>
                <Controller
                    control={control}
                    name="confirmation"
                    rules={{
                        required: "Confirmation is required",
                        validate: (value: string) => value === "delete" || "Please type 'delete' to confirm",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            id="confirmation"
                            placeholder="Type 'delete' to confirm"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoCapitalize="none"
                        />
                    )}
                />
                {errors.confirmation && <Text className="text-sm text-destructive">{errors.confirmation.message}</Text>}
            </View>

            <View className="mt-4 flex-row space-x-2">
                <Button variant="ghost" className="flex-1" onPress={onCancel} disabled={isSubmitting}>
                    <Text>Cancel</Text>
                </Button>
                <Button
                    variant="destructive"
                    className="flex-1"
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}>
                    {isSubmitting ? <ActivityIndicator color="white" size="small" /> : <Text>Delete Account</Text>}
                </Button>
            </View>
        </View>
    );
}
