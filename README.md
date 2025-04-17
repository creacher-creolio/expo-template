# React Native Template

A React Native template with Expo, NativeWind, React Native Reusables, Legend State, and Supabase.

## Features

- **Expo SDK 52**: The latest Expo SDK for React Native development
- **NativeWind**: Tailwind CSS for React Native
- **React Native Reusables**: UI component library
- **Supabase Integration**: Backend services including auth and database
- **Legend State** (coming soon): Reactive state management with local-first capabilities

## Getting Started

1. Clone this repository
2. Install dependencies: `pnpm install`
3. Start the development server: `pnpm start`

## Supabase Integration

This template includes a complete Supabase client integration. To test it:

1. Navigate to the Supabase tab in the app
2. Tap "Test Supabase Connection" to verify connection status
3. The connection test queries a sample `test_items` table

The Supabase client is configured in `services/supabase.ts` and can be used throughout the app with the `useSupabase` hook in `hooks/useSupabase.ts`.

## Next Steps

- Configure authentication with Supabase Auth
- Integrate Legend State for state management
- Connect Legend State to Supabase for real-time data
- Implement local-first persistence
