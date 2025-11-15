import "./g.css";
import 'aos/dist/aos.css';
import NavbarComponent from "@/components/navbar";
import LoginCheck from "@/components/loginCheck";
import { AuthProvider } from "@/context/authContext";
import { LoadingProvider } from "@/context/loading";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"
import ThemeProvider from "@/components/themeprov";
export const metadata = {
  title: "Basera Ai",
  description: "An app for all Muslims",
  manifest: "/manifest.json",
  icons: {
    icon: '/icons/icon-512x512.png',
    apple: '/icons/icon-192x192.png',
    other: '/icons/icon-512x512.png',

  }

};

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0d9488" />
        <meta name="viewport" content="viewport-fit=cover" />
      </head>
      <ThemeProvider>
      <body className="min-h-screen flex flex-col">
        <Analytics />
        <SpeedInsights />
        <AuthProvider>
          <LoginCheck>
            <LoadingProvider>
                <NavbarComponent />
              <main className="flex-grow pt-[65px] flex justify-center items-center flex-col">
                {children}
                </main>      

            </LoadingProvider>
          </LoginCheck>
        </AuthProvider>
        <Toaster position="top-right" richColors />
      </body>
      </ThemeProvider>
    </html>
  );
}
