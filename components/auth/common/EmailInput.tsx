import * as React from "react";

import { InputField } from "@/components/common";
import { MailIcon } from "@/lib/icons";

interface EmailInputProps {
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    onClear?: () => void;
    onBlur?: () => void;
    onSubmitEditing?: () => void;
    returnKeyType?: "done" | "next";
}

const EmailInput = React.forwardRef<any, EmailInputProps>(
    ({ value, onChangeText, error = "", onClear, onBlur, onSubmitEditing, returnKeyType = "next" }, ref) => {
        return (
            <InputField
                ref={ref}
                value={value}
                onChangeText={onChangeText}
                label="Email"
                placeholder="your.email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<MailIcon className="text-muted-foreground" size={20} />}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                error={error}
                showClearButton={true}
                onClear={onClear}
                onBlur={onBlur}
                textContentType="emailAddress"
                autoComplete="email"
                accessibilityLabel="Email input field"
            />
        );
    }
);

EmailInput.displayName = "EmailInput";

// Use React.memo for performance optimization
export { EmailInput };
