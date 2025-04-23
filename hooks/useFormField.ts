import * as React from "react";

type ValidationFn = (value: string) => string | null;

interface UseFormFieldProps {
    initialValue?: string;
    validate?: ValidationFn;
    shouldValidateOnBlur?: boolean;
    shouldValidateOnChange?: boolean;
}

export const useFormField = (props: UseFormFieldProps = {}) => {
    const {
        initialValue = "",
        validate = () => null,
        shouldValidateOnBlur = false,
        shouldValidateOnChange = false,
    } = props;

    const [value, setValue] = React.useState(initialValue);
    const [error, setError] = React.useState<string | null>(null);
    const [isTouched, setIsTouched] = React.useState(false);
    const fieldRef = React.useRef<any>(null);

    const validateField = React.useCallback(() => {
        const validationError = validate(value);
        setError(validationError);
        return !validationError;
    }, [value, validate]);

    const handleChange = React.useCallback(
        (text: string) => {
            setValue(text);
            if (shouldValidateOnChange && isTouched) {
                validateField();
            }
        },
        [isTouched, validateField, shouldValidateOnChange]
    );

    const handleBlur = React.useCallback(() => {
        setIsTouched(true);
        if (shouldValidateOnBlur) {
            validateField();
        }
    }, [shouldValidateOnBlur, validateField]);

    const handleClear = React.useCallback(() => {
        setValue("");
        if (isTouched && shouldValidateOnChange) {
            validateField();
        }
    }, [isTouched, shouldValidateOnChange, validateField]);

    return {
        value,
        error,
        isTouched,
        ref: fieldRef,
        setValue: handleChange,
        setError,
        validate: validateField,
        handleBlur,
        handleClear,
        reset: () => {
            setValue(initialValue);
            setError(null);
            setIsTouched(false);
        },
    };
};
