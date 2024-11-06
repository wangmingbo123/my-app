'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Calendar, CheckCircle } from 'lucide-react'
import { axios } from '@/lib/axios'
import { useToast } from '@/hooks/use-toast'
import { getCurrentUser, getCurrentUserTong } from '@/lib/session'

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

const SUBSCRIPTION_VARIANT_KEY = 'subscription'


export default function JobSeekerProfile() {
  const [currentPlan, setCurrentPlan] = useState<string | null>(null)

  let userInfo = {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    points: 1250,
    membershipValidity: "2024-12-31"
  }

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      name: "Basic",
      price: 9.99,
      duration: "Monthly",
      features: ["5 interview requests", "Basic profile visibility", "Email support"]
    },
    {
      name: "Pro",
      price: 19.99,
      duration: "Monthly",
      features: ["15 interview requests", "Enhanced profile visibility", "Priority email support", "Mock interview sessions"]
    },
    {
      name: "Premium",
      price: 39.99,
      duration: "Monthly",
      features: ["Unlimited interview requests", "Top profile visibility", "24/7 phone support", "Personalized career coaching"]
    }
  ]
  const { userId } = getCurrentUserTong()


  const handleSubscribe = async (planName: string) => {
    // setCurrentPlan(planName)
    // Here you would typically handle the subscription process
    console.log(`Subscribed to ${planName} plan`)
    console.log(userId)
    await subscribe();
  }
  // 集成支付
  // todo:
  // https://juejin.cn/post/7218916901593415736
  // https://app.lemonsqueezy.com/settings/webhooks
  const user1: UserInfo = {
    userId: userId.toString(),

  } as UserInfo;
  const subscribe = async () => {
    if (!user1 || !user1.userId) {
      // toast.error("Please login first");
      return;
    }
    try {
      // const url = "https://noxious-spooky-cauldron-v6rgv6j7xq9hwv6r-3000.app.github.dev"

      // const url = "https://noxious-spooky-cauldron-v6rgv6j7xq9hwv6r-3000.app.github.dev"

      const { data: { checkoutURL } } = await axios.post<any, PayUrlResponse>(

        // const data = await axios.post<any, CreateCheckoutResponse>(
        "/api/payment/subscribe",
        {
          userId: user1.userId,
          type: SUBSCRIPTION_VARIANT_KEY,
        },
        {
          headers: {
            token: user1.accessToken
          }
        }
      );
      console.log(checkoutURL)
      // window.location.href = checkoutURL;
      // window.open(checkoutURL, "_blank", "noopener, noreferrer");
    } catch (err) {
      console.log(err);
    }
  };

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(userInfo)


  const { toast } = useToast()

  // 调用远程接口获取个人数据
  // const url = "https://noxious-spooky-cauldron-v6rgv6j7xq9hwv6r-3000.app.github.dev/api/user";
  const url = "/api/user";
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(url, {
        params: { 'search': "A" },
        headers: {
        },
        // withCredentials:true
      })
      // console.log(response.user?.coin)
      console.log(response)
      console.log(response.data.user)
      // console.log(response.user.coin)
      setUser({ ...user, points: response.data.user?.coin })
      console.log(user)
      // console.log(response.user)

    } catch (err) {
      console.error("Error fetching interviewers:", err)
    } finally {
      setIsLoading(false)
    }
  };
  useEffect(() => {
    console.log("fetchData is invoke")
    fetchData();
  }, [])

  // 通过条件判断的方式
  if (isLoading) {
    return <div>Loading...</div>
  }



  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>Job Seeker</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold">{user.points} Points</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            {/* <span>Membership valid until: {new Date(user.membershipValidity).toLocaleDateString()}</span> */}
            <span>Membership valid until: {user.membershipValidity}</span>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.name} className={currentPlan === plan.name ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>${plan.price} / {plan.duration}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleSubscribe(plan.name)}
                variant={currentPlan === plan.name ? "secondary" : "default"}
              >
                {currentPlan === plan.name ? "Current Plan" : "Subscribe"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}