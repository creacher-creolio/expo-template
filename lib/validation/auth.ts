/**
 * Validates an email address
 */
export const validateEmail = (email: string): string | null => {
    if (!email.trim()) {
        return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address";
    }

    return null;
};

/**
 * Validates a password
 */
export const validatePassword = (password: string): string | null => {
    if (!password) {
        return "Password is required";
    }

    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }

    return null;
};

/**
 * Validates that two passwords match
 */
export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    if (!confirmPassword) {
        return "Please confirm your password";
    }

    if (password !== confirmPassword) {
        return "Passwords don't match";
    }

    return null;
};
