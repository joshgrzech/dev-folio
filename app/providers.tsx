"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { LazyMotion, domMax } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import fetchAllProjectInfo, { ProjectInfo } from "@/lib/fetchProjectInfo";

export const ProjectContext = React.createContext<ProjectInfo[]>([]);
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export async function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const projectInfo = await fetchAllProjectInfo("joshgrzech");
  return (
    <LazyMotion features={domMax}>
      <NextUIProvider navigate={router.push}>
        <ProjectContext.Provider value={projectInfo}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          <Analytics />
        </ProjectContext.Provider>
      </NextUIProvider>
    </LazyMotion>
  );
}
