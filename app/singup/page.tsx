"use client";

import { signIn, useSession } from "next-auth/react";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import AuthForm from "@/components/AuthForm";
import { Toaster } from "react-hot-toast";
import {useEffect} from "react";



export function UserAuthForm() {
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { data: session, status } = useSession()
  console.log(session)

  const login = async (platform: string) => {
    if (platform === "github") {
      setIsGitHubLoading(true);
    }
    //todo:
    signIn(platform, {
      // callbackUrl: `${window.location.origin}/interviewerList`,
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

function App1() {
  const { data: session, status } = useSession()

  const  router = useRouter()
  // if (session && session.user) {
  //   return <div>you are has login {session.user.name}</div>
  // }

  useEffect(() => {
    console.log("fetchData is invoke")
    console.log(session)
    if (session && session.user) {
      router.push("/interviewerList")
    }
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <AuthForm />
      {/*<UserAuthForm />*/}
      <Toaster position="top-right" />
    </div>
  );
}




export default function App() {
  return (
    <PageWithSessionProvider>
      <App1></App1>
    </PageWithSessionProvider>
  );
}