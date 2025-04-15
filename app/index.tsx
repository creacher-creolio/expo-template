import { Text, View } from "react-native";


export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
            }}>
            <Text className="mb-6 text-2xl font-bold">Welcome</Text>
        </View>
    );
}
