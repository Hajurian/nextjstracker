"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
export default function AuthButton() {
  const { data: session } = useSession();
  async function handleRegister() {
    if (session) {
      const { name, email } = session?.user;
      const res = await fetch("http://localhost:3000/api/register", {
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
        <button onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
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
      >
        Sign in
      </button>
    </>
  );
}
