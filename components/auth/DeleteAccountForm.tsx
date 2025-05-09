import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";

import { Form, PasswordInput } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { auth, deleteUser } from "@/lib/services/auth";

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
        setError,
    } = useForm<FormData>({
        defaultValues: {
            password: "",
            confirmation: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            setIsSubmitting(true);

            // Check if confirmation is "delete"
            if (data.confirmation !== "delete") {
                setError("confirmation", {
                    type: "validate",
                    message: "Please type 'delete' to confirm",
                });
                setIsSubmitting(false);
                return;
            }

            // First verify the password is correct
            await auth.signInWithPassword(email, data.password);

            // Then delete the account
            await deleteUser();

            onSuccess();
        } catch (error: any) {
            if (error.message?.includes("password") || error.message?.includes("credentials")) {
                setError("password", {
                    type: "validate",
                    message: "Incorrect password",
                });
            } else {
                onError(new Error(error.message || "Failed to delete account"));
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Text className="font-medium text-destructive">
                Deleting your account is permanent and cannot be undone. All your data will be removed.
            </Text>

            <View className="flex flex-col gap-2">
                <Label htmlFor="password">Current Password</Label>
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: "Password is required" }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PasswordInput
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder="Enter your password"
                            error={errors.password?.message}
                            textContentType="password"
                            returnKeyType="next"
                        />
                    )}
                />
                {!errors.password && <Text className="h-5" />}
            </View>

            <View className="flex flex-col gap-2">
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
                            returnKeyType="done"
                            onSubmitEditing={handleSubmit(onSubmit)}
                        />
                    )}
                />
                {errors.confirmation && <Text className="text-sm text-destructive">{errors.confirmation.message}</Text>}
            </View>

            <View className="mt-4 flex flex-row gap-2">
                <Button variant="outline" className="flex-1" onPress={onCancel} disabled={isSubmitting}>
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
        </Form>
    );
}
