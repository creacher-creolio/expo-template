import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import { configureSynced } from "@legendapp/state/sync";
import { syncedSupabase } from "@legendapp/state/sync-plugins/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { supabase } from "./supabase";

// Configure ID generator for Legend State
const generateId = () => uuidv4();

// Create a configured sync function
export const customSynced = configureSynced(syncedSupabase, {
    // Use React Native Async Storage
    persist: {
        plugin: observablePersistAsyncStorage({
            AsyncStorage,
        }),
    },
    generateId,
    supabase,
    changesSince: "last-sync",
    fieldCreatedAt: "created_at",
    fieldUpdatedAt: "updated_at",
    // Optionally enable soft deletes
    fieldDeleted: "deleted",
});

// Storage for observable references that need to be initialized/reset
const observables: { get: () => any; set: (value: any) => void }[] = [];

// Function to register an observable for initialization/reset
export function registerObservable<T extends { get: () => any; set: (value: any) => void }>(observable: T): T {
    observables.push(observable);
    return observable;
}

// Utility function to initialize observables for a specific user
export function initUserObservables(userId: string) {
    // Initialize all registered observables
    observables.forEach(obs => obs.get());
}

// Reset all observables (useful for logout)
export function resetObservables() {
    // Reset all registered observables
    observables.forEach(obs => obs.set({}));
}
