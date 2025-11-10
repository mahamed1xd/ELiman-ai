import "./g.css";
import Footer from "@/components/footer.jsx";
import NavbarComponent from "@/components/navbar";
import LoginCheck from "@/components/loginCheck";
import { AuthProvider } from "@/context/authContext";
import { LoadingProvider } from "@/context/loading";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Basera Ai",
  description: "An app for all Muslims",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="forest">
      <head>
        <meta name="theme-color" content="#0d9488" />
      </head>
      <body className="min-h-screen flex flex-col">
        <SpeedInsights />
        <AuthProvider>
          <LoginCheck>
            <LoadingProvider>
              <NavbarComponent />
              <main className="flex-grow pt-[65px] flex justify-center items-center flex-col">
                {children}
              </main>
              <footer className="mt-auto">
                <Footer />
              </footer>
            </LoadingProvider>
          </LoginCheck>
        </AuthProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
