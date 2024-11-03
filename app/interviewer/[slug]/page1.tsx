'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Star, Calendar, Clock, DollarSign } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Interviewer {
  id: number
  name: string
  expertise: string
  experience: string
  price: number
  avatar: string
  rating: number
  bio: string
  availability: string
  languages: string[]
  skills: string[]
}
const interviewer11 = {
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

export default function InterviewerDetail() {
  const params = useParams()
  console.log(params)
  const [interviewer, setInterviewer] = useState<Interviewer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePaymentClick = () => {
    setIsModalOpen(true);
    console.log('支付确认111');
  };

  const handleConfirmPayment = () => {
    // 这里添加确认支付的逻辑
    console.log('支付确认');
    setIsModalOpen(false);
  };

  const handleCancelPayment = () => {
    // 这里添加取消支付的逻辑
    console.log('支付取消');
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchInterviewer = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // const response = await axios.get(`https://smart-excel-ai-omega-six.vercel.app/api/learn?id=${params.id}`)
        // setInterviewer(response.data.mockInterviewers[0]) // Assuming the API returns an array with one interviewer
        setInterviewer(interviewer11) // Assuming the API returns an array with one interviewer

      } catch (err) {
        console.error("Error fetching interviewer:", err)
        setError("Failed to fetch interviewer details. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.slug) {
      fetchInterviewer()
    }
  }, [params.slug])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
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
            <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
            <AvatarFallback>{interviewer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <CardTitle className="text-3xl mb-2">{interviewer.name}</CardTitle>
            <CardDescription className="text-xl">{interviewer.expertise}</CardDescription>
            <div className="mt-2 flex items-center justify-center md:justify-start">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-lg">{interviewer.rating?.toFixed(1)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">About Me</h2>
            <p>{interviewer.bio}</p>
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
          <Button className="w-full">Book Consultation</Button>
        </CardFooter>

        <Button onClick={handlePaymentClick}>支付</Button>
      </Card>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6">
          <Skeleton className="w-32 h-32 rounded-full" />
          <div className="text-center md:text-left w-full">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-6 w-24" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(6)].map((_, index) => (
            <section key={index}>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </section>
          ))}
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </div>
  )
}