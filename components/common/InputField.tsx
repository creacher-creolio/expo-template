import * as React from "react";
import { View, Pressable } from "react-native";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { X } from "@/lib/icons/X";
import { cn } from "@/lib/utils";

export interface InputFieldProps extends React.ComponentPropsWithoutRef<typeof Input> {
    label?: string;
    error?: string | null;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClear?: () => void;
    showClearButton?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
    helperClassName?: string;
}

const InputFieldComponent = React.forwardRef<React.ElementRef<typeof Input>, InputFieldProps>(
    (
        {
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            onClear,
            showClearButton = false,
            containerClassName,
            labelClassName,
            errorClassName,
            helperClassName,
            className,
            value,
            ...props
        },
        ref
    ) => {
        const showClear = showClearButton && value && value.length > 0 && onClear;

        const renderLeftIcon = React.useCallback(() => {
            return leftIcon && <View className="ml-2 mr-1">{leftIcon}</View>;
        }, [leftIcon]);

        const renderRightIcon = React.useCallback(() => {
            return rightIcon && <View className="ml-1 mr-2">{rightIcon}</View>;
        }, [rightIcon]);

        const renderClearButton = React.useCallback(() => {
            if (!showClear) return null;

            return (
                <Pressable
                    className="ml-1 mr-2 rounded-full p-1 active:bg-muted/20"
                    onPress={onClear}
                    accessibilityRole="button"
                    accessibilityLabel="Clear input">
                    <X size={16} className="text-muted-foreground" />
                </Pressable>
            );
        }, [showClear, onClear]);

        return (
            <View className={cn("mb-2", containerClassName)} accessible={true} accessibilityRole="none">
                {label && <Label className={cn("mb-2", labelClassName)}>{label}</Label>}

                <View className="flex-row items-center justify-around gap-2 overflow-hidden rounded-md border border-input bg-background px-2">
                    {renderLeftIcon()}

                    <Input
                        ref={ref}
                        className={cn(
                            "flex-1 border-0 bg-transparent p-2",
                            leftIcon && "pl-0",
                            (rightIcon || showClear) && "pr-0",
                            error && "border-destructive",
                            className
                        )}
                        value={value}
                        {...props}
                    />

                    {renderClearButton()}
                    {renderRightIcon()}
                </View>

                {error ? (
                    <Text className={cn("mt-1 text-xs text-destructive", errorClassName)}>{error}</Text>
                ) : helperText ? (
                    <Text className={cn("mt-1 text-xs text-muted-foreground", helperClassName)}>{helperText}</Text>
                ) : null}
            </View>
        );
    }
);

InputFieldComponent.displayName = "InputField";

// Memoize for better performance
export const InputField = React.memo(InputFieldComponent);
