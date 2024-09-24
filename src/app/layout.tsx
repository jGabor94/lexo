import Footer from "@/components/footer/Footer";
import SnackbarAlert from "@/components/SnackbarAlert";
import { RootTheme } from "@/lib/mui/themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import ConfigProvider from "./_providers/ConfigProvider/ConfigProvider";
import { AlertProvider, DateTimePickerProvider } from "./_providers/providers";

export const metadata: Metadata = {
  title: "Lexo",
  description: "Create your own collections and practice them through different tasks.",
  creator: 'Jakucs Gábor',
  referrer: 'no-referrer',
  keywords: ['lexo', 'pratice', "language", "learn"],

};

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

const RootLayout: FC<{
  children: ReactNode,
}> = async ({ children }) => {



  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <ConfigProvider>
          <ThemeProvider theme={RootTheme}>
            <DateTimePickerProvider>
              <AlertProvider>
                <body>
                  <AppRouterCacheProvider>
                    <InitColorSchemeScript attribute="class" />
                    <CssBaseline />
                    <SnackbarAlert />
                    {children}
                    <Footer />
                  </AppRouterCacheProvider>
                </body>
              </AlertProvider>
            </DateTimePickerProvider>
          </ThemeProvider>
        </ConfigProvider>
      </SessionProvider>
    </html>
  );
}

export default RootLayout
