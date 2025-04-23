import * as React from "react";

type ValidationFn = (value: string) => string | null;

interface FieldConfig {
    initialValue?: string;
    validation?: ValidationFn;
}

interface FieldState {
    value: string;
    error: string | null;
    ref: React.RefObject<any>;
}

export const useForm = <T extends Record<string, FieldConfig>>(fieldConfigs: T) => {
    // Initialize state for each field
    const initialFieldState = {} as Record<keyof T, FieldState>;

    // Populate initial field state
    Object.entries(fieldConfigs).forEach(([name, config]) => {
        const key = name as keyof T;
        initialFieldState[key] = {
            value: config.initialValue || "",
            error: null,
            ref: React.createRef<any>(),
        };
    });

    const [fieldState, setFieldState] = React.useState<Record<keyof T, FieldState>>(initialFieldState);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formError, setFormError] = React.useState<string | null>(null);
    const [wasSubmitted, setWasSubmitted] = React.useState(false);

    // Validate a single field
    const validateField = React.useCallback(
        (name: keyof T, value: string): boolean => {
            const validationFn = fieldConfigs[name]?.validation;
            if (!validationFn) return true;

            const error = validationFn(value);
            setFieldState(prev => {
                const newState = { ...prev };
                newState[name] = {
                    ...prev[name],
                    error,
                };
                return newState;
            });

            return !error;
        },
        [fieldConfigs]
    );

    // Validate all fields
    const validateAll = React.useCallback((): boolean => {
        let isValid = true;

        Object.entries(fieldState).forEach(([name, field]) => {
            const fieldValid = validateField(name as keyof T, field.value);
            if (!fieldValid) isValid = false;
        });

        return isValid;
    }, [fieldState, validateField]);

    // Create handlers for each field
    const fields = React.useMemo(() => {
        const result = {} as Record<
            keyof T,
            {
                value: string;
                error: string | null;
                ref: React.RefObject<any>;
                setValue: (value: string) => void;
                handleBlur: () => void;
                clearValue: () => void;
            }
        >;

        Object.keys(fieldConfigs).forEach(name => {
            const key = name as keyof T;
            result[key] = {
                value: fieldState[key].value,
                error: fieldState[key].error,
                ref: fieldState[key].ref,
                setValue: (value: string) => {
                    setFieldState(prev => {
                        const newState = { ...prev };
                        newState[key] = {
                            ...prev[key],
                            value,
                        };
                        return newState;
                    });
                    if (wasSubmitted) {
                        validateField(key, value);
                    }
                },
                handleBlur: () => {
                    validateField(key, fieldState[key].value);
                },
                clearValue: () => {
                    setFieldState(prev => {
                        const newState = { ...prev };
                        newState[key] = {
                            ...prev[key],
                            value: "",
                        };
                        return newState;
                    });
                    if (wasSubmitted) {
                        validateField(key, "");
                    }
                },
            };
        });

        return result;
    }, [fieldState, validateField, wasSubmitted, fieldConfigs]);

    // Handle form submission
    const handleSubmit = React.useCallback(
        async (onSubmit: () => Promise<void>) => {
            setWasSubmitted(true);
            setFormError(null);

            if (!validateAll()) return;

            setIsSubmitting(true);
            try {
                await onSubmit();
            } catch (error: any) {
                setFormError(error.message || "An error occurred");
                throw error;
            } finally {
                setIsSubmitting(false);
            }
        },
        [validateAll]
    );

    // Reset form
    const reset = React.useCallback(() => {
        const resetState = {} as Record<keyof T, FieldState>;

        Object.entries(fieldConfigs).forEach(([name, config]) => {
            const key = name as keyof T;
            resetState[key] = {
                ...fieldState[key],
                value: config.initialValue || "",
                error: null,
            };
        });

        setFieldState(resetState);
        setFormError(null);
        setWasSubmitted(false);
    }, [fieldConfigs, fieldState]);

    // Focus first field
    const focusFirstField = React.useCallback(() => {
        const fieldKeys = Object.keys(fieldState) as (keyof T)[];
        if (fieldKeys.length > 0) {
            const firstFieldKey = fieldKeys[0];
            const timer = setTimeout(() => {
                fieldState[firstFieldKey].ref.current?.focus();
            }, 300);
            return () => clearTimeout(timer);
        }
        return () => {};
    }, [fieldState]);

    return {
        fields,
        isSubmitting,
        formError,
        setFormError,
        handleSubmit,
        validateAll,
        reset,
        focusFirstField,
    };
};
