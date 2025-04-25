import * as React from "react";
import { ActivityIndicator } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

interface SubmitButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
    isLoading?: boolean;
    text: string;
    loadingText?: string;
    className?: string;
}

const SubmitButtonComponent: React.FC<SubmitButtonProps> = ({
    isLoading = false,
    text,
    loadingText,
    disabled,
    className = "mt-2 w-full",
    ...props
}: SubmitButtonProps) => {
    return (
        <Button
            className={`flex-row items-center justify-center ${className}`}
            disabled={isLoading || disabled}
            accessibilityLabel={isLoading ? loadingText || "Loading..." : text}
            accessibilityState={{ disabled: isLoading || !!disabled, busy: isLoading }}
            {...props}>
            {isLoading ? (
                <>
                    <ActivityIndicator size="small" color="white" className="mr-2" />
                    <Text className="font-medium text-primary-foreground">{loadingText || "Loading..."}</Text>
                </>
            ) : (
                <Text className="font-medium text-primary-foreground">{text}</Text>
            )}
        </Button>
    );
};

// Memoize for better performance
export const SubmitButton = React.memo(SubmitButtonComponent);
