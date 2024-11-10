import {getCurrentUserServer} from "@/lib/session";
import {UserInfo} from "@/app/userProfile/page";
import InterviewerDetail from "@/app/interviewer/[slug]/pageClient";

export default async function InterviewerDetail1() {
    const user = (await getCurrentUserServer()) as UserInfo;
    console.log("InterviewerDetail1")
    console.log(user)
    return <InterviewerDetail user={user}></InterviewerDetail>
}
