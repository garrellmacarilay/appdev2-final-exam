import { ConvexProvider, ConvexReactClient } from "convex/react";
import TodoScreen from "./screens/TodoScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Id } from "./convex/_generated/dataModel";

const RootStack = createNativeStackNavigator({
  screenOptions: { headerShown: false },
  screens: {
    Login: LoginScreen,
    Signup: SignupScreen,
    Todo: TodoScreen,
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

const Navigation = createStaticNavigation(RootStack);

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <Navigation />
    </ConvexProvider>
  );
}
