# To-Do List for React Native Template Evolution with Supabase, Authentication, and Legend State

This to-do list outlines the steps to enhance a React Native template (using Expo, NativeWind, and React Native Reusables) by integrating Supabase for backend services, implementing authentication, and using Legend State for state management with local-first persistence. The template will be configured for scalability, with reusable setups for adding tables, starting with the auth/user table. The Supabase MCP server is already set up in Cursor.

## Task 1: Set Up Supabase Client in the Project

- **Objective**: Initialize the Supabase client in the React Native project to connect to the existing Supabase MCP server.
- **Steps**:
  - Use the Supabase MCP server to create a new project in the Creolio organization
  - Test the connection by performing a simple query (e.g., fetch from a dummy table or check auth status).
- **Output**: A configured Supabase client ready for database and auth operations.

## Task 2: Configure Supabase Authentication

- **Objective**: Implement user authentication (sign-up, sign-in, sign-out) using Supabase Auth.
- **Steps**:
  - Verify that the Supabase MCP server has authentication enabled and the `users` table is set up in the `auth` schema.
  - Create an `auth` service (e.g., `services/auth.js`) with functions for:
    - Sign-up (email/password or OAuth if needed).
    - Sign-in (email/password).
    - Sign-out.
    - Session management (retrieve current user/session).
  - Add a profile icon to the top right global header
  - create auth screens using React Native Reusables components styled with NativeWind.
  - Set up navigation (e.g., using React Navigation) to handle auth flows (e.g., redirect to login if unauthenticated).
  - Test authentication flows to ensure users can sign up, sign in, and sign out.
- **Output**: Functional authentication system with reusable auth service and UI components.

## Task 3: Set Up Legend State for State Management

- **Objective**: Integrate Legend State for reactive state management in the app.
- **Reference**:
  - <https://legendapp.com/open-source/state/v3/intro/introduction/>
  - <https://legendapp.com/open-source/state/v3/intro/getting-started/>
  - <https://legendapp.com/open-source/state/v3/usage/observable/>
  - <https://legendapp.com/open-source/state/v3/usage/reactivity/>
  - <https://legendapp.com/open-source/state/v3/usage/configuring/>
  - <https://legendapp.com/open-source/state/v3/react/react-api/>
  - <https://legendapp.com/open-source/state/v3/react/fine-grained-reactivity/>
  - <https://legendapp.com/open-source/state/v3/react/helpers-and-hooks/>
  - <https://legendapp.com/open-source/state/v3/react/react-examples/>
- **Steps**:
  - Create a centralized state management file (e.g., `state/index.js`) to define global state stores.
  - Set up initial state for authentication (e.g., `user`, `isAuthenticated`) and basic app data.
  - Configure reactive components to use Legend State’s `observer` for UI updates.
  - Test state reactivity by connecting a simple UI component (e.g., display user email after login).
- **Output**: Legend State integrated with reactive state management for auth-related data.

## Task 4: Integrate Legend State with Supabase for Real-Time Data

- **Objective**: Connect Legend State to Supabase for real-time data synchronization, starting with the auth/user table.
- **Reference**:
  - <https://legendapp.com/open-source/state/v3/sync/supabase/>
- **Steps**:
  - Create a `user` state store in Legend State to manage user data (e.g., `id`, `email`, `created_at`).
  - Set up Supabase real-time subscriptions to listen for changes in the `auth.users` table or a related `profiles` table (if extended user data is needed).
  - Write a service (e.g., `services/userSync.js`) to sync user data between Supabase and Legend State:
    - Fetch user data on app load or after login.
    - Update Legend State when Supabase data changes (via subscriptions).
    - Handle conflicts or errors during sync.
  - Test real-time updates by modifying user data in Supabase and verifying UI updates.
- **Output**: Real-time sync between Supabase user data and Legend State.

## Task 5: Implement Local-First Persistence with Legend State

- **Objective**: Enable offline persistence for user data using Legend State’s persistence plugin.
- **Reference**:
  - <https://legendapp.com/open-source/state/v3/sync/persist-sync/>
- **Steps**:
  - Configure Legend State’s persistence plugin to store user state locally:
    - Use `persist` option in Legend State to save `user` state to `AsyncStorage`.
    - Set up hydration to load persisted state on app start.
  - Implement offline handling:
    - Cache Supabase queries in Legend State when offline.
    - Queue mutations (e.g., user profile updates) for when connectivity is restored.
  - Test offline mode by disabling network, updating user data, and verifying persistence and sync on reconnect.
- **Output**: Local-first persistence for user data with offline support.

## Notes

- Ensure all tasks use NativeWind for consistent styling and React Native Reusables for UI components--Text and Button, etc,... should come from RNR instead of react-native.
- Always create icons per icons.mdc
- Keep the Supabase MCP server’s schema minimal (start with `auth.users` or a `profiles` table).
- Prioritize modularity and reusability in all configurations.
- Use Cursor AI’s capabilities to generate code snippets, debug, and test each task.
- If any task requires clarification (e.g., specific Supabase table schema), prompt for details before proceeding.
