// lib/validation/form-rules.ts
export interface ValidationRuleConfig {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message?: string;
}

export interface ValidationRule {
    name: string;
    validate: (value: string, context?: Record<string, any>) => string | null;
}

// Common validation messages
export const ValidationMessages = {
    required: "This field is required",
    email: "Please enter a valid email address",
    password: {
        minLength: "Password must be at least 8 characters long",
        requireSpecialChar: "Password must contain at least one special character",
        requireNumber: "Password must contain at least one number",
        requireUppercase: "Password must contain at least one uppercase letter",
    },
    passwordMismatch: "Passwords do not match",
};

// Email validation rule
export const EmailRule: ValidationRule = {
    name: "email",
    validate: (value: string) => {
        if (!value) return ValidationMessages.required;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return ValidationMessages.email;

        return null;
    },
};

// Password validation rule
export const PasswordRule: ValidationRule = {
    name: "password",
    validate: (value: string) => {
        if (!value) return ValidationMessages.required;

        if (value.length < 8) return ValidationMessages.password.minLength;

        // Optional: Add more rigorous password checks
        /*
        if (!/[A-Z]/.test(value)) return ValidationMessages.password.requireUppercase;
        if (!/[0-9]/.test(value)) return ValidationMessages.password.requireNumber;
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return ValidationMessages.password.requireSpecialChar;
        */

        return null;
    },
};

// Confirm password validation rule
export const ConfirmPasswordRule: ValidationRule = {
    name: "confirmPassword",
    validate: (value: string, context?: Record<string, any>) => {
        if (!value) return ValidationMessages.required;

        if (context?.password && value !== context.password) {
            return ValidationMessages.passwordMismatch;
        }

        return null;
    },
};

// Create a validator function for generic text validation
export const createTextValidator = (config: ValidationRuleConfig) => {
    return (value: string): string | null => {
        if (config.required && !value) {
            return config.message || ValidationMessages.required;
        }

        if (config.minLength && value.length < config.minLength) {
            return config.message || `This field must be at least ${config.minLength} characters`;
        }

        if (config.maxLength && value.length > config.maxLength) {
            return config.message || `This field cannot exceed ${config.maxLength} characters`;
        }

        if (config.pattern && !config.pattern.test(value)) {
            return config.message || "This field has an invalid format";
        }

        return null;
    };
};
