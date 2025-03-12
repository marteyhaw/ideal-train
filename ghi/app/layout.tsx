import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Seasons Logistics - Login",
  description: "Secure login to access logistics management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex items-center justify-center min-h-screen bg-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
