import * as React from "react";
import { ActivityIndicator } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

interface SubmitButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
    isLoading?: boolean;
    text: string;
    loadingText?: string;
}

export const SubmitButton = ({ isLoading, text, loadingText, disabled, ...props }: SubmitButtonProps) => {
    return (
        <Button
            className="mt-2 w-full flex-row items-center justify-center"
            disabled={isLoading || disabled}
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
