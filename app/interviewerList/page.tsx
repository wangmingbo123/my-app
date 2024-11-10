import InterviewerList from "@/app/interviewerList/pageClient";
import {getCurrentUserServer} from "@/lib/session";
import {UserInfo} from "@/app/userProfile/page";


export default async function InterviewerList1() {
  const user = (await getCurrentUserServer()) as UserInfo;
  console.log("InterviewerList1")
  console.log(user)
  return <InterviewerList user={user}></InterviewerList>
}