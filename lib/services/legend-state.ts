import { observable } from "@legendapp/state";
import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import { configureSyncedSupabase, syncedSupabase } from "@legendapp/state/sync-plugins/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { supabase } from "./supabase";

// Configure ID generator for Legend State
const generateId = () => uuidv4();

// Configure Legend State for Supabase
configureSyncedSupabase({
    generateId,
    // Configure sync options
    changesSince: "last-sync",
    fieldCreatedAt: "created_at",
    fieldUpdatedAt: "updated_at",
    fieldDeleted: "deleted",
});

// Create the AsyncStorage persistence plugin
const asyncStoragePersist = observablePersistAsyncStorage({ AsyncStorage });

// Example observable for user settings
export const userSettings$ = observable(
    syncedSupabase({
        supabase,
        collection: "user_settings",
        select: from => from.select("*"),
        actions: ["read", "create", "update"],
        // Enable realtime updates
        realtime: true,
        // Persist locally
        persist: {
            name: "user-settings",
            plugin: asyncStoragePersist,
            retrySync: true,
        },
        retry: {
            infinite: true,
        },
    })
);

// Utility function to initialize an observable for a specific user
export function initUserObservables(userId: string) {
    // This could filter data for a specific user once authenticated
    userSettings$.get();
}

// Reset all observables (useful for logout)
export function resetObservables() {
    userSettings$.set({});
}
