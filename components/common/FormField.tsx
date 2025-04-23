import * as React from "react";
import { View } from "react-native";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.ComponentPropsWithoutRef<typeof Input> {
    label?: string;
    error?: string | null;
    helpText?: string;
}

export const FormField = React.forwardRef<React.ElementRef<typeof Input>, FormFieldProps>(
    ({ label, error, helpText, className, ...props }, ref) => {
        return (
            <View className="mb-4 w-full">
                {label && (
                    <Label htmlFor={props.id} className="mb-1.5 block text-sm font-medium text-foreground">
                        {label}
                    </Label>
                )}

                <Input
                    ref={ref}
                    className={cn(error && "border-destructive focus:border-destructive", className)}
                    {...props}
                />

                {error ? (
                    <Text className="mt-1.5 text-xs font-medium text-destructive">{error}</Text>
                ) : helpText ? (
                    <Text className="mt-1.5 text-xs text-muted-foreground">{helpText}</Text>
                ) : null}
            </View>
        );
    }
);

FormField.displayName = "FormField";
