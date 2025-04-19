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

export const SubmitButton = ({ onPress, isLoading, loadingText, text, className = "mb-6 h-14" }: SubmitButtonProps) => {
    return (
        <Button onPress={onPress} disabled={isLoading} className={`mt-6 ${className}`}>
            <Text>{isLoading ? loadingText || `${text}ing...` : text}</Text>
        </Button>
    );
};
