import { EmailRule, PasswordRule, ValidationMessages } from "./form-rules";

/**
 * Validates an email address
 */
export const validateEmail = (email: string): string | null => {
    return EmailRule.validate(email);
};

/**
 * Validates a password
 */
export const validatePassword = (password: string): string | null => {
    return PasswordRule.validate(password);
};

/**
 * Validates that two passwords match
 */
export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    if (!confirmPassword) {
        return ValidationMessages.required;
    }

    if (password !== confirmPassword) {
        return ValidationMessages.passwordMismatch;
    }

    return null;
};
