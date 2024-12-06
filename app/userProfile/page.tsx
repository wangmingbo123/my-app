// 'use client'

// 服务端和客户端渲染
import { getCurrentUser, getCurrentUserServer } from '@/lib/session'
import JobSeekerProfile from './pageClient'
// import { JobSeekerProfile } from './pageClient'

interface SubscriptionPlan {
  name: string
  price: number
  duration: string
  features: string[]
}

export interface UserInfo {
  userId: string;
  username: string;
  avatar?: string;
  platform: string;
  email: string;
  membershipExpire?: number;
  accessToken?: string;
  coin?: string;
}
export interface CreateCheckoutResponse {
  checkoutURL: string;
};

export interface PayUrlResponse {
  data: CreateCheckoutResponse
};

interface JobSeekerProfileProps {
  user3?: UserInfo
}

const SUBSCRIPTION_VARIANT_KEY = 'subscription'



export default async function JobSeekerProfileServer() {
  const user = (await getCurrentUserServer()) as UserInfo;
  console.log("JobSeekerProfileServer")
  console.log(user)
  return <JobSeekerProfile user3={user}></JobSeekerProfile>

}


