'use client'
import { Check, Calendar, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useRouter } from "next/navigation"
// import { useRouter } from "next/router"

import Router from 'next/router'

// Mock data for the completed payment
const paymentDetails = {
    orderId: "ORD-12345",
    interviewerName: "Alice Johnson",
    interviewerAvatar: "/placeholder.svg?height=50&width=50",
    expertise: "Frontend Development",
    date: "2023-07-01",
    time: "14:00",
    duration: 60,
    price: 50,
}



export default function PaymentConfirmation() {

    const router = useRouter()
    const handleComplete = () => {
        router.push("/interviewerList?name=mmm") // This will take the user back to the interviewer detail page
    }

    // const handleComplete = () =>        {
    //     Router.push("/interviewerList?name=1")
    // } 

    // Router.push({
    //     pathname: '/interviewerList',
    //     query: { name: 'Zeit' }
    // })




    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Card className="w-full">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Payment Successful</CardTitle>
                    <CardDescription>Your consultation has been booked successfully.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Order ID:</span>
                        <span className="text-sm">{paymentDetails.orderId}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={paymentDetails.interviewerAvatar} alt={paymentDetails.interviewerName} />
                            <AvatarFallback>{paymentDetails.interviewerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold">{paymentDetails.interviewerName}</h3>
                            <p className="text-sm text-gray-500">{paymentDetails.expertise}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{paymentDetails.date}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{paymentDetails.time} ({paymentDetails.duration} min)</span>
                        </div>
                        <div className="flex items-center col-span-2">
                            <DollarSign className="mr-2 h-4 w-4" />
                            <span className="font-semibold">${paymentDetails.price} paid</span>
                        </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-700">
                        <h4 className="font-semibold mb-2">Next Steps:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Check your email for a detailed confirmation.</li>
                            <li>Prepare any questions or topics you'd like to discuss during the consultation.</li>
                            <li>Ensure your device and internet connection are ready for the video call.</li>
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                        <Link href="/interviewerList?name=1">Go to interviewerList</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/orderList">View My Bookings</Link>
                    </Button>
                </CardFooter>
            </Card>
            {/* <Button onClick={handleComplete} variant="outline" >
                Go to interviewerList
            </Button> */}

        </div>
    )
}