import * as React from "react";

export type ValidationFn = (value: string) => string | null;

export interface ValidationRule {
    field: string;
    value: string;
    validationFn: ValidationFn;
}

export const useFormValidation = () => {
    const [errors, setErrors] = React.useState<Record<string, string | null>>({});

    const validateField = (field: string, value: string, validationFn: ValidationFn): boolean => {
        const error = validationFn(value);
        setErrors(prev => ({ ...prev, [field]: error }));
        return !error;
    };

    const validateFields = (validationRules: ValidationRule[]): boolean => {
        let isValid = true;
        const newErrors: Record<string, string | null> = {};

        validationRules.forEach(({ field, value, validationFn }) => {
            const error = validationFn(value);
            newErrors[field] = error;
            if (error) isValid = false;
        });

        setErrors(newErrors);
        return isValid;
    };

    const clearErrors = (): void => {
        setErrors({});
    };

    const getError = (field: string): string | null => {
        return errors[field] || null;
    };

    return {
        errors,
        validateField,
        validateFields,
        clearErrors,
        getError,
    };
};
