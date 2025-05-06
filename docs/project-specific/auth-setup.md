# Authentication Setup Guide

This document provides instructions for setting up the authentication features in your application.

## Environment Configuration

Add the following environment variables to your `.env.local` file:

```
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Auth Redirect URL (change to your app's deep link URL)
EXPO_PUBLIC_AUTH_REDIRECT_URL=basetemplate://auth/callback
```

## URL Scheme Setup

To handle deep links properly, you need to configure a URL scheme for your application.

1. Open `app.json` and add the following in the `expo` section:

```json
"scheme": "basetemplate",
"ios": {
  "bundleIdentifier": "com.yourcompany.basetemplate"
},
"android": {
  "package": "com.yourcompany.basetemplate"
}
```

Replace `basetemplate`, `com.yourcompany.basetemplate`, etc. with your own app's identifiers.

## Auth Features Overview

The app includes the following authentication features:

1. **Email/Password Authentication**
   - Sign up with email & password
   - Sign in with email & password
   - Reset password
   - Update password

2. **Magic Link Authentication**
   - Sign in with a passwordless email link

3. **Email Management**
   - Change email address with confirmation

4. **User Invitation**
   - Invite users to join the application

## Supabase Email Templates

To use the improved email templates, follow these steps:

1. Navigate to your Supabase project in the dashboard
2. Go to Authentication > Email Templates
3. For each template type (Confirmation, Invite, Recovery, Magic Link, Email Change):
   - Edit the template
   - Replace the content with the templates from `api/email-templates.sql`
   - Be sure to update `YOUR_LOGO_URL` with your actual logo URL
   - Replace `Your App Name` with your application name
   - Click Save

## Additional Customization

### Profile Photo

To add profile photo upload functionality:

1. Set up Supabase Storage
2. Create a bucket for profile photos
3. Create a component for uploading and managing profile photos

### Social Auth Providers

To add social authentication providers:

1. In the Supabase dashboard, go to Authentication > Providers
2. Enable and configure the providers you want (Google, Facebook, GitHub, etc.)
3. Add corresponding authentication methods in the auth service
