'use client'

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/components/ui/use-toast"
import { useToast } from "@/hooks/use-toast"


export default function InterviewerRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
    hourlyRate: "",
    bio: "",
    selfIntroduction: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, expertise: value }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Replace with your actual API endpoint
      console.log(formData)
      const response = await axios.post('https://api.example.com/register-interviewer', formData)
      console.log(response.data)
      toast({
        title: "Registration Successful",
        description: "Your registration has been submitted successfully.",
      })
      setFormData({
        name: "",
        email: "",
        expertise: "",
        experience: "",
        hourlyRate: "",
        bio: "",
        selfIntroduction: "",
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      console.error('Error submitting form111')
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Register as an Interviewer</CardTitle>
        <CardDescription>Fill out the form below to register as an interviewer on our platform.</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expertise">Area of Expertise</Label>
            <Select onValueChange={handleSelectChange} value={formData.expertise}>
              <SelectTrigger id="expertise">
                <SelectValue placeholder="Select your area of expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="backend">Backend Development</SelectItem>
                <SelectItem value="fullstack">Full Stack Development</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
                <SelectItem value="mobile">Mobile Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input 
              id="experience" 
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
            <Input 
              id="hourlyRate" 
              name="hourlyRate"
              type="number" 
              value={formData.hourlyRate}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Short Bio</Label>
            <Textarea 
              id="bio" 
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="selfIntroduction">Self-Introduction</Label>
            <Textarea 
              id="selfIntroduction" 
              name="selfIntroduction"
              value={formData.selfIntroduction}
              onChange={handleInputChange}
              placeholder="Provide a detailed self-introduction. This will be shown to potential clients."
              className="h-32"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}