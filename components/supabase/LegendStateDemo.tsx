import { observer } from "@legendapp/state/react";
import React, { useState } from "react";
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { Text } from "@/components/ui/text";
import { useAuth } from "@/lib/contexts/AuthContext";
import { todos$ as _todos$, addTodo, toggleDone } from "@/lib/state/user-todos";
import { Tables } from "@/lib/types/supabase";

// Emojis to decorate each todo.
const NOT_DONE_ICON = String.fromCodePoint(0x1f7e0);
const DONE_ICON = String.fromCodePoint(0x2705);

// The text input component to add a new todo.
const NewTodo = () => {
    const [text, setText] = useState("");
    const handleSubmitEditing = ({ nativeEvent: { text: newText } }: { nativeEvent: { text: string } }) => {
        setText("");
        addTodo(newText);
    };
    return (
        <TextInput
            value={text}
            onChangeText={text => setText(text)}
            onSubmitEditing={handleSubmitEditing}
            placeholder="What do you want to do today?"
            style={styles.input}
        />
    );
};

// A single todo component, either 'not done' or 'done': press to toggle.
const Todo = ({ todo }: { todo: Tables<"todos"> }) => {
    const handlePress = () => {
        toggleDone(todo.id);
    };
    return (
        <TouchableOpacity key={todo.id} onPress={handlePress} style={[styles.todo, todo.done ? styles.done : null]}>
            <Text style={styles.todoText}>
                {todo.done ? DONE_ICON : NOT_DONE_ICON} {todo.text}
            </Text>
        </TouchableOpacity>
    );
};

// A list component to show all the todos.
const Todos = observer(({ todos$ }: { todos$: typeof _todos$ }) => {
    // Get the todos from the state and subscribe to updates
    const todos = todos$.get();
    const renderItem = ({ item: todo }: { item: Tables<"todos"> }) => <Todo todo={todo} />;
    if (todos) return <FlatList data={Object.values(todos)} renderItem={renderItem} style={styles.todos} />;

    return <></>;
});

// A button component to delete all the todos, only shows when there are some.
const ClearTodos = observer(() => {
    const todos = _todos$.get();
    const todoCount = todos ? Object.keys(todos).length : 0;

    const handlePress = () => {
        // Delete all todos
        if (todos) {
            Object.keys(todos).forEach(id => {
                _todos$[id].delete();
            });
        }
    };

    return todoCount > 0 ? (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.clearTodos}>Clear all ({todoCount})</Text>
        </TouchableOpacity>
    ) : null;
});

// Main component that composes the settings functionality
const LegendStateDemo = observer(function LegendStateDemo() {
    const { user } = useAuth();

    // Show a message if user is not logged in
    if (!user) {
        return (
            <View className="p-4">
                <Text className="text-center">Please sign in to manage settings</Text>
            </View>
        );
    }

    return (
        <View className="space-y-4 p-4">
            <Text className="text-xl font-bold">Legend State Demo</Text>
            <Text style={styles.heading}>Legend-State Example</Text>
            <NewTodo />
            <Todos todos$={_todos$} />
            <ClearTodos />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        margin: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        borderColor: "#999",
        borderRadius: 8,
        borderWidth: 2,
        flex: 0,
        height: 64,
        marginTop: 16,
        padding: 16,
        fontSize: 20,
    },
    todos: {
        flex: 1,
        marginTop: 16,
    },
    todo: {
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
        backgroundColor: "#ffd",
    },
    done: {
        backgroundColor: "#dfd",
    },
    todoText: {
        fontSize: 20,
    },
    clearTodos: {
        margin: 16,
        flex: 0,
        textAlign: "center",
        fontSize: 16,
    },
});

export default LegendStateDemo;
