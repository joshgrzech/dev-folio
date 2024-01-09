"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { LazyMotion, domMax } from "framer-motion";
import fetchAllProjectInfo, { ProjectInfo } from "@/lib/fetchProjectInfo";
import axios from "axios";

export const ProjectContext = React.createContext<ProjectInfo[]>([]);
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const [projectInfos, setProjectInfos] = React.useState<ProjectInfo[]>([]);

  React.useEffect(() => {
    const handleEmail = async () => {
      try {
        const locationData = await axios.get("https://ipapi.co/json/");

        const ipLocation = locationData.data;
        await axios.post("/api/sendEmail", { location: ipLocation });
      } catch (e) {
        console.log(e);
      }
    };

    if (projectInfos.length === 0) {
      fetchAllProjectInfo("joshgrzech").then(setProjectInfos);
    }

    const sessionSent = sessionStorage.getItem("emailSent");
    const emailSent = sessionSent ? JSON.parse(sessionSent) : false;
    if (!emailSent) {
      handleEmail();
      sessionStorage.setItem("emailSent", JSON.stringify(true));
    }
  }, [projectInfos]);

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
