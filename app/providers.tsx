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
  const [visitLongerThan5Seconds, setVisitLongerThan5Seconds] =
    React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined" && !visitLongerThan5Seconds) {
      setTimeout(() => {
        setVisitLongerThan5Seconds(true);
      }, 5000);
    }
  }, [visitLongerThan5Seconds]);

  React.useEffect(() => {
    if (projectInfos.length === 0) {
      fetchAllProjectInfo("joshgrzech").then(setProjectInfos);
    }
  }, [projectInfos]);

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

    const sessionSent = sessionStorage.getItem("emailSent");
    const emailSent = sessionSent ? JSON.parse(sessionSent) : false;
    if (!emailSent && visitLongerThan5Seconds) {
      handleEmail();
      sessionStorage.setItem("emailSent", JSON.stringify(true));
    }
  }, [visitLongerThan5Seconds]);

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
