"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { useRouter } from "next/navigation";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NonNullable<
            Parameters<ReturnType<typeof useRouter>["push"]>[1]
        >;
    }
}

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter();

    return (
        <Provider store={store}>
            <HeroUIProvider navigate={router.push}>
                <NextThemesProvider {...themeProps}>
                    {children}
                </NextThemesProvider>
            </HeroUIProvider>
        </Provider>
    );
}
