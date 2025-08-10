"use client";

import { HeroUIProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "../src/store/store";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <HeroUIProvider>{children}</HeroUIProvider>
        </Provider>
    );
}
