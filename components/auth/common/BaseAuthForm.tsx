import * as React from "react";

import { SubmitButton } from "@/components/auth/common";
import { Form } from "@/components/common";
import { useFormValidation, ValidationRule } from "@/hooks/useFormValidation";

export interface BaseAuthFormProps {
    children: React.ReactNode;
    onSubmit: () => void;
    isSubmitting: boolean;
    buttonText: string;
    loadingText: string;
    validationRules?: ValidationRule[];
    formError?: string | null;
    buttonClassName?: string;
}

const BaseAuthFormComponent: React.FC<BaseAuthFormProps> = ({
    children,
    onSubmit,
    isSubmitting,
    buttonText,
    loadingText,
    validationRules = [],
    formError,
    buttonClassName,
}) => {
    const { validateFields } = useFormValidation();

    const handleSubmit = React.useCallback((): void => {
        // If no validation rules are provided, skip validation
        if (validationRules.length === 0 || validateFields(validationRules)) {
            onSubmit();
        }
    }, [onSubmit, validationRules, validateFields]);

    return (
        <Form formError={formError}>
            {children}

            <SubmitButton
                onPress={handleSubmit}
                isLoading={isSubmitting}
                text={buttonText}
                loadingText={loadingText}
                className={buttonClassName}
            />
        </Form>
    );
};

// Use memo for performance
export const BaseAuthForm = React.memo(BaseAuthFormComponent);
