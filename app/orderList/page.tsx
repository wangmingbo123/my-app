'use client'

import { useEffect, useState } from "react"
import { Calendar, Clock, DollarSign, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import InterviewerList from "@/components/BottomBar"
// import axios from "axios"
import { getCurrentUser } from "@/lib/session"
import { axios } from "@/lib/axios"
import { toast } from "@/hooks/use-toast"

import Link from "next/link"
import dayjs from "dayjs";

// Mock data for user's orders
const orders1 = [
  {
    id: 1,
    userId: 1,
    interviewerId: 1,
    interviewerName: "Alice Johnson",
    interviewerAvatar: "/placeholder.svg?height=50&width=50",
    expertise: "Frontend Development",
    date: "2023-06-15",
    time: "14:00",
    duration: 60,
    price: 50,
    status: "Completed",
    reviewed: false,
  },
  {
    id: 2,
    userId: 1,
    interviewerId: 1,
    interviewerName: "Bob Smith",
    interviewerAvatar: "/placeholder.svg?height=50&width=50",
    expertise: "Backend Development",
    date: "2023-06-20",
    time: "10:00",
    duration: 90,
    price: 75,
    status: "Upcoming",
    reviewed: false,
  },
  {
    id: 3,
    userId: 1,
    interviewerId: 1,
    interviewerName: "Carol Williams",
    interviewerAvatar: "/placeholder.svg?height=50&width=50",
    expertise: "Full Stack Development",
    date: "2023-06-25",
    time: "16:00",
    duration: 120,
    price: 100,
    status: "Upcoming",
    reviewed: false,
  },
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

export default function UserOrderList() {
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false)
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [orders, setOrders] = useState(null)

  // const [submittingReview, setSubmittingReview] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      setError(null)
      try {
        //todo:拿到userid
        const { userId } = await getCurrentUser()

        // const url = "https://smart-excel-ai-omega-six.vercel.app/api/orderList?userId=" + userId
        // const url = "https://noxious-spooky-cauldron-v6rgv6j7xq9hwv6r-3000.app.github.dev/api/orderList?userId=" + userId
        const url = "api/orderList?userId=" + userId
        const response = await axios.get(url)
        console.log(response.data.orders)
        setOrders(response.data.orders)
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.')
        console.error('Error fetching orders:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrders()
  }, [])

  // 提交评价接口
  const submitReview = async (selectedOrder: any) => {
    // 提前缓存好selectedOrder
    console.log("orderId " + selectedOrder)
    console.log(selectedOrder)
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsReviewOpen(true)
    try {
      const data = {
        orderId:String(selectedOrder.id),
        userId:String(selectedOrder.userId),
        interviewerId:String(selectedOrder.interviewerId),
        rating:rating,
        reviewText: reviewText
      }
      console.log(data)
      await axios.post('/api/submitReview', {
             ...data
      })
      toast({
        title: "Success",
        description: "Your review has been submitted successfully.",
      })
      setReviewText('')
      setRating(0)
      // fetchOrders() // Refresh the order list
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
      console.error('Error submitting review:', err)
    } finally {
      setIsReviewOpen(false)
    }

  }

  const handleReschedule = (order) => {
    setSelectedOrder(order)
    setIsRescheduleOpen(true)
  }

  const submitReschedule = () => {
    // Here you would typically send the rescheduling request to your backend
    console.log("Rescheduling order:", selectedOrder)
    setIsRescheduleOpen(false)
  }

  const handleReview = (order) => {
    setSelectedOrder(order)
    setRating(0)
    setReviewText("")
    setIsReviewOpen(true)
  }

  // const submitReview = () => {
  //   // Here you would typically send the review to your backend
  //   console.log("Submitting review for order:", selectedOrder, "Rating:", rating, "Review:", reviewText)
  //   setIsReviewOpen(false)
  //   // Update the order to mark it as reviewed
  //   const updatedOrders = orders.map(order =>
  //     order.id === selectedOrder.id ? { ...order, reviewed: true } : order
  //   )
  //   // In a real application, you would update this state properly
  //   console.log("Updated orders:", updatedOrders)
  // }
  // 按照条件展示不同页面

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <LoadingCircles />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          // <Link href={`/orderDetail/${order.id}`} key={order.id} className="block">
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={order.interviewerAvatar} alt={order.interviewerName} />
                  <AvatarFallback>{order.interviewerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{order.interviewerName}</CardTitle>
                  <CardDescription>{order.expertise}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4"/>
                    <span>{order.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4"/>
                    <span>{order.time} ({order.duration} min)</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4"/>
                    <span>${order.price}</span>
                  </div>

                  <div>
                    <span>下单时间：</span>
                    <span>{dayjs(order.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                  </div>
                  <div>
                    <span
                        className={`px-2 py-1 rounded-full text-sm ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {order.status === 'Upcoming' && (
                    <Button variant="outline" onClick={() => handleReschedule(order)}>Reschedule</Button>
                )}
                {order.status === 'Completed' && !order.reviewed && (
                    <Button variant="outline" onClick={() => handleReview(order)}>Leave Review</Button>
                )}
                {order.status === 'Reviewed'  && (
                    <Button variant="outline" disabled={true} onClick={() => handleReview(order)}>View Review</Button>
                )}
              </CardFooter>
            </Card>
          // </Link>
        ))}
      </div>

      <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Consultation</DialogTitle>
            <DialogDescription>
              Please select a new date and time for your consultation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Date
              </Label>
              <Input id="name" className="col-span-3" type="date" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Time
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="11:00">11:00</SelectItem>
                  <SelectItem value="14:00">14:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                  <SelectItem value="16:00">16:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={submitReschedule}>Confirm Reschedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
            <DialogDescription>
              Please rate your consultation and leave a review.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <Textarea
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => submitReview(selectedOrder)} disabled={rating === 0}>Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}