import { Inter } from "next/font/google";
import "./styles/globals.css";
import AuthButton from "./components/AuthButton";
import SessionProvider from "@/app/components/SessionProvider";
import { getServerSession } from "next-auth";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Teehee",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <nav className="sidebar">
            <h1 className="title">Productivity Tracker</h1>
            {/* {session ? <UserData /> : null} */}
            <Link href="/" className="link">
              Home
            </Link>
            <Link href="/todos" prefetch={true} className="link">
              Todos
            </Link>
            <Link href="/habits" className="link">
              Habits
            </Link>
            <AuthButton />
          </nav>
          <main className="maincontent">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
