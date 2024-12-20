'use client'

import { useState } from "react"
import { Calendar, Star, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Mock data for the interviewer
const interviewer = {
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
  availability: "Weekdays 9 AM - 5 PM EST",
  rating: 4.8,
  reviewCount: 47,
}

// Mock data for orders and reviews
const ordersAndReviews = [
  {
    id: 1,
    clientName: "John Doe",
    clientAvatar: "/placeholder.svg?height=50&width=50",
    date: "2023-05-15",
    rating: 5,
    review: "Alice was incredibly helpful! Her insights on React hooks and state management were invaluable. I feel much more confident for my upcoming interview.",
  },
  {
    id: 2,
    clientName: "Jane Smith",
    clientAvatar: "/placeholder.svg?height=50&width=50",
    date: "2023-05-10",
    rating: 4,
    review: "Great session on CSS Grid and Flexbox. Alice explained complex concepts in a very understandable way. Looking forward to our next session!",
  },
  {
    id: 3,
    clientName: "Mike Johnson",
    clientAvatar: "/placeholder.svg?height=50&width=50",
    date: "2023-05-05",
    rating: 5,
    review: "Alice's mock interview was challenging and realistic. Her feedback was constructive and helped me identify areas for improvement. Highly recommended!",
  },
]

export default function InterviewerDetail() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const { toast } = useToast()

  const handlePayment = async () => {
    setIsProcessingPayment(true)
    // 调用支付接口 userid, order id,product id , amount


    // Simulate payment process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessingPayment(false)
    setIsBookingOpen(false)
    toast({
      title: "Payment Successful",
      description: `You have successfully booked a session with ${interviewer.name}.`,
      duration: 5000,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
            <AvatarFallback>{interviewer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <CardTitle className="text-3xl mb-2">{interviewer.name}</CardTitle>
            <CardDescription className="text-xl">{interviewer.expertise}</CardDescription>
            <div className="mt-2">
              <span className="text-yellow-500">★</span> {interviewer.rating} ({interviewer.reviewCount} reviews)
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">About Me</h2>
            <p>{interviewer.selfIntroduction}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Experience</h2>
            <p>{interviewer.experience} in {interviewer.expertise}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {interviewer.skills.map((skill, index) => (
                <span key={index} className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Languages</h2>
            <ul className="list-disc list-inside">
              {interviewer.languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Availability</h2>
            <p>{interviewer.availability}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Pricing</h2>
            <p className="text-2xl font-bold text-primary">${interviewer.price}/hour</p>
          </section>
        </CardContent>
        <CardFooter>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Book a Consultation</Button>
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
                <Button onClick={handlePayment} disabled={isProcessingPayment}>
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
            {ordersAndReviews.map((order) => (
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