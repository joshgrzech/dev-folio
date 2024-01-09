"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { LazyMotion, domMax } from "framer-motion";
import fetchAllProjectInfo, { ProjectInfo } from "@/lib/fetchProjectInfo";
import axios from "axios";

const sendSessionData = async (sessionLength: number, location: object) => {
  await axios.post("/api/sendEmail", { sessionLength, location });
};

export const ProjectContext = React.createContext<ProjectInfo[]>([]);
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const [projectInfos, setProjectInfos] = React.useState<ProjectInfo[]>([]);
  React.useEffect(() => {
    fetchAllProjectInfo("joshgrzech").then(setProjectInfos);
  }, []);
  React.useEffect(() => {
    const startTime = Date.now();

    const handleExit = async () => {
      const sessionLength = Date.now() - startTime;
      const location = await axios.get("https://ipinfo.io/json"); // Get location based on IP
      sendSessionData(sessionLength, location.data);
    };

    window.addEventListener("beforeunload", handleExit);

    return () => {
      window.removeEventListener("beforeunload", handleExit);
    };
  }, []);
  return (
    <LazyMotion features={domMax}>
      <NextUIProvider navigate={router.push}>
        <ProjectContext.Provider value={projectInfos}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </ProjectContext.Provider>
      </NextUIProvider>
    </LazyMotion>
  );
}
