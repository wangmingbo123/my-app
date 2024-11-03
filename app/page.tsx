import { AlertDialogDemo } from "@/components/interviewer-registration"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {

  return (
    <>
      <AlertDialogDemo />
      <Link href='/interviewerList'>intervieweList</Link>
      <br></br>
      <Link href='/registration'>InterviewerRegistration</Link>

      <br></br>
      <Link href='/paymentConfirmation'>paymentConfirmation</Link>

      <br></br>
      <Button>button</Button>

      
    </>
  )
}