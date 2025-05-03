import { observer } from "@legendapp/state/react";
import React, { useState } from "react";
import { FlatList, TextInput, TouchableOpacity, View } from "react-native";

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
            className="mt-4 h-16 rounded-lg border-2 border-gray-400 p-4 text-lg"
        />
    );
};

// A single todo component, either 'not done' or 'done': press to toggle.
const Todo = ({ todo }: { todo: Tables<"todos"> }) => {
    const handlePress = () => {
        toggleDone(todo.id);
    };
    return (
        <TouchableOpacity
            key={todo.id}
            onPress={handlePress}
            className={`mb-4 rounded-lg p-4 ${todo.done ? "bg-green-100" : "bg-yellow-100"}`}>
            <Text className="text-lg">
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
    if (todos) return <FlatList data={Object.values(todos)} renderItem={renderItem} className="mt-4 flex-1" />;

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
            <Text className="m-4 text-center text-base">Clear all ({todoCount})</Text>
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
        <View className="flex-1 gap-4 bg-white p-4">
            <Text className="text-xl font-bold">Legend State Demo</Text>
            <Text className="text-center text-2xl font-bold">Legend-State Example</Text>
            <NewTodo />
            <Todos todos$={_todos$} />
            <ClearTodos />
        </View>
    );
});

export default LegendStateDemo;
