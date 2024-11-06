"use client";

import { signIn, useSession } from "next-auth/react";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";



export function UserAuthForm() {
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession()
  console.log(session)

  const login = async (platform: string) => {
    if (platform === "github") {
      setIsGitHubLoading(true);
    }
    signIn(platform, {
      callbackUrl: `${window.location.origin}`,
    });
  };

  return (


    <Button
      variant="outline"
      className="border-gray-400"
      onClick={() => login("github")}
      disabled={isGitHubLoading}
    >
      Github
      {session?.user.name}
    </Button>

  );
}


const PageWithSessionProvider = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};



export default function App() {
  return (
    <PageWithSessionProvider>
      <UserAuthForm />
    </PageWithSessionProvider>
  );
}