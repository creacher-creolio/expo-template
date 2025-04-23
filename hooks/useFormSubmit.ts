import * as React from "react";

export interface FormSubmitState {
    isSubmitting: boolean;
    formError: string | null;
    setFormError: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface FormSubmitOptions {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

/**
 * A hook for handling form submission state
 * Manages loading state and form errors
 */
export const useFormSubmit = (
    options?: FormSubmitOptions
): [FormSubmitState, (submitFn: () => Promise<void>) => Promise<void>] => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formError, setFormError] = React.useState<string | null>(null);

    const handleSubmit = React.useCallback(
        async (submitFn: () => Promise<void>) => {
            setIsSubmitting(true);
            setFormError(null);

            try {
                await submitFn();
                if (options?.onSuccess) {
                    options.onSuccess();
                }
            } catch (error: any) {
                const errorMessage = error.message || "An error occurred";
                setFormError(errorMessage);

                if (options?.onError) {
                    options.onError(error);
                }
            } finally {
                setIsSubmitting(false);
            }
        },
        [options]
    );

    return [{ isSubmitting, formError, setFormError }, handleSubmit];
};
