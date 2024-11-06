'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ArrowLeft } from 'lucide-react'

// import { ReviewDialog } from './review-dialog'

interface Order {
    id: string
    interviewerName: string
    date: string
    status: 'completed' | 'pending' | 'cancelled'
    price: number
    duration: number
    topic: string
    notes: string
}

export default function OrderDetail() {
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isReviewOpen, setIsReviewOpen] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    //   const { id } = router.query

    const params = useParams()
    console.log(params)
    console.log(params["slug"])
    const id = params["slug"]

    const fetchOrder = async () => {
        setLoading(true)
        setError(null)
        try {
            // In a real application, you would fetch the order details from an API
            // const response = await axios.get<Order>(`/api/orders/${id}`)
            // setOrder(response.data)

            // For demonstration, we'll use mock data
            // todo:
            setOrder({
                id: id as string,
                interviewerName: "John Doe",
                date: "2024-10-19",
                status: 'completed',
                price: 100,
                duration: 60,
                topic: "React Hooks",
                notes: "Discussed advanced use cases of useEffect and custom hooks."
            })
        } catch (err) {
            setError('Failed to fetch order details. Please try again later.')
            console.error('Error fetching order:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchOrder()
        }
    }, [id])

    const handleReviewSubmitted = () => {
        setIsReviewOpen(false)
        toast({
            title: "Review Submitted",
            description: "Thank you for your feedback!",
        })
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (error || !order) {
        return (
            <div className="text-center text-red-500 p-4">
                {error || 'Order not found'}
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <Button variant="ghost" onClick={() => router.push('/orderList')} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                    <CardDescription>Order ID: {order.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><strong>Interviewer:</strong> {order.interviewerName}</p>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Price:</strong> ${order.price.toFixed(2)}</p>
                    <p><strong>Duration:</strong> {order.duration} minutes</p>
                    <p><strong>Topic:</strong> {order.topic}</p>
                    <p><strong>Notes:</strong> {order.notes}</p>
                </CardContent>
                {order.status === 'completed' && (
                    <CardFooter>
                        <Button onClick={() => setIsReviewOpen(true)}>
                            Submit Review
                        </Button>
                    </CardFooter>
                )}
            </Card>
            {/* <ReviewDialog
        order={order}
        isOpen={isReviewOpen}
        onOpenChange={setIsReviewOpen}
        onReviewSubmitted={handleReviewSubmitted}
      /> */}
        </div>
    )
}