import {getCurrentUserServer} from "@/lib/session";
import {UserInfo} from "@/app/userProfile/page";
import UserOrderList from "@/app/orderList/pageClient";

export default async function UserOrderList1() {
  const user = (await getCurrentUserServer()) as UserInfo;
  console.log("UserOrderList1")
  console.log(user)
  return <UserOrderList user={user}></UserOrderList>
}