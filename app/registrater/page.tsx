import {getCurrentUserServer} from "@/lib/session";
import {UserInfo} from "@/app/userProfile/page";
import UserOrderList from "@/app/orderList/pageClient";
import InterviewerRegistration from "@/app/registrater/pageClient";

export default async function InterviewerRegistration1() {
    const user = (await getCurrentUserServer()) as UserInfo;
    console.log("InterviewerRegistration1")
    console.log(user)
    return <InterviewerRegistration user={user}></InterviewerRegistration>
}