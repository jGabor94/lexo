import SnackbarAlert from "@/components/SnackbarAlert";
import { auth } from "@/features/authentication/lib/auth";
import { RootTheme } from "@/lib/mui/themes";
import { DateTimePickerProvider } from "@/providers";
import { AlertProvider } from "@/providers/AlertProvider";
import { Box, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { Navigation } from "@toolpad/core/AppProvider";
import { NextAppProvider } from '@toolpad/core/nextjs';
import type { Metadata } from "next";
import { SessionProvider, signIn, signOut } from 'next-auth/react';
import { FC, ReactNode, Suspense } from "react";

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

const NAVIGATION: Navigation = [
  {
    segment: 'home',
    title: 'Irányítópult',
    icon: <Box component="img" src="/dashboard.png" width={25} />,
  },
  {
    title: 'Szógyűjtemények',
    icon: <Box component="img" src="/library.png" width={25} />,
    children: [
      {
        segment: 'library/all',
        title: 'Összes',
      },
      {
        segment: 'library/favorites',
        title: 'Kedvencek',
      },
    ]
  },
  {
    segment: 'folders',
    title: 'Mappák',
    icon: <Box component="img" src="/folder.png" width={25} />,
  },
  {
    segment: 'teach',
    title: 'Oktatás',
    icon: <Box component="img" src="/education.png" width={25} />,
  },




];

const AUTHENTICATION = {
  signIn,
  signOut,
};

const RootLayout: FC<{
  children: ReactNode,
}> = async ({ children }) => {

  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <DateTimePickerProvider>
          <AlertProvider>
            <body style={{
              WebkitTapHighlightColor: "rgba(0,0,0,0)",
            }}>


              <AppRouterCacheProvider options={{ enableCssLayer: true, }} >
                <Box sx={{
                  overflowX: "hidden",
                }}>
                  <Suspense fallback={<div>Loading...</div>}>

                    <NextAppProvider
                      navigation={NAVIGATION}
                      theme={RootTheme}
                      authentication={AUTHENTICATION}
                      session={session}

                    >

                      <InitColorSchemeScript attribute="class" />
                      <SnackbarAlert />
                      <CssBaseline />

                      {children}
                    </NextAppProvider>
                  </Suspense>
                </Box>

              </AppRouterCacheProvider>
            </body>
          </AlertProvider>
        </DateTimePickerProvider>
      </SessionProvider>
    </html >
  );
}

export default RootLayout
