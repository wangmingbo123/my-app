'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, DollarSign, User, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Order {
  id: string
  interviewerName: string
  date: string
  status: 'completed' | 'pending' | 'cancelled'
  price: number
  duration: number
  topic: string
  notes: string
  paymentMethod: string
  interviewerFeedback?: string
}

export default function OrderDetail() {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const { id } = {id:1}

  const fetchOrder = async () => {
    setLoading(true)
    setError(null)
    try {
      // In a real application, you would fetch the order details from an API
      // const response = await axios.get<Order>(`/api/orders/${id}`)
      // setOrder(response.data)
      
      // For demonstration, we'll use mock data
      setOrder({
        id: id as string,
        interviewerName: "John Doe",
        date: "2024-10-19T14:00:00Z",
        status: 'completed',
        price: 100,
        duration: 60,
        topic: "React Hooks and State Management",
        notes: "Discussed advanced use cases of useEffect, custom hooks, and compared different state management solutions including Redux and Recoil.",
        paymentMethod: "Credit Card",
        interviewerFeedback: "The candidate showed a good understanding of React concepts. Areas for improvement include performance optimization techniques."
      })
    } catch (err) {
      setError('Failed to fetch order details. Please try again later.')
      console.error('Error fetching order:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  },[])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container mx-auto p-4">
        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error || 'Order not found'}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => router.push('/orders')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" /> Completed</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500"><AlertCircle className="mr-1 h-3 w-3" /> Pending</Badge>
      case 'cancelled':
        return <Badge className="bg-red-500"><XCircle className="mr-1 h-3 w-3" /> Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" onClick={() => router.push('/orders')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Order Details</CardTitle>
          <CardDescription>Order ID: {order.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Status</h3>
            {getStatusBadge(order.status)}
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-gray-500" />
              <span className="font-medium">Interviewer:</span>
              <span className="ml-2">{order.interviewerName}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
              <span className="font-medium">Date:</span>
              <span className="ml-2">{new Date(order.date).toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-gray-500" />
              <span className="font-medium">Duration:</span>
              <span className="ml-2">{order.duration} minutes</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
              <span className="font-medium">Price:</span>
              <span className="ml-2">${order.price.toFixed(2)}</span>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Topic</h3>
            <p>{order.topic}</p>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <p>{order.notes}</p>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <p>{order.paymentMethod}</p>
          </div>
          {order.interviewerFeedback && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-2">Interviewer Feedback</h3>
                <p>{order.interviewerFeedback}</p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {order.status === 'completed' && (
            <Button onClick={() => toast({ title: "Review", description: "Review functionality to be implemented" })}>
              Submit Review
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}