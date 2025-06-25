import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import UserProvider from "@/context/userContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import SessionProvider from "@/providers/sessionProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "BookIt",
  description: "bookIt is the universal platfrom for booking movies, trains and concerts tickets.",
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <SessionProvider session={session} >
        <UserProvider>
          <body className={poppins.className}>
                {children}
          </body>
        </UserProvider>
      </SessionProvider>
    </html>
  );
}
