import * as React from "react";

import { InputWithIcon } from "@/components/common";
import { MailIcon } from "@/lib/icons";

interface EmailInputProps {
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    onClear?: () => void;
    onBlur?: () => void;
    onSubmitEditing?: () => void;
    returnKeyType?: "done" | "next";
    ref?: React.RefObject<any>;
}

export const EmailInput = React.forwardRef<any, EmailInputProps>(
    ({ value, onChangeText, error = "", onClear, onBlur, onSubmitEditing, returnKeyType = "next" }, ref) => {
        return (
            <InputWithIcon
                ref={ref}
                value={value}
                onChangeText={onChangeText}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                startIcon={<MailIcon className="text-muted-foreground" />}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                error={error}
                showClearButton={!!onClear}
                onClear={onClear}
                onBlur={onBlur}
                textContentType="emailAddress"
            />
        );
    }
);

// Add display name
EmailInput.displayName = "EmailInput";
