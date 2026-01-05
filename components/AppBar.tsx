"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AppBar() {
  const session = useSession();

  const loggedIn = session.data?.user;

  return (
    <div className="flex justify-between p-5 mx-10 items-center">
      <div className="font-bold text-3xl">Muzic</div>

      <div>
        <button
          onClick={() => (loggedIn ? signOut() : signIn())}
          className="text-white bg-black px-6 py-2 shadow-lg hover:translate-x-1 hover:scale-102 transition-transform duration-100 ease-in-out cursor-pointer rounded-xl"
        >
          {loggedIn ? "LogOut" : "SignIn"}
        </button>
      </div>
    </div>
  );
}
