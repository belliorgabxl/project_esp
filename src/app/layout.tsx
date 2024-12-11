import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import TopNav from "@/components/navbar/TopNav";
import Footer from "@/components/footer/footer";
import { MqttProvider } from "./connect/MqttContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Providers>
        <TopNav/>
        <main className="">
          <MqttProvider>{children}</MqttProvider>
        </main>
        <Footer/>
      </Providers>
      </body>
    </html>
  );
}



