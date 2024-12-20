import Footer from "@/components/footer/Footer";
import SnackbarAlert from "@/components/SnackbarAlert";
import { RootTheme } from "@/lib/mui/themes";
import { DateTimePickerProvider } from "@/providers";
import { AlertProvider } from "@/providers/AlertProvider";
import { Box, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Lexo",
  description: "Create your own collections and practice them through different tasks.",
  creator: 'Jakucs Gábor',
  referrer: 'no-referrer',
  keywords: ['lexo', 'practice', "language", "learn"],
  icons: {
    icon: '/favicon.png',
  },
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
        <ThemeProvider theme={RootTheme} defaultMode="dark">
          <DateTimePickerProvider>
            <AlertProvider>
              <body style={{
                WebkitTapHighlightColor: "rgba(0,0,0,0)",
              }}>
                <CssBaseline />
                <Box sx={{
                  overflowX: "hidden",
                }}>
                  <AppRouterCacheProvider>
                    <InitColorSchemeScript attribute="class" />
                    <SnackbarAlert />
                    {children}
                    <Footer />
                  </AppRouterCacheProvider>
                </Box>
              </body>
            </AlertProvider>
          </DateTimePickerProvider>
        </ThemeProvider>
      </SessionProvider>
    </html>
  );
}

export default RootLayout
