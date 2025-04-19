import * as React from "react";

type ValidationFn = (value: string) => string | null;
type FieldConfig = {
    initialValue?: string;
    validationFn?: ValidationFn;
};

type FormFields = Record<string, FieldConfig>;

type FieldState = {
    value: string;
    error: string | null;
    ref: React.RefObject<any>;
    validate: () => boolean;
    setValue: (value: string) => void;
    clearValue: () => void;
    handleBlur: () => void;
};

export const useAuthForm = (fields: FormFields) => {
    const [formState, setFormState] = React.useState<Record<string, string>>(() => {
        const initialState: Record<string, string> = {};
        Object.entries(fields).forEach(([name, config]) => {
            initialState[name] = config.initialValue || "";
        });
        return initialState;
    });

    const [errors, setErrors] = React.useState<Record<string, string | null>>({});
    const [wasSubmitted, setWasSubmitted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [formError, setFormError] = React.useState<string | null>(null);

    // Create refs for each field
    const emailRef = React.useRef<any>(null);
    const passwordRef = React.useRef<any>(null);
    const confirmPasswordRef = React.useRef<any>(null);

    // Map field names to their respective refs
    const fieldRefs = React.useMemo(() => {
        const refs: Record<string, React.RefObject<any>> = {
            email: emailRef,
            password: passwordRef,
            confirmPassword: confirmPasswordRef,
        };
        return refs;
    }, []);

    const validateField = (name: string, value: string) => {
        const validationFn = fields[name]?.validationFn;
        if (!validationFn) return true;

        const error = validationFn(value);
        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const handleSubmit = async (submitFn: () => Promise<void>) => {
        setWasSubmitted(true);
        setFormError(null);

        // Validate all fields
        let isValid = true;
        Object.entries(formState).forEach(([name, value]) => {
            const fieldValid = validateField(name, value);
            if (!fieldValid) isValid = false;
        });

        if (!isValid) return;

        setIsLoading(true);
        try {
            await submitFn();
        } catch (error: any) {
            setFormError(error.message || "An error occurred");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fieldState = Object.keys(fields).reduce(
        (acc, name) => {
            acc[name] = {
                value: formState[name],
                error: errors[name] || null,
                ref: fieldRefs[name] || React.createRef(), // Fallback for any field not in the map
                validate: () => validateField(name, formState[name]),
                setValue: (value: string) => {
                    setFormState(prev => ({ ...prev, [name]: value }));
                },
                clearValue: () => {
                    setFormState(prev => ({ ...prev, [name]: "" }));
                    if (wasSubmitted) {
                        validateField(name, "");
                    }
                },
                handleBlur: () => {
                    if (wasSubmitted) {
                        validateField(name, formState[name]);
                    }
                },
            };
            return acc;
        },
        {} as Record<string, FieldState>
    );

    const focusFirstField = () => {
        const firstField = Object.keys(fields)[0];
        const timer = setTimeout(() => {
            fieldRefs[firstField]?.current?.focus();
        }, 300);
        return () => clearTimeout(timer);
    };

    return {
        fieldState,
        formState,
        errors,
        isLoading,
        formError,
        setFormError,
        wasSubmitted,
        handleSubmit,
        focusFirstField,
        refs: fieldRefs,
    };
};
