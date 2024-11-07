import { AlertDialogDemo } from "@/components/interviewer-registration"
import { Button } from "@/components/ui/button"
import { getCurrentUserServer } from "@/lib/session";
import Link from "next/link"
import { UserInfo } from "./userProfile/pageClient";

export default async function Page() {

  const user3 = (await getCurrentUserServer()) as UserInfo;
  console.log("MMMMM")
  console.log(user3)
  console.log("MMMMM")



  return (
    <>
      <AlertDialogDemo />
      <Link href='/interviewerList'>intervieweList</Link>
      <br></br>
      <Link href='/registration'>InterviewerRegistration</Link>

      <br></br>
      <Link href='/paymentConfirmation'>paymentConfirmation</Link>

      <br></br>
      <Button>button {user3?.name}</Button>

      
    </>
  )
}