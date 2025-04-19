# Authentication Components

This directory contains components for authentication features in the application.

## Components Overview

- **InviteUserForm**: Form for inviting users to the application
- **ProfileButton**: Avatar button that shows user profile information
- **ProtectedRoute**: Component to protect routes that require authentication
- **UpdateEmailForm**: Form for updating user email address
- **UpdatePasswordForm**: Form for updating user password

## Feature Integration

### User Account Management

The auth components provide a complete user account management system:

- `UpdateEmailForm` can be used in account settings screens
- `UpdatePasswordForm` can be used for password changes
- `InviteUserForm` can be used in admin screens to invite new users

### Authentication Flow

The authentication flow is implemented in the following routes:

- `app/(auth)/sign-in.tsx`: Email/password login
- `app/(auth)/sign-up.tsx`: New user registration
- `app/(auth)/magic-link.tsx`: Passwordless login with email
- `app/(auth)/password-reset.tsx`: Password recovery

### Route Protection

To protect routes that require authentication:

```tsx
import { ProtectedRoute } from "@/components/auth";

export default function SecurePage() {
  return (
    <ProtectedRoute>
      {/* Your protected content here */}
    </ProtectedRoute>
  );
}
```

## Best Practices

1. Always handle loading states in authentication forms
2. Show meaningful error messages to users
3. Implement proper client-side validation
4. Provide feedback after form submission
5. Add proper focus management for form fields
6. Allow users to show/hide passwords
7. Use proper keyboard types for input fields
