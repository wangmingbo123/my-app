'use client'

import { useEffect, useState } from "react"
import { Calendar, Star, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"
// import axios from "axios"
import { getCurrentUser } from "@/lib/session"
import { axios } from "@/lib/axios"
import { SessionProvider } from "next-auth/react";
import { signIn, useSession } from "next-auth/react";
import ImageCarousel from "@/components/ImageCarousel1";

// Mock data for the interviewer
const interviewerNeedMerge = {
  id: 1,
  name: "Alice Johnson",
  expertise: "Frontend Development",
  experience: "5 years",
  price: 50,
  avatar: "/placeholder.svg?height=300&width=300",
  bio: "Experienced frontend developer with a passion for creating intuitive and responsive user interfaces.",
  selfIntroduction: "Hello! I'm Alice Johnson, a frontend developer with 5 years of experience in creating beautiful and functional web applications. I specialize in React, Vue, and Angular frameworks, and I have a keen eye for design and user experience. My goal is to help you succeed in your frontend developer interviews by sharing my knowledge and experience in the field. I can provide mock interviews, code reviews, and personalized feedback to help you improve your skills and confidence. Let's work together to take your frontend development career to the next level!",
  skills: ["React", "Vue", "Angular", "CSS", "JavaScript", "TypeScript", "Responsive Design"],
  languages: ["English (Native)", "Spanish (Intermediate)"],
  availability: ["Weekdays 9 AM - 5 PM EST","Weekdays 9 AM - 5 PM EST"],
  rating: 4.8,
  reviewCount: 47,
  images:["Weekdays","Weekdays1"],//todo
  email:"1445260526@qq.com",
  phone:"13764211789"
}

// Mock data for orders and reviews
// const ordersAndReviewsInfo = [
//   {
//     id: 1,
//     clientName: "John Doe",
//     clientAvatar: "/placeholder.svg?height=50&width=50",
//     date: "2023-05-15",
//     rating: 5,
//     review: "Alice was incredibly helpful! Her insights on React hooks and state management were invaluable. I feel much more confident for my upcoming interview.",
//   },
//   {
//     id: 2,
//     clientName: "Jane Smith",
//     clientAvatar: "/placeholder.svg?height=50&width=50",
//     date: "2023-05-10",
//     rating: 4,
//     review: "Great session on CSS Grid and Flexbox. Alice explained complex concepts in a very understandable way. Looking forward to our next session!",
//   },
//   {
//     id: 3,
//     clientName: "Mike Johnson",
//     clientAvatar: "/placeholder.svg?height=50&width=50",
//     date: "2023-05-05",
//     rating: 5,
//     review: "Alice's mock interview was challenging and realistic. Her feedback was constructive and helped me identify areas for improvement. Highly recommended!",
//   },
// ]

interface Interviewer {
  id: number;
  name: string;
  expertise: string;
  experience: string;
  price: number;
  avatar: string;
  bio: string;
  selfIntroduction: string;
  skills: string[];
  languages: string[];
  availability: string;
  rating: number;
  reviewCount: number;
}
const images = [
  'https://ibiuepbjxpgufdvklagl.supabase.co/storage/v1/object/public/userinfo/test/demo.jpeg',
  'https://ibiuepbjxpgufdvklagl.supabase.co/storage/v1/object/public/userinfo/test/demo.jpeg',
  'https://ibiuepbjxpgufdvklagl.supabase.co/storage/v1/object/public/userinfo/test/demo.jpeg',
]

const LoadingCircles = () => (
  <div className="flex justify-center items-center space-x-2 h-24">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{
        animationDelay: `${i * 0.15}s`
      }}></div>
    ))}
  </div>
)


 // function InterviewerDetail() {
export default function InterviewerDetail({user}) {

   // // 客户端拿到登录user
   // // const { data: session, status } = useSession()
   // //
   // // // 会存在多次跳变
   // console.log("MMMMM")
   // console.log(session)
   // console.log("MMMMM")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [interviewer, setInterviewer] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  // const [ordersAndReviews, setOrdersAndReviews] = useState(ordersAndReviewsInfo)
  const [ordersAndReviews, setOrdersAndReviews] = useState(null)


  const { toast } = useToast()

  const params = useParams()
  console.log(params)
  console.log(params["slug"])
  const router = useRouter()

   // const { data: session, status } = useSession()

  // if(!session!.user){
  //   alert("用户已登录"+session.user.name)
  // }


  const handlePayment = async (id, price) => {
    console.log("handlePayment " + id)
    setIsProcessingPayment(true)
    // 调用支付接口 userid, order id,product id , amount
    // todo:
    // 1. 通过接口获取订单信息
    // const payUrl = "https://smart-excel-ai-omega-six.vercel.app/api/orderAdd";

    // const payUrl = "https://noxious-spooky-cauldron-v6rgv6j7xq9hwv6r-3000.app.github.dev/api/orderAdd";
    // const { data: session, status } = useSession()
    const payUrl = "api/orderAdd";
    const pay = async () => {
      try {
        // const { userId } = await getCurrentUser()
        const { userId } = {...user}
        const param = {
          // userId: parseInt(userId),
          userId: userId.toString(),
          interviewerId: id,
          interviewerName: interviewer.name,
          interviewerAvatar: interviewer.avatar,
          expertise: interviewer.expertise,
          price: parseInt(price),
          status: "Upcoming"
        }
        const response = await axios.post(payUrl, {
          ...param
        })
        console.log(param)
        console.log(response)
        setIsProcessingPayment(false)
        setIsBookingOpen(false)
        toast({
          title: "Payment Successful",
          description: `You have successfully booked a session with ${interviewer.name}.`,
          duration: 3000,
        })
        return response.data.orderId
        // console.log(interviewerMap)
      } catch (err) {
        console.error("Error fetching interviewers:", err)
      } finally {
        setIsProcessingPayment(false)
        setIsBookingOpen(false)
      }

    }
    const orderId = await pay()
    if (!orderId) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        duration: 3000,
      })
      return
    }
    // Simulate payment process
    // await new Promise(resolve => setTimeout(resolve, 2000))

    // 跳转到支付完成页
    router.push("/paymentConfirmation?orderId=" + orderId) // This will take the user back to the interviewer detail page
  }
  // const url = "https://smart-excel-ai-omega-six.vercel.app/api/interviewerDetail/" + params["slug"];
  // const url = "https://noxious-spooky-cauldron-v6rgv6j7xq9hwv6r-3000.app.github.dev/api/interviewerDetail/" + params["slug"];
  const url = "api/interviewerDetail/" + params["slug"];
  const fetchData = async () => {
    try {
      setIsLoading(true)
      console.log("getCurrentUser start test")
      console.log("getCurrentUser end test")
      const { userId } = {...user}


      const response = await axios.get(url, {
        params: { 'userId': userId.toString() }
      })
      console.log(response.data.interviewer)
      let interviewerMap = {
        ...response.data.interviewer,
        ...interviewerNeedMerge
      }
      // interviewerMap["name"] = response.data.interviewer["name"]
      // console.log(interviewerMap)
      // response.data.interviewer["images"]=images
          // ["https://ssl.gstatic.com/gb/images/sprites/p_2x_eb7895ba582f.png","https://ssl.gstatic.com/gb/images/sprites/p_2x_eb7895ba582f.png"]
      setInterviewer(response.data.interviewer)
      setOrdersAndReviews(response.data.ordersAndReviews)
      // console.log(interviewerMap)
    } catch (err) {
      console.error("Error fetching interviewers:", err)
    } finally {
      setIsLoading(false)
    }
  };
  // todo:取下单和评论数据
  const fetchOrders = async () => {
    setIsLoading(true)
    try {

      // 类似商家id
      let interviewerId = params["slug"];
      // const url = "api/orderInterviewerList?interviewerId=" + interviewerId
      // `/interviewer/${interviewer.id}`
      const url = "api/orderInterviewerList/"+interviewerId
      const response = await axios.get(url)
      console.log(response.data.ordersAndReviews)
      // setOrdersAndReviews(response.data.ordersAndReviews)
    } catch (err) {
      console.error('Error fetching orders:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log("fetchData is invoke")
    fetchData()
    // fetchOrders()
  }, [])

  // 通过条件判断的方式
  // 加载动画效果
  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Loading Interview Details</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingCircles />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!interviewer) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Notice: </strong>
          <span className="block sm:inline">Interviewer not found.</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={interviewer.avatar} alt={interviewer.name}/>
            <AvatarFallback>{interviewer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          {/*<div className="flex flex-col items-center space-y-4 w-full md:w-1/2">*/}
          {/*  <ImageCarousel images={interviewer.images}/>*/}
          {/*  <div className="text-2xl font-semibold">${interviewer.hourlyRate}/hour</div>*/}
          {/*</div>*/}

          <div className="text-center md:text-left">
            <CardTitle className="text-3xl mb-2">{interviewer.name}</CardTitle>
            <CardDescription className="text-xl">{interviewer.expertise}</CardDescription>
            <div className="mt-2">
              <span className="text-yellow-500">★</span> {interviewer.rating} ({interviewer.reviewCount} reviews)
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {interviewer.images && interviewer.images.length>0?
              (<section>
                <div className="w-full  mx-auto">
                  <ImageCarousel images={interviewer.images}/>
                </div>
              </section>):''
          }

          <section>
            <h2 className="text-2xl font-semibold mb-2">About Me</h2>
            <p>{interviewer.selfIntroduction}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Email</h2>
            <p>{interviewer.email}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Phone</h2>
            <p>{interviewer.phone}下单后会展示</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Experience</h2>
            <p>{interviewer.experience} years in {interviewer.expertise}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {interviewer.skills?.map((skill, index) => (
                  <span key={index} className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Languages</h2>
            <ul className="list-disc list-inside">
              {interviewer.languages?.map((language, index) => (
                  <li key={index}>{language}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Availability</h2>
            <ul className="list-disc list-inside">
              {interviewer.availability?.map((availability, index) => (
                  <li key={index}>{availability}</li>
              ))}
            </ul>
          </section>
          {/*<section>*/}
          {/*  <h2 className="text-2xl font-semibold mb-2">Availability</h2>*/}
          {/*  <p>{interviewer.availability}</p>*/}
          {/*</section>*/}
          <section>
            <h2 className="text-2xl font-semibold mb-2">Pricing</h2>
            <p className="text-2xl font-bold text-primary">${interviewer.price}/hour</p>
          </section>
        </CardContent>
        <CardFooter>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              {
                interviewer?.coinNum>0?(<Button className="w-full">Book a Consultation</Button>):(<Button className="w-full" disabled={true}>积分不足，请去个人页充值</Button>)
              }

            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book a Consultation with {interviewer.name}</DialogTitle>
                <DialogDescription>
                  Fill out the form below to schedule your consultation. We'll get back to you with a confirmation.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" />
                </div>
                <div>
                  <Label htmlFor="email">Your Email</Label>
                  <Input id="email" type="email" />
                </div>
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input id="date" type="date" className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea id="message" />
                </div>
              </form>
              <DialogFooter className="flex sm:justify-center space-x-3">
                <Button variant="outline" onClick={() => setIsBookingOpen(false)}>Cancel</Button>
                <Button onClick={() => handlePayment(interviewer.id, interviewer.price)} disabled={isProcessingPayment}>
                  {isProcessingPayment ? "Processing..." : `Pay $${interviewer.price}`}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      {/* Orders and reviews section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Recent Orders and Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {ordersAndReviews?.map((order) => (
              <div key={order.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={order.clientAvatar} alt={order.clientName} />
                      <AvatarFallback>{order.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{order.clientName}</h3>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < order.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{order.review}</p>
                <Button variant="ghost" size="sm" className="mt-2">
                  <ThumbsUp className="w-4 h-4 mr-2" /> Helpful
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


// export default  function App() {
//   return (
//     <SessionProvider>
//       <InterviewerDetail></InterviewerDetail>
//     </SessionProvider>
//   );
// }