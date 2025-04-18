/**
 * Form validation utility functions
 */

// Email validation with regex
export const validateEmail = (email: string): string | null => {
    if (!email) return "Email is required";

    // Standard email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
    }

    return null;
};

// Password validation
export const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required";

    if (password.length < 8) {
        return "Password must be at least 8 characters";
    }

    // Check for at least one number
    if (!/\d/.test(password)) {
        return "Password must contain at least one number";
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter";
    }

    return null;
};

// Confirm password validation
export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    if (!confirmPassword) return "Confirm password is required";

    if (password !== confirmPassword) {
        return "Passwords do not match";
    }

    return null;
};

// Form validation helper
export const validateForm = (
    values: Record<string, string>,
    validations: Record<string, (value: string) => string | null>
) => {
    const errors: Record<string, string | null> = {};
    let isValid = true;

    Object.keys(validations).forEach(field => {
        const value = values[field];
        const validation = validations[field];
        const error = validation(value);

        errors[field] = error;
        if (error) isValid = false;
    });

    return { isValid, errors };
};
