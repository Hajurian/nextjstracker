import { Inter } from "next/font/google";
import "./styles/globals.css";
import AuthButton from "./components/AuthButton";
import SessionProvider from "@/app/components/SessionProvider";
import { getServerSession } from "next-auth";
import UserData from "./components/UserData";
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Productivity Tracker",
  description: "A Productivity Tracker app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session} basePath="/api/auth">
          <nav className="sidebar">
            <Navbar />
            {session ? <UserData /> : null}
            <AuthButton />
          </nav>
          <main className="maincontent">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
