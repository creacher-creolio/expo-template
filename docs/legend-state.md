# Legend State Integration

This document provides an overview of the Legend State integration in the application.

## Overview

[Legend State](https://legendapp.com/open-source/state/) is a fast and efficient state management library that integrates with Supabase for persistent data storage. The integration provides:

1. Reactive state management with fine-grained updates
2. Local data persistence (offline support)
3. Automatic syncing with Supabase
4. Type-safe access to Supabase data

## Key Files

- `lib/services/legend-state.ts` - Main integration file with Supabase
- `components/supabase/LegendStateDemo.tsx` - Example component using Legend State
- `api/migrations/legend-state-tables.sql` - SQL schema for Legend State tables

## Usage

### Observable State

Legend State uses observables to track and update state:

```typescript
// Create an observable linked to Supabase
const userSettings$ = observable(
    syncedSupabase({
        supabase,
        collection: "user_settings",
        // Other options...
    })
);

// Get the data
const settings = userSettings$.get();

// Update a specific field
userSettings$[id].value.set("new value");
```

### Components

Use the `observer` HOC to make components reactive:

```typescript
const MyComponent = observer(function MyComponent() {
    // Access observed state
    const settings = userSettings$.get();

    // Component automatically re-renders when state changes
    return <View>{/* ... */}</View>;
});
```

### Authentication Integration

Legend State observables are initialized when a user logs in and reset when they log out:

```typescript
// Initialize observables for a specific user
export function initUserObservables(userId: string) {
    userSettings$.get();
}

// Reset all observables (on logout)
export function resetObservables() {
    userSettings$.set({});
}
```

## Database Setup

The Legend State integration requires specific tables and triggers in the Supabase database:

1. Tables must include `created_at`, `updated_at`, and `deleted` columns
2. Triggers must update timestamps automatically
3. Realtime must be enabled for tables that need live updates

Run the SQL migration in `api/migrations/legend-state-tables.sql` to set up the required schema.

## Benefits

- **Offline Support**: Data is persisted locally and synced when online
- **Performance**: Fine-grained reactivity means minimal re-renders
- **Developer Experience**: Simple API with less boilerplate
- **Type Safety**: Full TypeScript support with Supabase
