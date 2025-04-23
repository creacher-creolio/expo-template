import * as React from "react";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

interface SubmitButtonProps {
    onPress: () => void;
    isLoading: boolean;
    loadingText?: string;
    text: string;
    className?: string;
}

const SubmitButtonComponent = ({ onPress, isLoading, loadingText, text, className = "h-14" }: SubmitButtonProps) => {
    const buttonText = isLoading ? loadingText || `${text}ing...` : text;

    return (
        <Button
            onPress={onPress}
            disabled={isLoading}
            className={`${className}`}
            accessibilityLabel={buttonText}
            accessibilityState={{ disabled: isLoading, busy: isLoading }}>
            <Text>{buttonText}</Text>
        </Button>
    );
};

// Memoize for better performance
export const SubmitButton = React.memo(SubmitButtonComponent);
