"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
export default function AuthButton() {
  const { data: session } = useSession();
  async function handleRegister() {
    if (session) {
      const { name, email } = session?.user;
      const link = new URL(`${process.env.NEXTAUTH_URL}/api/register`);
      const res = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });
      return res.json();
    }
  }
  if (session) {
    return (
      <>
        <button
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className="signbutton"
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => {
          signIn();
        }}
        className="signbutton"
      >
        Sign in
      </button>
    </>
  );
}
