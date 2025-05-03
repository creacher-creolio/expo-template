import { observable } from "@legendapp/state";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { customSynced, registerObservable } from "@/lib/services/legend-state";
import { supabase } from "@/lib/services/supabase";

const generateId = () => uuidv4();

// Create and register the observable with explicit type casting
export const todos$ = registerObservable(
    observable(
        customSynced({
            supabase,
            collection: "todos",
            select: from => from.select("id,counter,text,done,created_at,updated_at,deleted"),
            actions: ["read", "create", "update", "delete"],
            realtime: true,
            // Persist data and pending changes locally
            persist: {
                name: "todos",
                retrySync: true, // Persist pending changes and retry
            },
            retry: {
                infinite: true, // Retry changes with exponential backoff
            },
        })
    )
);

export function addTodo(text: string) {
    const id = generateId();
    // Add keyed by id to the todos$ observable to trigger a create in Supabase
    todos$[id].assign({
        id,
        text,
        done: false,
    });
}

export function toggleDone(id: string) {
    todos$[id].done.set((prev: boolean) => !prev);
}
